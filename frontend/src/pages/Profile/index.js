import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string()
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required('Infome a nova senha') : field
    )
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.min(6, 'No mínimo 6 caractéres') : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirme a nova senha')
          .oneOf([Yup.ref('password')], 'Nova senha não confere')
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data, { resetForm }) {
    dispatch(updateProfileRequest(data));
    resetForm({ name: data.name, email: data.email });
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar Perfil
        </button>
      </Form>
    </Container>
  );
}
