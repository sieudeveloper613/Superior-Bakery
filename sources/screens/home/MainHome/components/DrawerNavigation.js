import React, { useState } from "react"
import { StyleSheet, } from "react-native"

/* components */
import { Container, Button, Text, Image } from "../../../../components"

/* implements */
import { menu } from "../../../../utils/data"
import { colors } from "../../../../themes/colors"
import { logoutAction } from "../../../../redux/Actions/authAction"

/* packages */
import "react-native-gesture-handler"
import { icons } from "../../../../themes/icons"
import { Drawer } from "react-native-drawer-layout"
import { useSelector, useDispatch } from "react-redux"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

/* screens */
import { CART, PROFILE, VOUCHERS, HOME_SCREEN, NOTIFICATION, FAVORITE_SCREEN, ABOUT_ME_SCREEN } from "../../../../routes/ScreenName";

const DrawerNavigation = ({ open = false, onOpen = () => {}, onClose = () => {}, onPress = () => {}, children }) => {
  
  /* create redux */
  const dispatch = useDispatch()
  const authState = useSelector(state => state.authState.authInfo);
  const { bill, paying, product } = authState.orderInformation;
  
  /* create navigtion */
  const navigation = useNavigation();
  
  /* create state */
  const [selectedId, setSelectedId] = useState(1);
  
  /* function: handle on selecting a feature by id */
  const handleClick = async (id) => {
    setSelectedId(id);
    switch (id) {
      case 1: navigation.navigate(HOME_SCREEN); break;
      case 2: navigation.navigate(PROFILE.MAIN_PROFILE_SCREEN); break;
      case 3: navigation.navigate(NOTIFICATION.MAIN_NOTIFICATION); break;
      case 4: navigation.navigate(FAVORITE_SCREEN); break;
      case 5: navigation.navigate(CART.CHECKING_SCREEN); break;
      case 6: navigation.navigate(VOUCHERS.MAIN_VOUCHER_SCREEN); break;
      case 7: navigation.navigate(ABOUT_ME_SCREEN); break;
      case 8: 
        await AsyncStorage.removeItem("AUTH"),
        await AsyncStorage.removeItem("LOGIN")
        dispatch(logoutAction());
      break;
    }
    setTimeout(() => {
      setSelectedId(1)
    }, 1000);
  }

  /* component: render a line of the inform */
  const InfoRow = ({ label, value }) => {
    return (
      <Container width={"33%"} jCenter aCenter>
        <Text size={16} color={colors.PRIMARY} bold mb={4}>{value}</Text>
        <Text size={12} color={colors.DARK_GREY}>{label}</Text>
      </Container>
    )
  }

  /* component: render the user's relating information */
  const UserInfo = ({ avatar = null, fullname = "", userType = "", rank = "", onClose = () => {}}) => {
    return (
      <Container width={"100%"} p={16} bgColor={colors.WHITE} shadow>
        <Container width={"100%"} row>
          {
            avatar ? (
              <Image imageUri={avatar} width={64} height={64} radius={16} />
            ) : (
              <Image source={icons.EMPTY_AVATAR_ICON} width={64} height={64} radius={16} />
            )
          }
          <Container ml={8} width={"60%"}>
            <Text color={colors.BLACK} size={16} bold pr={8} numberOfLines={1} ellipsizeMode={"middle"}>{fullname}</Text>
            <Text color={colors.BLACK} size={16} light mv={4}>{userType}</Text>
            <Text color={colors.BLACK} size={14}>{rank}</Text>
          </Container>
          <Button aCenter onPress={onClose}>
            <Feather name={"x-circle"} size={24} color={colors.BLACK} />
          </Button>
        </Container>
        <Container row width={"100%"} r={16} b={1} bColor={colors.PRIMARY} between jCenter aCenter p={8} mv={16}>
          <InfoRow label={"Tổng"} value={bill}/>
          <InfoRow label={"Hóa đơn"} value={paying}/>
          <InfoRow label={"Sản phẩm"} value={product}/>
        </Container>
      </Container>
    )
  }

  /* component: render a list of menu */
  const MenuNavigation = ({ data = [] }) => {
    return (
      <Container width={"100%"} p={16}>
        {
          data.map(item => {
            return (
              <Button key={item.id} onPress={() => handleClick(item.id)}
              width={"100%"} row aCenter p={16} r={8} mt={item.id === 8 ? 16 : 0} 
                bgColor={item.id === 8 ? "rgba(255, 0, 0, 0.15)" : selectedId === item.id && item.id != 8 ? colors.WHITE : colors.LIGHT_GREY}>
                <Feather name={item.icon} size={24} color={item.id === 8 ? colors.TOMATO : colors.PRIMARY} />
                <Text color={item.id === 8 ? colors.TOMATO : colors.BLACK} size={16} bold ml={24}>{item.name}</Text>
              </Button>
            )
          })
        }
      </Container>
    )
  }

  const { _id: userId, avartar, fullname, customerType, rank } = authState;

  return (
    <Drawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      drawerType={"slide"}
      renderDrawerContent={() => {
      return (
        <Container flex={1} safe bgColor={colors.LIGHT_GREY}>
          <UserInfo 
            avatar={avartar}
            fullname={fullname ? fullname : userId}
            userType={customerType}
            rank={rank}
            onClose={onPress}
          />
          <MenuNavigation data={menu}/>
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