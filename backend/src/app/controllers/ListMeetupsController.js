// Module with date functions
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class ListMeetupsController {
  async index(req, res) {
    const { date, page = 1 } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date must be informed' });
    }

    const searchDate = Number(parseISO(date));
    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'date',
        'title',
        'description',
        'location',
        'banner_id',
      ],
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
      order: [['date']],
    });

    return res.json(meetups);
  }
}

export default new ListMeetupsController();
