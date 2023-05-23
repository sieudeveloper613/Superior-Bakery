import React, { useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Button, Image, Text } from '../../../../components'
import { Header } from '../../../../components/custom'
import { colors } from '../../../../themes/colors'
import PersonalInfo from './components/PersonalInfo'
import UpgradeCustomer from './components/UpgradeCustomer'
import { useSelector, useDispatch } from 'react-redux'
import Menu from './components/Menu'
import { loginAction } from '../../../../redux/Actions/authAction'
import { PROFILE } from '../../../../routes/ScreenName'
import { icons } from '../../../../themes/icons'
import { logDebug, logInfo } from '../../../../utils/console'
import { useIsFocused } from '@react-navigation/native'
import { authorizationApi } from '../../../../APIs'

const { width, height } = Dimensions.get('window');

const MainProfile = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState.authInfo);
  const isFocused = useIsFocused();
  logDebug('auth-state: ', authState);

  useEffect(() => {
    isFocused && callbackData();;
  },[isFocused]);

  const callbackData = async () => {
    try {
      const handleData = await authorizationApi.getInfo(authState.email);
      if(handleData) {
        dispatch(loginAction(handleData))
      }
    } catch (error) {
      logError('catch-error: ', error)
    }
  }

  const { bill, paying, product } = authState.orderInformation;
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Hồ sơ cá nhân'} />

      <Container scrollView flex={1} p={24}>
        <PersonalInfo 
          buttonText={'Đổi ảnh đại diện'}
          onPress={() => navigate(PROFILE.CHANGE_AVATAR_SCREEN)}
          avatar={authState?.avatar ? authState.avatar : icons.EMPTY_AVATAR_ICON}
          username={authState.fullname}
          customerType={authState.customerType}
          rank={authState.rank}
          bill={bill}
          paying={paying}
          product={product}
        />

        <UpgradeCustomer 
          amount={bill}
          onPress={() => {}}
        />

        <Menu />
      </Container>
    </Container>
  )
}

export default MainProfile

const styles = StyleSheet.create({})