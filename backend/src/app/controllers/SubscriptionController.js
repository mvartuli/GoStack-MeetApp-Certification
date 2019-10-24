import { startOfHour, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    const userMeetups = await user.getMeetups({
      // where: { past: false },
      where: { date: { [Op.gt]: new Date() } },
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: ['date'],
    });

    return res.json(userMeetups);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    // Check if the meetupid provided in params exists
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      // Get the information about the organizer, to send mail later
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup não encontrado' });
    }

    // Check if the informed meetup is organized by caller user
    if (meetup.organizer_id === req.userId) {
      return res.status(400).json({
        error: 'Você não pode se inscrever em meetups que você organiza',
      });
    }

    // Check if is a past meetup
    const hourStart = startOfHour(meetup.date);
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Você não pode se increver em meetups já passados' });
    }

    // check if user is already subscribed to this meetup
    const [userInMeetup] = await user.getMeetups({
      where: { id: meetup.id },
    });
    if (userInMeetup) {
      return res
        .status(400)
        .json({ error: 'Você já está inscrito neste meetup' });
    }

    // Check if user is in other meetup at the same time
    const [userInSameHour] = await user.getMeetups({
      where: { date: meetup.date },
    });
    if (userInSameHour) {
      return res
        .status(400)
        .json({ error: 'Você está inscrito em um meetup no mesmo horário' });
    }

    // add the user and meetup to sbscription table
    const [sub] = await user.addMeetup(req.params.meetupId);

    // Send mail to organizer
    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(sub);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    // Check if the meetupid provided in params exists
    const meetup = await Meetup.findByPk(req.params.meetupId);
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup não encontrado' });
    }

    await user.removeMeetup(meetup.id);

    return res.status(200).json({ delete: true });
  }
}

export default new SubscriptionController();
