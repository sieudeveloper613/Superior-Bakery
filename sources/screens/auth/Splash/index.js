import React, { useEffect } from 'react';
import {Container, Image, Text} from '../../../components';
import {images} from './../../../themes/images';
import VersionCheck from 'react-native-version-check';
import {SIGN_IN_SCREEN} from '../../../routes/ScreenName';
import { logDebug, logInfo } from '../../../utils/console'
import { colors } from '../../../themes/colors';

export default function Splash({navigation: {navigate}}) {
  useEffect(() => {
    logInfo('CHÀO MỪNG ĐẾN TIỆM BÁNH MÌ SUPERIOR!')
    setTimeout(() => {
      navigate(SIGN_IN_SCREEN);
    }, 3000);
  });

  return (
    <Container safe bgColor={colors.WHITE}>
      <Container height={'90%'} pt={80} aCenter>
        <Image square={256} source={images.SUPERIOR_LOGO} />
      </Container>
      <Container height={'10%'} jCenter aCenter>
        <Text color={colors.PRIMARY}>Phiên bản {VersionCheck.getCurrentVersion()}</Text>
      </Container>
    </Container>
  );
}
