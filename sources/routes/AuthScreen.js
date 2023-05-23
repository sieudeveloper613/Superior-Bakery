import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SIGN_IN_SCREEN,
    SIGN_UP_SCREEN,
    FORGOT_PASSWORD,
    INTRODUCTION_SCREEN,
} from './ScreenName'
import {
    SignIn,
    SignUp,
    Introduction,
} from '../screens/auth'
import { NewPassword, ValidateEmail, ValidateCode } from '../screens/auth/ForgotPassword';
const Stack = createNativeStackNavigator();

function AuthScreen() {
    return (
        <Stack.Navigator 
          initialRouteName={SIGN_IN_SCREEN}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={SIGN_IN_SCREEN} component={SignIn} />
          <Stack.Screen name={SIGN_UP_SCREEN} component={SignUp} />
          <Stack.Screen name={FORGOT_PASSWORD.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN} component={NewPassword} />
          <Stack.Screen name={FORGOT_PASSWORD.FORGOT_PASSWORD_VALIDATE_CODE_SCREEN} component={ValidateCode} />
          <Stack.Screen name={FORGOT_PASSWORD.FORGOT_PASSWORD_VALIDATE_EMAIL_SCREEN} component={ValidateEmail} />
          <Stack.Screen name={INTRODUCTION_SCREEN} component={Introduction} />
        </Stack.Navigator>
    );
  }
  
  export default AuthScreen;