import React, { useState } from 'react'
import { KeyboardAvoidingView, Keyboard, ScrollView, StyleSheet, Alert } from 'react-native';
import { Container, Text, Input, Button, Image } from '../../../components';
import { colors } from '../../../themes/colors';
import { images } from '../../../themes/images';
import { logInfo } from '../../../utils/console';
import { authorizationApi } from '../../../APIs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Loading } from '../../../components/custom';


export default function SignUp({ navigation: { goBack }}) {
  const [inputs, setInputs] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    enterPassword: '',
  })
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: ErrorMessage}));
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//validate inputs
const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let match = inputs.email.match(/\S+@\S+\.\S+/);

    // validate phone number
    if(!inputs.phone || inputs.phone  === null) {
        handleError('Vui lòng nhập số điện thoại!', 'phone');
        valid = false;
    } else if(inputs.phone.length !== 10) {
        handleError('Độ dài số điện thoại tối thiểu là 10', 'phone');
        valid = false;
    }

    // validate email and email format
    if(!inputs.email && inputs.email === null) {
        handleError('Vui lòng nhập Email!', 'email');
        valid = false;
    } else if(!inputs.email || !match ) {
        console.log('sai email')
        handleError('Email sai định dạng (nguyenvana@gmail.com)', 'email');
        valid = false;
    }

    // validate name of unit of person
    if(!inputs.fullName || inputs.fullName === null) {
        handleError('Vui lòng nhập họ và tên!', 'fullName');
        valid = false;
    }

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
        handleError('Mật khẩu không được để trống', 'enterPassword');
        valid = false;
    }else if(inputs.enterPassword.length < 6 ) {
        handleError('Độ dài mật khẩu tối thiểu phải là 6', 'enterPassword');
        valid = false;
    } else if(inputs.enterPassword != inputs.password) {
        handleError('Mật khẩu không khớp! vui lòng kiểm tra lại!', 'enterPassword');
        valid = false;
    }

    if(valid) {
      // logInfo('REGISTER SUCCESSFULLY: ', `${inputs.fullName}\n${inputs.phone}\n${inputs.email}\n${inputs.password}`)
        onSubmitRegister();
    }
};

  const onSubmitRegister = async () => {
      setLoading(true);
        try {
            const response = await authorizationApi.signUp(
              inputs.email,
              inputs.fullName,
              inputs.phone,
              inputs.password,
            );
            console.log('get-data: ', response)
            if(response.isSuccess == 1){
                Alert.alert('Thông báo: ', "Đăng ký tài khoản thành công!")
            } else {
                Alert.alert('Thất bại: ', "Email đã tồn tại!")
                throw new Error('Email đã tồn tại!')
            }
        } catch (error) {
            console.log('catch-error: ', error)
            // showModal(2);
            Alert.alert('ERROR: ', "NETWORK ERROR")
        }   
        setLoading(false); 
  }

  const OnSignInLogo = () => {
    return (
      <Container mb={16} aCenter>
        <Image square={128} source={images.SUPERIOR_LOGO} />
        <Text headline bold color={colors.BLACK} mt={16}>
          Đăng ký
        </Text>
      </Container>
    );
  };

  const OnButton = ({bgColor, color, text, onPress, icon, source}) => {
    return (
      <Button onPress={onPress} row r={30} mb={16}
        width={'75%'} height={48} shadow jCenter aCenter bgColor={bgColor}>
        {
          icon && <Image style={{ marginRight: 8 }} square={24} source={source}/>
        }
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
        <ScrollView>
          <Container p={16} aCenter>
          
            <OnSignInLogo />
              <InputView 
                iconName='user'
                placeholder='Họ và tên...'
                error={errors.fullName}
                onFocus={() => {
                    handleError(null, 'fullName');
                }}
                onChangeText={(text) => handleOnChange(text, 'fullName')}
              />

              <InputView 
                iconName='phone'
                placeholder='Số điện thoại...'
                keyboardType={'numeric'}
                error={errors.phone}
                onFocus={() => {
                    handleError(null, 'phone');
                }}
                onChangeText={(text) => handleOnChange(text, 'phone')}
              />

              <InputView 
                iconName='mail'
                placeholder='Địa chỉ Email...'
                error={errors.email}
                onFocus={() => {
                    handleError(null, 'email');
                }}
                onChangeText={(text) => handleOnChange(text, 'email')}
              />

              <InputView 
                iconName='key'
                placeholder='Mật khẩu...'
                password
                error={errors.password}
                onFocus={() => {
                    handleError(null, 'password');
                }}
                onChangeText={(text) => handleOnChange(text, 'password')}
              />

              <InputView 
                iconName='lock'
                placeholder='Nhập lại mật khẩu...'
                password
                error={errors.enterPassword}
                onFocus={() => {
                    handleError(null, 'enterPassword');
                }}
                onChangeText={(text) => handleOnChange(text, 'enterPassword')}
              />
            
              <Container mv={24}/>

              <OnButton
                onPress={() => {
                  validate();
                  // setLoading(true);
                }}
                bgColor={colors.PRIMARY}
                color={colors.WHITE}
                text={'Đăng ký'}
              />
              <OnBack />
          </Container> 
        </ScrollView>
      </KeyboardAvoidingView>
      {
        loading === true && <Loading visible={true} text={'Đang đăng ký, vui lòng đợi...'} />
      }
    </Container>
  );
}

const InputView = ({ 
  label, 
  iconName, 
  error, 
  password, 
  onFocus = () => {}, 
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <Container>
      <Container width={'90%'} height={48} row center jCenter aCenter bgColor={colors.LIGHT_GREY} mt={16}
        style={ isFocused ? { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 } : null }>
        <Container width={'15%'} height={'100%'} bgColor={colors.PRIMARY} jCenter aCenter>
          <AntIcon size={24} color={colors.WHITE} name={iconName} />
        </Container>
        <Input ph={8} paragraph width={password ? '75%' : '85%'} height={'100%'} color={colors.BLACK}
          placeholderTextColor={colors.GREY}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
              onFocus();
              setIsFocused(true);
          }} 
          onBlur={() => {
              setIsFocused(false);
          }}
          {...props}
        />
        { password && (
          <IonIcon 
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              style={{ width: '10%', fontSize: 24, color: colors.PRIMARY}}
              onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </Container>
      {
        error && (
            <Text width={'100%'} color={colors.TOMATO} caption right>
              {error}
            </Text>
        )
          
      }
    </Container>
    
      
  )
}

const styles = StyleSheet.create({})