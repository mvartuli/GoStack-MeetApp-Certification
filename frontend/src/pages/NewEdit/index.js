import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { parse, isValid } from 'date-fns';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import {
  updateMeetupRequest,
  createMeetupRequest,
} from '~/store/modules/meetup/actions';
import BannerInput from './BannerInput';
import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number(),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.string()
    .test(
      'Data Ok',
      'Entre com a data e hora do meetup no formato dd/MM/yyyy H:mm',
      value => isValid(parse(value, 'dd/MM/yyyy H:mm', new Date()))
    )
    .required('Informe a data e hora do meetup no formato dd/MM/yyyy H:mm'),
  location: Yup.string().required('A localização é obrigatória'),
});

export default function NewEdit() {
  const meetup = useSelector(state => state.meetup.meetup);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    if (Object.entries(meetup).length === 0 && meetup.constructor === Object) {
      const payload = {
        ...data,
        date: parse(data.date, 'dd/MM/yyyy H:mm', new Date()),
      };
      dispatch(createMeetupRequest(payload));
    } else {
      const payload = {
        ...data,
        date: parse(data.date, 'dd/MM/yyyy H:mm', new Date()),
        id: meetup.id,
      };
      dispatch(updateMeetupRequest(payload));
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Textarea name="description" placeholder="Descrição completa" />
        <Input type="text" name="date" placeholder="Data do Meetup" />
        <Input type="text" name="location" placeholder="Localização" />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}
