import React, { useState } from "react"
import { ActivityIndicator, StyleSheet, useWindowDimensions, Keyboard, ToastAndroid, Platform, Alert } from "react-native"

/* components */
import CustomizedInput from "./components/CustomizedInput"
import { Container, Text, Button, Input, Image } from "../../../components"

/* implements */
import { colors } from "../../../themes/colors"
import { images } from "../../../themes/images"
import { authorizationApi } from "../../../APIs"

/* packages */
import BouncyCheckbox from "react-native-bouncy-checkbox"
import AsyncStorage from "@react-native-async-storage/async-storage"

/* screens */
import {
  SIGN_UP_SCREEN,
  FORGOT_PASSWORD,
  INTRODUCTION_SCREEN,
} from "../../../routes/ScreenName"

const SignIn = ({ navigation: { navigate } }) => {

  /* configure screen */
  const { width, height } = useWindowDimensions();

  /* create state */
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({ account: "", password: "" });
  const [errors, setErrors] = useState({ account: null, password: null });

  const onChangeText = (input, text) => {
    setInputs(prev => ({ ...prev, [input]: text }));
    setError(null);
  }

  const onShowError = (input, message) => setErrors(prev => ({ ...prev, [input]: message }));

  const signIn = async () => {
    try {
      Keyboard.dismiss();
      const { account, password } = inputs;

      if (account === "" && password === "") {
        onShowError("account", "Tài khoản không được để trống!");
        onShowError("password", "Mật khẩu không được để trống!");
        return;
      }

      if (account === "") {
        onShowError("account", "Tài khoản không được để trống!");
        return;
      }

      if (password === "") {
        onShowError("password", "Mật khẩu không được để trống!");
        return;
      }

      setIsLoading(true);
      const response = await authorizationApi.onSignIn(account, password);
      console.log("response: ", response);
      const { isSuccess } = response;

      if (isSuccess !== 1) {
        setError("Sai tài khoản hoặc mật khẩu!\nVui lòng kiểm tra lại!");
        setIsLoading(false);
        return;
      }

      if (isChecked) {
        await onRemember(account, password);
        navigate(INTRODUCTION_SCREEN, { account });
      } else {
        navigate(INTRODUCTION_SCREEN, { account });
      }

      setIsLoading(false);
    } catch (error) {
      console.log("sign-in-error: ", error)
      setIsLoading(false);
      return;
    }
  }

  const signInByGoogle = async () => {
    try {
      return Platform.OS === "android" ? 
        ToastAndroid.show("Hệ thống đang phát triển, thử lại sau!", ToastAndroid.SHORT) :
          Alert.alert("Thông báo", "Hệ thống đang phát triển, vui lòng thử lại sau", [
            {
              text: "Đồng ý",
              onPress: () => {},
              style: "cancel"
            }
          ])
    } catch (error) {
      console.log("sign-in-by-google-error: ", error);
      return;
    }
  }

  const onRemember = async (account, password) => {
    const rememberUser = { account, password };
    return await AsyncStorage.setItem("LOGIN", JSON.stringify(rememberUser))
  }

  return (
    <Container safe flex={1} bgColor={colors.BACKGROUND}>
      <Container flex={1} p={16} jCenter>
        <Container mb={16} aCenter>
          <Image square={128} source={images.SUPERIOR_LOGO} />
          <Text headline bold color={colors.BLACK} mt={16}>
            Đăng nhập
          </Text>
        </Container>

        <CustomizedInput
          icon={"user"}
          error={errors.account}
          value={inputs.account}
          placeholder={"Tài khoản"}
          onFocus={() => onShowError("account", null)}
          onChangeText={text => onChangeText("account", text)}
        />

        <CustomizedInput
          password
          icon={"key"}
          value={inputs.password}
          error={errors.password}
          placeholder={"Mật khẩu"}
          onFocus={() => onShowError("password", null)}
          onChangeText={text => onChangeText("password", text)}
        />

        <Container row between mt={4}>
          <BouncyCheckbox
            size={20}
            isChecked={false}
            text={"Nhớ tài khoản"}
            fillColor={colors.PRIMARY}
            unfillColor={colors.LIGHT_GREY}
            onPress={() => { setIsChecked(!isChecked); }}
            textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none", color: colors.BLACK, marginLeft: -12 }}
          />
          <Text onPress={() => navigate(FORGOT_PASSWORD.FORGOT_PASSWORD_VALIDATE_EMAIL_SCREEN)}
            color={colors.PRIMARY}>Quên mật khẩu?</Text>
        </Container>

        {
          error && (
            <Container r={6} p={12} mt={16} width={"100%"} aCenter jCenter bgColor={"rgba(255, 0, 0, 0.15)"}>
              <Text color={colors.TOMATO} center>{error}</Text>
            </Container>
          )
        }

        <Button onPress={signIn}
          mt={32}
          jCenter aCenter
          width={"100%"} height={48}
          r={8} bgColor={colors.PRIMARY}>
          {
            isLoading ? (
              <ActivityIndicator size={"small"} color={colors.WHITE} />
            ) : (
              <Text color={colors.WHITE} size={16} bold uppercase>Đăng nhập</Text>
            )
          }
        </Button>

        <Text color={colors.BLACK} center mv={24}>hoặc</Text>

        <Container row between>
          <Button onPress={signInByGoogle}
            width={48} height={48} r={8} shadow jCenter aCenter bgColor={colors.WHITE}>
            <Image width={24} height={24} source={images.GOOGLE_LOGO} />
          </Button>
          <Button width={"80%"} height={48} r={8} shadow jCenter aCenter bgColor={colors.BLACK}>
            <Text color={colors.WHITE} size={16} bold>Đăng nhập sau</Text>
          </Button>
        </Container>
      </Container>
      <Container width={"100%"} row jCenter p={16}>
        <Text paragraph color={colors.BLACK}>Chưa có tài khoản?</Text>
        <Text onPress={() => navigate(SIGN_UP_SCREEN)} paragraph bold color={colors.PRIMARY}>{`\tĐăng ký ngay`}</Text>
      </Container>
    </Container>
  );
}

export default SignIn;

const styles = StyleSheet.create({});