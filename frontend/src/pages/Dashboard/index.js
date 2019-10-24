import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import history from '~/services/history';
import { newMeetup, detailMeetup } from '~/store/modules/meetup/actions';
import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => ({
        ...meetup,
        formatedDate: format(
          parseISO(meetup.date),
          "dd 'de' MMMMMMMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      }));
      setMeetups(data);
    }
    loadMeetups();
  }, []);

  function handleNewMeetup() {
    dispatch(newMeetup());
    history.push('/newedit');
  }

  function handleDetails(m) {
    dispatch(detailMeetup(m));
    history.push('/details');
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <button type="button" onClick={handleNewMeetup}>
          <MdAddCircleOutline size={24} color="#fff" />
          Novo meetup
        </button>
      </header>
      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formatedDate}</span>
              <button type="button" onClick={() => handleDetails(meetup)}>
                <MdChevronRight size={24} color="#fff" />
              </button>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
