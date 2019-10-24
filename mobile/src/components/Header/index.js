import React from 'react';
import {Image} from 'react-native';
import {Head} from './styles';
import logop from '~/assets/logop.png';

export default function Header() {
  return (
    <Head>
      <Image source={logop} />
    </Head>
  );
}
