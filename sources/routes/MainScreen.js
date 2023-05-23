import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    HOME_SCREEN,
    PROFILE,
    NOTIFICATION,
    FAVORITE_SCREEN,
    ORDERING_HISTORY_SCREEN,
    VOUCHER_SCREEN,
    ABOUT_ME_SCREEN,
    SEARCHING_SCREEN,
    CATEGORY,
    CART
} from './ScreenName'
import { 
  MainHome,
  Favorite,
  OrderingHictory,
  Voucher,
  AboutUs,
  Searching,
} from '../screens/home';
import { 
  MainProfile,
  ChangeAvatar,
  ChangePassword,
  EditProfile,
  StoreLocation,
  UpgradeApp,
  OrderingAddress
} from '../screens/home/UserProfile';
import { 
  MainNotification, 
  DetailNotification 
} from '../screens/home/Notification';
import {
  Categories,
  Detail
} from '../screens/home/Category';
import {
  Payment,
  Checking,
  OrderState,
  FinishedOrder
} from '../screens/home/Cart'


const Stack = createNativeStackNavigator();

function MainScreen() {
    return (
      <Stack.Navigator 
        initialRouteName={HOME_SCREEN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={HOME_SCREEN} component={MainHome} />

        <Stack.Screen name={PROFILE.MAIN_PROFILE_SCREEN} component={MainProfile} />
        <Stack.Screen name={PROFILE.CHANGE_AVATAR_SCREEN} component={ChangeAvatar} />
        <Stack.Screen name={PROFILE.CHANGE_PASSWORD_SCREEN} component={ChangePassword} />
        <Stack.Screen name={PROFILE.EDIT_PROFILE_SCREEN} component={EditProfile} />
        <Stack.Screen name={PROFILE.STORE_LOCATION_SCREEN} component={StoreLocation} />
        <Stack.Screen name={PROFILE.UPGRADE_APP_SCREEN} component={UpgradeApp} />
        <Stack.Screen name={PROFILE.ORDERING_ADDRESS} component={OrderingAddress} />

        <Stack.Screen name={NOTIFICATION.MAIN_NOTIFICATION} component={MainNotification} />
        <Stack.Screen name={NOTIFICATION.DETAIL_NOTIFICATION} component={DetailNotification} />

        <Stack.Screen name={CATEGORY.CATEGORIES_SCREEN} component={Categories} />
        <Stack.Screen name={CATEGORY.PRODUCT_DETAIL_SCREEN} component={Detail} />

        <Stack.Screen name={CART.CHECKING_SCREEN} component={Checking} />
        <Stack.Screen name={CART.PAYMENT_SCREEN} component={Payment} />
        <Stack.Screen name={CART.ORDER_STATE_SCREEN} component={OrderState} />
        <Stack.Screen name={CART.FINISHED_ORDER_SCREEN} component={FinishedOrder} />

        <Stack.Screen name={FAVORITE_SCREEN} component={Favorite} />
        <Stack.Screen name={ORDERING_HISTORY_SCREEN} component={OrderingHictory} />
        <Stack.Screen name={VOUCHER_SCREEN} component={Voucher} />
        <Stack.Screen name={ABOUT_ME_SCREEN} component={AboutUs} />
        <Stack.Screen name={SEARCHING_SCREEN} component={Searching} />
      </Stack.Navigator>
    );
}

export default MainScreen;
  
