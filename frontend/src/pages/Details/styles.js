import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  margin: 36px auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;

  h1 {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    margin: 0;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const Description = styled.div`
  margin-top: 24px;
  white-space: pre-wrap;
  width: 940px;
  border: none;
  color: #fff;
  font-weight: normal;
  font-size: 18px;
  text-align: left;
  vertical-align: top;
  line-height: 32px;
`;

export const Content = styled.div`
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
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-items: left;
  margin-top: 24px;
  opacity: 0.6;
  color: #ffffff;
  font-size: 16px;
  line-height: 21px;

  span {
    margin-left: 10px;
  }
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

export const Edit = styled.button`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px;
  width: 116px;
  height: 42px;
  background: #4dbaf9;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background: ${darken(0.08, '#4dbaf9')};
    transition: background 0.2s;
  }
`;

export const Cancel = styled.button`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;
  width: 138px;
  height: 42px;
  background: #d44059;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background: ${darken(0.08, '#d44059')};
    transition: background 0.2s;
  }
`;
