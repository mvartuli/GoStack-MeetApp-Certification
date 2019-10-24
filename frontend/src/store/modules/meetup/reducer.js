import produce from 'immer';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const INITIAL_STATE = {
  meetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/MEETUP_SUCCESS': {
        draft.meetup = {
          ...action.payload.meetup,
          date: format(
            parseISO(action.payload.meetup.date),
            'dd/MM/yyyy H:mm',
            {
              locale: pt,
            }
          ),
        };
        break;
      }
      case '@meetup/NEW_MEETUP': {
        draft.meetup = {};
        break;
      }
      case '@meetup/DETAIL_MEETUP': {
        draft.meetup = {
          ...action.payload.meetup,
          date: format(
            parseISO(action.payload.meetup.date),
            'dd/MM/yyyy H:mm',
            {
              locale: pt,
            }
          ),
        };
        break;
      }
      case '@meetup/CANCEL_MEETUP_SUCCESS': {
        draft.meetup = {};
        break;
      }
      default:
    }
  });
}
