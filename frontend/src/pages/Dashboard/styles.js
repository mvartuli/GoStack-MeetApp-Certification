import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
      margin: 0;
    }

    button {
      display: flex;
      padding: 10px;
      justify-content: space-evenly;
      margin: 10px 0 0;
      width: 172px;
      height: 42px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
        transition: background 0.2s;
      }
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 4px;
  height: 62px;
  padding: 0 15px;
  color: #fff;
  margin: 0;

  opacity: ${props => (props.past ? 0.6 : 1)};

  strong {
    margin-left: 20px;
    font-size: 18px;
    font-weight: 400;
  }

  span {
    font-size: 16px;
    color: #fff;
    opacity: 0.6;
  }

  div {
    display: flex;
    align-items: center;
  }

  button {
    border: 0;
    margin-left: 20px;
    background: none;
  }
`;
