import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 0 30px;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin-top: 30px;
  }

  input {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 4px;
    height: 50px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 400;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  textarea {
    width: 100%;
    resize: none;
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 4px;
    height: 200px;
    padding: 15px;
    color: #fff;
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 400;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    display: flex;
    padding: 10px;
    justify-content: space-evenly;
    margin: 10px 0 0;
    width: 162px;
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
`;
