export function detailMeetup(meetup) {
  return {
    type: '@meetup/DETAIL_MEETUP',
    payload: { meetup },
  };
}

export function newMeetup() {
  return {
    type: '@meetup/NEW_MEETUP',
    payload: {},
  };
}

export function createMeetupRequest(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function updateMeetupRequest(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function cancelMeetupRequest(meetup) {
  return {
    type: '@meetup/CANCEL_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function cancelMeetupSuccess() {
  return {
    type: '@meetup/CANCEL_MEETUP_SUCCESS',
    payload: {},
  };
}

export function meetupSuccess(meetup) {
  return {
    type: '@meetup/MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function meetupFailure(meetup) {
  return {
    type: '@meetup/MEETUP_FAILURE',
    payload: { meetup },
  };
}
