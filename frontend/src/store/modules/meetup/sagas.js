import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { meetupFailure, meetupSuccess, cancelMeetupSuccess } from './actions';
import history from '~/services/history';

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload.meetup;
    yield call(api.delete, `/meetups/${id}`);
    toast.success('Meetup cancelado com sucesso!');
    history.push('/dashboard');
    yield put(cancelMeetupSuccess());
  } catch (err) {
    toast.error(`Erro...${err.response.data.error}`);
    yield put(meetupFailure(payload));
  }
}

export function* updateMeetup({ payload }) {
  try {
    const {
      id,
      title,
      description,
      date,
      location,
      banner_id,
    } = payload.meetup;
    const response = yield call(api.put, `/meetups/${id}`, {
      title,
      description,
      date,
      location,
      banner_id,
    });
    toast.success('Meetup atualizado com sucesso!');
    yield put(meetupSuccess(response.data));
  } catch (err) {
    toast.error(`Erro...${err.response.data.error}`);
    yield put(meetupFailure(payload));
  }
}

export function* createMeetup({ payload }) {
  try {
    const { title, description, date, location, banner_id } = payload.meetup;
    const response = yield call(api.post, 'meetups', {
      title,
      description,
      date,
      location,
      banner_id,
    });
    toast.success('Novo Meetup criado com sucesso!');
    yield put(meetupSuccess(response.data));
  } catch (err) {
    toast.error(`Erro...${err.response.data.error}`);
    yield put(meetupFailure(payload));
  }
}

export default all([
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
]);
