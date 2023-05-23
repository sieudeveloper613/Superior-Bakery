import React, { useState } from 'react'
import { KeyboardAvoidingView, Keyboard, StyleSheet } from 'react-native';
import { Container, Text, Button, Image } from '../../../../components'
import { colors } from '../../../../themes/colors';
import { images } from '../../../../themes/images';
import { InputView } from '../components/Input';
import { logInfo } from '../../../utils/console'
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { FORGOT_PASSWORD } from '../../../../routes/ScreenName';


export default function ValidateEmail({ navigation: { navigate, goBack } }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
  })

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: ErrorMessage}));
  }

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let match = inputs.email.match(/\S+@\S+\.\S+/);
    // validate email and email format
    if(!inputs.email) {
        handleError('Vui lòng nhập Email!', 'email');
        valid = false;
    } 
    else if(!inputs.email || !match ) {
        console.log('sai email')
        handleError('Email sai định dạng (nguyenvana@gmail.com)', 'email');
        valid = false;
    }


    if(valid) {
      navigate(FORGOT_PASSWORD.FORGOT_PASSWORD_VALIDATE_CODE_SCREEN);  
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
                iconName='mail'
                placeholder='Địa chỉ Email...'
                info
                error={errors.email}
                onFocus={() => {
                    handleError(null, 'email');
                }}
                onChangeText={(text) => handleOnChange(text, 'email')}
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