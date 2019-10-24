import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import GlobalStyle from '~/styles/global';
import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <GlobalStyle />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
