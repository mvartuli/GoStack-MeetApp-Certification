import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';
import { Container, Content, Profile, Button } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="MeetApp" />
          </Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <span>{profile.name}</span>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <Button type="button" onClick={handleSignOut}>
              Sair
            </Button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
