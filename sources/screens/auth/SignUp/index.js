import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Keyboard, Platform, useWindowDimensions, ToastAndroid, Alert } from "react-native"

/* components */
import { Loading } from "../../../components/custom"
import CustomizedInput from "./components/CustomizedInput"
import { Container, Text, Input, Button, Image } from "../../../components"

/* implements */
import { colors } from "../../../themes/colors"
import { images } from "../../../themes/images"
import { authorizationApi } from "../../../APIs"

export default function SignUp({ navigation: { goBack } }) {

  /* configure screen */
  const { width } = useWindowDimensions();

  /* constants */
  const IOS = Platform.OS === "ios";
  const ANDROID = Platform.OS === "android";

  /* create state */
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    enterPassword: "",
  });

  /* function: handle on change text for input */
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };


  /* function: handle on show error for input */
  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: ErrorMessage }));
  }

  /* function: handle on validate inputs */
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let matchedEmail = inputs.email.match(/\S+@\S+\.\S+/);

    /* validate phone number */
    if (!inputs.phone) {
      handleError("Vui lòng nhập số điện thoại!", "phone");
      valid = false;
    } else if (inputs.phone.length !== 10) {
      handleError("Độ dài số điện thoại tối thiểu là 10", "phone");
      valid = false;
    }

    /* validate email and email format */
    if (!inputs.email) {
      handleError("Vui lòng nhập Email!", "email");
      valid = false;
    } else if (!matchedEmail) {
      handleError("Email sai định dạng (nguyenvana@gmail.com)", "email");
      valid = false;
    }

    /* validate name of unit of person */
    if (!inputs.fullName) {
      handleError("Vui lòng nhập họ và tên!", "fullName");
      valid = false;
    }

    /* validate password and min length password is 6 */
    if (!inputs.password) {
      handleError("Vui lòng nhập mật khẩu!", "password");
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError("Độ dài mật khẩu tối thiểu phải là 6", "password");
      valid = false;
    }

    /* validate comparing pass and re-pass */
    if (!inputs.enterPassword) {
      handleError("Vui lòng nhập mật khẩu!", "enterPassword");
      valid = false;
    } else if (inputs.enterPassword.length < 6) {
      handleError("Độ dài mật khẩu tối thiểu phải là 6", "enterPassword");
      valid = false;
    } else if (inputs.enterPassword != inputs.password) {
      handleError("Mật khẩu không khớp! vui lòng kiểm tra lại!", "enterPassword");
      valid = false;
    }

    if (valid) {
      onSubmitRegister();
    }
  };

  const onSetEmptyState = () => {
    setInputs({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      enterPassword: "",
    });
    setMessage(null);
    setErrors({});
    setLoading(false);
  }

  /* function: handle on register account for user */
  const onSubmitRegister = async () => {
    try {
      setLoading(true);
      const { email, fullname, phone, password } = inputs;

      const response = await authorizationApi.onSignUp(email, fullname, phone, password);
      console.log("response-sign-in: ", response);
      if (response.code === 0) {
        setMessage("Địa chỉ Email đã tồn tại\nVui lòng chọn Email khác!");
        setLoading(false);
        return false;
      }
      
      onSetEmptyState();
      return ANDROID ? 
        ToastAndroid.show("Đăng ký tài khoản thành công!", ToastAndroid.SHORT) :
          Alert.alert("Thông báo", "Đăng ký tài khoản thành công!", [
            {
              text: "Quay về",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "Đăng nhập ngay",
              onPress: () => goBack(),
              style: "default"
            }
          ]);
    } catch (error) {
      console.log("sign-in-error: ", error);
      setMessage("Lỗi không xác định xảy ra\nVui lòng thử lại sau!");
      setLoading(false);
      return;
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={IOS && "padding"}>
      <Container safe flex={1} bgColor={colors.BACKGROUND}>
        <Container flex={1} p={16}>
          <Container scrollView>

            <Container aCenter mb={24}>
              <Image square={128} source={images.SUPERIOR_LOGO} />
              <Text headline bold color={colors.BLACK} mt={16}>
                Đăng ký
              </Text>
            </Container>

            <CustomizedInput
              iconName="user"
              placeholder="Nhập họ và tên"
              error={errors.fullName}
              onFocus={() => {
                handleError(null, "fullName");
              }}
              value={inputs.fullName}
              onChangeText={(text) => handleOnChange(text, "fullName")}
            />

            <CustomizedInput
              iconName="phone"
              placeholder="Nhập số điện thoại"
              keyboardType={"numeric"}
              error={errors.phone}
              onFocus={() => {
                handleError(null, "phone");
              }}
              value={inputs.phone}
              onChangeText={(text) => handleOnChange(text, "phone")}
            />

            <CustomizedInput
              iconName="mail"
              placeholder="Nhập địa chỉ Email"
              error={errors.email}
              onFocus={() => {
                handleError(null, "email");
              }}
              value={inputs.email}
              onChangeText={(text) => handleOnChange(text, "email")}
            />

            <CustomizedInput
              iconName="key"
              placeholder="Nhập mật khẩu"
              password
              error={errors.password}
              onFocus={() => {
                handleError(null, "password");
              }}
              value={inputs.password}
              onChangeText={(text) => handleOnChange(text, "password")}
            />

            <CustomizedInput
              iconName="lock"
              placeholder="Xác nhận mật khẩu"
              password
              error={errors.enterPassword}
              onFocus={() => {
                handleError(null, "enterPassword");
              }}
              value={inputs.enterPassword}
              onChangeText={(text) => handleOnChange(text, "enterPassword")}
            />

            {
              message ? (
                <Container width={"100%"} r={8} p={8} mv={12} bgColor={"rgba(255, 0, 0, 0.2)"}>
                  <Text paragraph center color={colors.TOMATO}>{message}</Text>
                </Container>
              ) : (
                <Container mv={24} />
              )
            }
            <Button onPress={validate} 
              shadow 
              jCenter aCenter 
              row r={30} mb={16}
              bgColor={colors.PRIMARY}
              width={"100%"} height={48}>
              <Text body color={colors.WHITE} bold uppercase>Đăng ký</Text>
            </Button>

            <Text onPress={() => goBack()} body center underline mv={16}>Trở về</Text>
          </Container>
        </Container>
        <Loading visible={loading} text={"Đang đăng ký, vui lòng đợi..."} />
      </Container>
    </KeyboardAvoidingView>
  );
}