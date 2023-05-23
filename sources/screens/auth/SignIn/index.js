import React, {useState} from 'react';
import {Alert, Dimensions, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Container, Text, Button, Input, Image} from '../../../components';
import {colors} from '../../../themes/colors';
import {images} from '../../../themes/images';
import { authorizationApi } from '../../../APIs'
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Loading } from '../../../components/custom';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  SIGN_UP_SCREEN,
  INTRODUCTION_SCREEN,
  FORGOT_PASSWORD
} from '../../../routes/ScreenName'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logInfo } from '../../../utils/console';



const {width, height} = Dimensions.get('window');

export default function SignIn({ navigation: { navigate } }) {
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = (input) => setFocusedInput(input);

  const onSignIn = async () => {
    setIsLoading(true);
    try {
      if(!account || !password) {
        Toast.show({
          type: 'info',
          props: { 
            icon: 'aliwangwang',
            title: 'Nhắc nhở',
            message: 'Tài khoản hoặc mật khẩu không được để trống!', 
            backgroundColor: colors.BLUE },
          position: 'bottom'
        });
      } else {
        const onHandle = await authorizationApi.signIn(account, password);
        if(onHandle) {
          if( onHandle.isSuccess == 1 ){
            if( isChecked == true ){
              await onRemember(account, password);
              navigate(INTRODUCTION_SCREEN, { account });
            } else {
              navigate(INTRODUCTION_SCREEN, { account });
            }
          } else {
            return null;
          }
          
        } else {
          Toast.show({
            type: 'error',
            props: { 
              icon: 'frown',
              title: 'Lỗi xác thực',
              message: 'Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại!', 
              backgroundColor: colors.TOMATO },
            position: 'bottom'
          });
        }
      }
      
    } catch (error) {
      console.log('catch-error: ', error)
    }
    setIsLoading(false);
  }

  const onRemember = async (user, password) => {
    logInfo('params-remember: ', user, password);
    const rememberUser = {
      username: user,
      password: password
    }
      const store = await AsyncStorage.setItem('LOGIN', JSON.stringify(rememberUser))
      return store;
  }

  const OnSignInLogo = () => {
    return (
      <Container mb={16} aCenter>
        <Image square={128} source={images.SUPERIOR_LOGO} />
        <Text headline bold color={colors.BLACK} mt={16}>
          Đăng nhập
        </Text>
      </Container>
    );
  };

  const OnFooter = () => {
    return (
      <Container width={'100%'} row jCenter>
        <Text paragraph color={colors.BLACK}>Chưa có tài khoản?</Text>
        <Text onPress={() => navigate(SIGN_UP_SCREEN)} paragraph bold color={colors.PRIMARY}>{`\tĐăng ký ngay`}</Text>
      </Container>
    )
  }

  const OnButton = () => {
    return (
      <Container width={'100%'}> 
        <Button
          onPress={() => onSignIn()}
          width={'100%'} height={48} r={8} bgColor={colors.PRIMARY} p={8}
          jCenter={true} aCenter={true}>
            <Text color={colors.WHITE} size={16} bold uppercase>Đăng nhập</Text>
        </Button>
        <Text color={colors.BLACK} size={14} center mv={24}>hoặc</Text>
        <Container row flex={1} between>
          <Button
            onPress={() => {
              Toast.show({
                type: 'info',
                props: { 
                  icon: 'aliwangwang',
                  title: 'Thông báo',
                  message: 'Chức năng đang được phát triển, vui lòng thử lại sau!', 
                  backgroundColor: colors.BLUE },
                position: 'bottom'
              });
            }} 
            width={48} height={48} r={8} shadow jCenter={true} aCenter={true} bgColor={colors.WHITE}>
            <Image width={28} height={28} source={images.GOOGLE_LOGO} />
          </Button>
          <Button width={'80%'} height={48} r={8} shadow jCenter={true} aCenter={true} bgColor={colors.BLACK}>
            <Text color={colors.WHITE} size={16} bold>Đăng nhập sau</Text>
          </Button>
        </Container>
      </Container>
    )
  }
  
  const toastConfig = {
    info: ({ props }) => (
        <View style={{ 
            flexDirection: 'row',
            width: '90%', 
            backgroundColor: props.backgroundColor,
            padding: 10,
            borderRadius: 6,
            elevation: 2,
            alignItems: 'center'}}>
            <AntIcon name={props.icon} size={24} color={'white'} />
            <View style={{
              flexDirection: 'column',
              width: '85%',
              marginLeft: 12
            }}>
              <Text size={16} color={'white'} bold>{props.title}</Text>
              <Text size={12} color={'white'} >{props.message}</Text>
            </View>
        </View>
    ),
    error: ({ props }) => (
      <View style={{ 
          flexDirection: 'row',
          width: '90%', 
          backgroundColor: props.backgroundColor,
          padding: 10,
          borderRadius: 6,
          elevation: 2,
          alignItems: 'center'}}>
          <AntIcon name={props.icon} size={24} color={'white'} />
          <View style={{
            flexDirection: 'column',
            width: '85%',
            marginLeft: 12
          }}>
            <Text size={16} color={'white'} bold>{props.title}</Text>
            <Text size={12} color={'white'} >{props.message}</Text>
          </View>
      </View>
  ),
  }

  return (
    <Container flex={1} safe bgColor={colors.LIGHT_GREY}>
      {/* HEADER */}
      <Container flex={3} aCenter jCenter>
        <OnSignInLogo />
      </Container>

      {/* SIGN IN BODY */}
      <Container flex={6.3}>
        {/* START - INPUT TO ACCOUNT */}
        <Container width={'90%'} height={48} shadow row center jCenter aCenter bgColor={colors.WHITE} mv={8}
          style={ focusedInput === 'account' ? { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 } : null }>
          <Container width={'15%'} height={'100%'} bgColor={colors.PRIMARY} jCenter aCenter>
            <AntIcon size={24} color={colors.WHITE} name={'user'} />
          </Container>
          <Input ph={8} paragraph width={'85%'} height={'100%'} color={colors.BLACK} 
            onFocus={() => handleFocus('account')}
            onChangeText={setAccount} 
            value={account}
            placeholder={'Nhập tài khoản...'}
            placeholderTextColor={colors.GREY}
          />
        </Container>
        {/* END - INPUT TO ACCOUNT */}

          {/* START - INPUT TO PASWWORD */}
          <Container width={'90%'} height={48} shadow={true} row center jCenter aCenter bgColor={colors.WHITE} mv={8}
            style={focusedInput === 'password' ? { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 } : null }>
            <Container width={'15%'} height={'100%'} bgColor={colors.PRIMARY} jCenter aCenter>
              <AntIcon size={24} color={colors.WHITE} name={'key'} />
            </Container>
            <Input ph={8} paragraph width={'73%'} height={'100%'} color={colors.BLACK}
              onFocus={() => handleFocus('password')}
              onChangeText={setPassword}
              value={password}
              placeholder={'Mật khẩu...'}
              secureTextEntry={hidePassword ? true : false}
              placeholderTextColor={colors.GREY}
            />
            {/* BUTTON TO SHOW/HIDE PASSWORD */}
            <Button
              width={'12%'}
              onPress={() => setHidePassword(!hidePassword)}>
                <IonIcon size={24} color={colors.PRIMARY} name={hidePassword ? 'eye' : 'eye-off'} />
            </Button>
          </Container>
          {/* END - INPUT TO PASWWORD */}

          {/* REMEMBER AND FORGOT PASSWORD */}
          <Container width={'90%'} height={'auto'} row center aCenter mv={8}>
            <Container row flex={5}>
              <BouncyCheckbox
                size={20}
                fillColor={colors.PRIMARY}
                unfillColor={colors.LIGHT_GREY}
                text="Nhớ tài khoản"
                textStyle={{ fontFamily: "JosefinSans-Regular", fontSize: 14, textDecorationLine: 'none', color: colors.BLACK, marginLeft: -8 }}
                isChecked={false}
                onPress={() => {
                  setIsChecked(prev => !prev)
                  console.log('is-checked: ', isChecked)
                }}
              />
            </Container>
            <Container row flex={5} jEnd>
              <Text
                onPress={() => navigate(FORGOT_PASSWORD.FORGOT_PASSWORD_VALIDATE_EMAIL_SCREEN)} 
                size={14} color={colors.PRIMARY}>Quên mật khẩu?</Text>
            </Container>
          </Container>

          {/* BUTTON */}
          <Container width={'90%'} height={'auto'} row center aCenter mv={8} pv={24}>
            <OnButton />
          </Container>
        </Container>

        {/* FOOTER */}
        <Container flex={0.7} jCenter aCenter>
          <OnFooter />
        </Container>
        {
          isLoading === true && <Loading visible={true} text={'Đang đăng nhập, vui lòng đợi...'} />
        } 
        <Toast config={toastConfig} />
    </Container>
  );
}
