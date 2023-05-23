import React, { useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Container, Button, Text, Image } from '../../../../components'
import { images } from '../../../../themes/images'
import { colors } from '../../../../themes/colors'
import InputView from './components/InputView'
import {SIGN_IN_SCREEN} from '../../../../routes/ScreenName'

export default function NewPassword({ navigation: {navigate }} ) {
  const [inputs, setInputs] = useState({
    password: '', 
    enterPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: ErrorMessage}));
  }

  //validate inputs
const validate = () => {
  Keyboard.dismiss();
  let valid = true;

  // validate password and min length password is 6
  if(!inputs.password || inputs.password === null) {
      handleError('Mật khẩu không được để trống!', 'password');
      valid = false;
  } else if(inputs.password.length < 6) {
      handleError('Độ dài mật khẩu tối thiểu phải là 6', 'password');
      valid = false;
  }

  // validate comparing pass and re-pass
  if(!inputs.enterPassword || inputs.enterPassword === null) {
      handleError('Xác nhận mật khẩu không được để trống', 'enterPassword');
      valid = false;
  }else if(inputs.enterPassword.length < 6 ) {
      handleError('Độ dài mật khẩu tối thiểu phải là 6', 'enterPassword');
      valid = false;
  } else if(inputs.enterPassword != inputs.password) {
      handleError('Mật khẩu không khớp! vui lòng kiểm tra lại!', 'enterPassword');
      valid = false;
  }

  if(valid) {
    navigate(SIGN_IN_SCREEN);
      // onSubmitRegister();
  }
};

  const OnSignInLogo = () => {
    return (
      <Container mb={16} aCenter>
        <Image square={128} source={images.SUPERIOR_LOGO} />
        <Text headline bold color={colors.BLACK} mt={16}>
          Xác nhận Email
        </Text>
      </Container>
    );
  };

  const OnButton = ({ bgColor, color, text, onPress }) => {
    return (
      <Button onPress={onPress} row r={30} mb={16}
        width={'75%'} height={48} shadow jCenter aCenter bgColor={bgColor}>
        <Text body color={color} bold uppercase>{text}</Text>
      </Button>
    )
  }

  const OnBack = () => {
    return (
      <Text body underline mv={16}
        onPress={() => goBack()}
      >Trở về</Text>
    )
  }
  return (
    <Container safe bgColor={colors.WHITE}>
       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
          <Container height={'70%'} p={16} aCenter>
            <OnSignInLogo />

              <InputView 
                iconName='key'
                placeholder='Nhập mật khẩu mới'
                password
                error={errors.password}
                onFocus={() => {
                    handleError(null, 'password');
                }}
                onChangeText={(text) => handleOnChange(text, 'password')}
              />

              <InputView 
                iconName='key'
                placeholder='Xác nhận mật khẩu mới'
                password
                error={errors.enterPassword}
                onFocus={() => {
                    handleError(null, 'enterPassword');
                }}
                onChangeText={(text) => handleOnChange(text, 'enterPassword')}
              />      
            
          </Container> 
          <Container height={'30%'} jCenter aCenter>
          <Container mv={24}/>
            <OnButton
              onPress={() => validate()}
              bgColor={colors.PRIMARY}
              color={colors.WHITE}
              text={'Xác nhận'}
            />
            <OnBack />
          </Container>
      </KeyboardAvoidingView>
    </Container>
  )
}

const styles = StyleSheet.create({})