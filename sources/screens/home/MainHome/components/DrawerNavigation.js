import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { StyleSheet, } from 'react-native'
import { Container, Button, Text, Image } from '../../../../components';
import { Drawer } from 'react-native-drawer-layout';
import { colors } from '../../../../themes/colors';
import Feather from 'react-native-vector-icons/Feather'
import { menu } from '../../../../utils/data';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  HOME_SCREEN,
  PROFILE,
  NOTIFICATION,
  FAVORITE_SCREEN,
  VOUCHER_SCREEN,
  ABOUT_ME_SCREEN,
  CART, 
} from '../../../../routes/ScreenName';
import { logoutAction } from '../../../../redux/Actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../../../themes/icons';

const DrawerNavigation = ({ open, onOpen, onClose, onPress, children }) => {
  const authState = useSelector(state => state.authState.authInfo);
  const dispatch = useDispatch()
  const { bill, paying, product } = authState.orderInformation;
  const [selectedId, setSelectedId] = useState(1);
  const navigation = useNavigation();
  const handleClick = async (id) => {
    console.log('item id: ', id);
    setSelectedId(id)
    switch (id) {
      case 1: navigation.navigate(HOME_SCREEN); break;
      case 2: navigation.navigate(PROFILE.MAIN_PROFILE_SCREEN); break;
      case 3: navigation.navigate(NOTIFICATION.MAIN_NOTIFICATION); break;
      case 4: navigation.navigate(FAVORITE_SCREEN); break;
      case 5: navigation.navigate(CART.CHECKING_SCREEN); break;
      case 6: navigation.navigate(VOUCHER_SCREEN); break;
      case 7: navigation.navigate(ABOUT_ME_SCREEN); break;
      case 8: 
        await AsyncStorage.removeItem('AUTH'),
        await AsyncStorage.removeItem('LOGIN')
        dispatch(logoutAction());
      break;
    }
    setTimeout(() => {
      setSelectedId(1)
    }, 1000);
  }
  const InfoRow = ({ label, value }) => {
    return (
      <Container width={'33%'} jCenter aCenter>
        <Text size={16} color={colors.PRIMARY} bold mb={4}>{value}</Text>
        <Text size={12} color={colors.DARK_GREY}>{label}</Text>
      </Container>
    )
  }
  const UserInfo = () => {
    return (
      <Container width={'100%'} p={16} bgColor={colors.WHITE} shadow>
        <Container width={'100%'} row >
          <Image imageUri={authState?.avatar ? authState.avatar : icons.EMPTY_AVATAR_ICON} width={72} height={72} radius={16} />
          <Container ml={8} width={'60%'} >
            <Text color={colors.BLACK} size={16} bold pr={8} numberOfLines={1} ellipsizeMode={'middle'}>{authState.fullname}</Text>
            <Text color={colors.BLACK} size={16} light mv={4}>{authState.customerType}</Text>
            <Text color={colors.BLACK} size={14}>{authState.rank}</Text>
          </Container>
          <Button aCenter onPress={onPress}>
            <Feather name={'x-circle'} size={24} color={colors.BLACK} />
          </Button>
        </Container>
        <Container row width={'100%'} r={16} b={1} bColor={colors.PRIMARY} between jCenter aCenter p={8} mv={16}>
          <InfoRow label={'Tổng'} value={bill}/>
          <InfoRow label={'Hóa đơn'} value={paying}/>
          <InfoRow label={'Sản phẩm'} value={product}/>
        </Container>
      </Container>
    )
  }

  const MenuNavigation = () => {
    return (
      <Container width={'100%'} p={16}>
        {
          menu.map(item => {
            return (
              <Button key={item.id} width={'100%'} row aCenter 
                      p={16} r={8} mt={item.id === 8 ? 16 : 0} 
                      bgColor={item.id === 8 ? 'rgba(255, 0, 0, 0.15)' : selectedId === item.id && item.id != 8 ? colors.WHITE : colors.LIGHT_GREY}
                onPress={() => {
                  handleClick(item.id)
                }}>
                <Feather name={item.icon} size={24} color={item.id === 8 ? colors.TOMATO : colors.PRIMARY} />
                <Text color={item.id === 8 ? colors.TOMATO : colors.BLACK} size={16} bold ml={24}>{item.name}</Text>
              </Button>
            )
          })
        }
      </Container>
    )
  }

  return (
    <Drawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      drawerType={'slide'}
      renderDrawerContent={() => {
      return (
        <Container flex={1} safe bgColor={colors.LIGHT_GREY}>
          <UserInfo />
          <MenuNavigation />
        </Container>
      )
      }}
    >
    {children}
  </Drawer>
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})