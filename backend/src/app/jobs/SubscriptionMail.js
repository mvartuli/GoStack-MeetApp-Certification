import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;
    const formatedDate = format(
      parseISO(meetup.date),
      "'dia' dd 'de' MMMMMMMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `Nova inscrição para o meetup "${meetup.title}"`,
      template: 'subscription',
      context: {
        user: user.name,
        date: formatedDate,
      },
    });
  }
}

export default new SubscriptionMail();
