import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from './SplashScreen';
import { useSelector, useDispatch } from 'react-redux';
import AuthScreen from './AuthScreen';
import MainScreen from './MainScreen';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { emailCheckingAction, loginAction } from '../redux/Actions/authAction';

export default function MainNavigation() {
  const authState = useSelector(state => state.authState.authInfo);
  const [isLoading, setIsLoading ] = useState(true);
  const dispatch = useDispatch();
  console.log('auth-state: ', authState);

  useEffect(() => {
    checkAuth();
  },[])

  useEffect(() => {
    if (authState) {
      if (authState?.email) {
        AsyncStorage.setItem('AUTH', JSON.stringify(authState));
        dispatch(emailCheckingAction());
      }
    }
  }, [authState]);

  const checkAuth = async () => {
    setIsLoading(true);
    let userInfo = await AsyncStorage?.getItem('AUTH');

    if (userInfo) {
      let parseData = JSON.parse(userInfo);

      dispatch(loginAction(parseData));
      dispatch(emailCheckingAction());
    }
    setIsLoading(false);
  }
  return (
    <NavigationContainer>
      {
        isLoading == true ? 
          <SplashScreen />
          : 
        authState?.email ? 
          <MainScreen/>
          : 
          <AuthScreen />
      }
     
    </NavigationContainer>
      
      
)
}

const styles = StyleSheet.create({})