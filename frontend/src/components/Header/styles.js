import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);

  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  img {
    height: 32px;
    margin-right: 20px;
    padding-right: 20px;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 400;

    span {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;

      color: #999;
    }
  }
`;

export const Button = styled.button`
  height: 42px;
  width: 71px;
  background: #d44059;
  font-weight: 400;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background: ${darken(0.08, '#d44059')};
    transition: background 0.2s;
  }
`;
