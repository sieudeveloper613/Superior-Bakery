import React, { useEffect, useState } from "react"

/* implements */
import { emailCheckingAction, loginAction } from "../redux/Actions/authAction";

/* packages */
import { useSelector, useDispatch } from "react-redux"
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* screens */
import AuthScreen from "./AuthScreen"
import MainScreen from "./MainScreen"
import SplashScreen from "./SplashScreen"

export default function MainNavigation() {
  /* create redux */
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState.authInfo);

  /* create state */
  const [isLoading, setIsLoading] = useState(true);

  /* create useEffect to handle events */
  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    if (authState) {
      if (authState?.email) {
        AsyncStorage.setItem("AUTH", JSON.stringify(authState));
        dispatch(emailCheckingAction());
      }
    }
  }, [authState]);

  const checkAuth = async () => {
    setIsLoading(true);
    let userInfo = await AsyncStorage?.getItem("AUTH");

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
        isLoading ?
          <SplashScreen /> :
          authState?.email ?
            <MainScreen /> :
            <AuthScreen />
      }
    </NavigationContainer>
  )
}
