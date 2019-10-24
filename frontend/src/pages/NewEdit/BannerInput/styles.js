import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 940px;
      height: 300px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: #000;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 940px;
      height: 300px;
      opacity: 0.4;
      border-radius: 4px;
      background: #000;

      h1 {
        color: #fff;
        opacity: 0.6;
      }

      &:hover {
        opacity: 0.5;
      }
    }

    input {
      display: none;
    }
  }
`;
