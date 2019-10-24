// This kind of import is because Yup does not export anything
import * as Yup from 'yup';
// Module with date functions
import { startOfHour, parseISO, isBefore, addHours } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { organizer_id: req.userId },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['date']],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    // Validate json provided in the body
    const schema = Yup.object().shape({
      title: Yup.string().required('Informe o título do meetup'),
      description: Yup.string().required('Informe a descrição do meetup'),
      location: Yup.string().required('Informe alocalização do meetup'),
      date: Yup.date().required('Informe a data do meetup'),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      const error = err.inner.map(e => e.message);
      return res
        .status(400)
        .json({ error: `Falha na validação\n${error.join('\n')}` });
    }

    // Check for past dates
    const hourStart = startOfHour(parseISO(req.body.date));
    if (isBefore(hourStart, addHours(startOfHour(new Date()), 1))) {
      return res
        .status(400)
        .json({ error: 'Criação de meetup no passado não é permitida' });
    }

    // Create the meetup
    const { id } = await Meetup.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: hourStart,
      banner_id: req.body.banner_id,
      organizer_id: req.userId,
    });

    const response = await Meetup.findOne({
      where: { id },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // return created meetup
    return res.json(response);
  }

  async update(req, res) {
    // Check if the meetupid provided in params exists
    const meetup = await Meetup.findByPk(req.params.meetupId);
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    // Check if the informed meetup is organized by caller user
    if (meetup.organizer_id !== req.userId) {
      return res.status(400).json({
        error: 'Você não pode modificar meetups de outro organizador',
      });
    }

    // Check if is a past meetup
    let hourStart = startOfHour(meetup.date);
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Você não pose modificar meetup passado' });
    }

    // Validate body schema
    const schema = Yup.object().shape({
      title: Yup.string().required('Informe o título do meetup'),
      description: Yup.string().required('Informe a descrição do meetup'),
      location: Yup.string().required('Informe alocalização do meetup'),
      date: Yup.date().required('Informe a data do meetup'),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      const error = err.inner.map(e => e.message);
      return res
        .status(400)
        .json({ error: `Falha na validação\n${error.join('\n')}` });
    }

    // Check if informed date is in the past
    hourStart = startOfHour(parseISO(req.body.date));
    if (isBefore(hourStart, addHours(startOfHour(new Date()), 1))) {
      return res.status(400).json({
        error: 'Meetup deve ser criado com no mínimo uma hora de antecedência',
      });
    }

    // Update Meetup
    const { id } = await meetup.update({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: hourStart,
      banner_id: req.body.banner_id,
      organizer_id: req.userId,
    });

    const response = await Meetup.findOne({
      where: { id },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // return created meetup
    return res.json(response);
  }

  async delete(req, res) {
    // Check if the meetupid provided in params exists
    const meetup = await Meetup.findByPk(req.params.meetupId);
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup não encontrado' });
    }

    // Check if the informed meetup is organized by caller user
    if (meetup.organizer_id !== req.userId) {
      return res.status(400).json({
        error: 'Você não pode cancelar um meetup de outro organizador',
      });
    }

    // Check if is a past meetup
    const hourStart = startOfHour(meetup.date);
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Você não pode cancelar um meetup passado' });
    }

    await meetup.destroy();

    return res.status(200).json({ delete: true });
  }
}

export default new MeetupController();
