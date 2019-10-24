import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdEdit,
  MdDeleteForever,
  MdInsertInvitation,
  MdLocationOn,
  MdCameraAlt,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { cancelMeetupRequest } from '~/store/modules/meetup/actions';

import {
  Container,
  Header,
  Content,
  Footer,
  Edit,
  Cancel,
  Description,
  Time,
  Location,
} from './styles';

export default function Details() {
  const meetup = useSelector(state => state.meetup.meetup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.entries(meetup).length === 0 && meetup.constructor === Object) {
      history.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEdit() {
    if (meetup.past) {
      toast.error('Você não pode editar meetups passados!');
    } else {
      history.push('/newedit');
    }
  }

  function handleCancel() {
    if (meetup.past) {
      toast.error('Você não pode cancelar meetups passados!');
    } else {
      dispatch(cancelMeetupRequest(meetup));
    }
  }

  return (
    <Container>
      <Header>
        <h1>{meetup.title}</h1>
        <div>
          <Edit type="button" onClick={handleEdit}>
            <MdEdit size={24} color="#fff" />
            Editar
          </Edit>
          <Cancel type="button" onClick={handleCancel}>
            <MdDeleteForever size={24} color="#fff" />
            Cancelar
          </Cancel>
        </div>
      </Header>
      <Content>
        {meetup.banner ? (
          <img src={meetup.banner.url} alt="" />
        ) : (
          <div>
            <MdCameraAlt size={60} color="#aaa" />
          </div>
        )}
      </Content>
      <Description>{meetup.description}</Description>

      <Footer>
        <Time>
          <MdInsertInvitation size={24} color="#fff" />
          <span>{meetup.formatedDate}</span>
        </Time>
        <Location>
          <MdLocationOn size={24} color="#fff" />
          <span>{meetup.location}</span>
        </Location>
      </Footer>
    </Container>
  );
}
