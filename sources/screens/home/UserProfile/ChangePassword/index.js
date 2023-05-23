import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Keyboard, View } from 'react-native'
import { Container, Button, Text } from '../../../../components'
import { authorizationApi } from '../../../../APIs'
import { colors } from '../../../../themes/colors'
import { Header } from '../../../../components/custom'
import PasswordInput from './components/PasswordInput'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ChangePassword = () => {
  const authState = useSelector(state => state.authState.authInfo);
  const [inputs, setInputs] = useState({
    email: authState.email,
    oldPassword: '',
    password: '',
    enterPassword: '',
  })
 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: ErrorMessage}));
  }

  

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    
    if(!inputs.oldPassword) {
      handleError('Mật khẩu không được để trống', 'oldPassword')
      valid = false;
    }

    if(!inputs.password){
      handleError('Mật khẩu mới không được để trống', 'password')
      valid = false;
    } else if(inputs.password.length < 6 ){
      handleError('Độ dài mật khẩu mới tối thiểu phải là 6', 'password');
      valid = false;
    }

    if(!inputs.enterPassword) {
        handleError('Xác nhận mật khẩu không được để trống', 'enterPassword');
        valid = false;
    } else if(inputs.enterPassword != inputs.password) {
        handleError('Mật khẩu không khớp! vui lòng kiểm tra lại!', 'enterPassword');
        valid = false;
    }

    if(valid) {
      onChangePassword();
      
    }
  };

  const onChangePassword = async () => {
      setLoading(true);
        try {
          if(inputs.email){
            const response = await authorizationApi.changePassword(
              inputs.email,
              inputs.oldPassword,
              inputs.password,
            );
            console.log('get-data: ', response)
            if(response.isSuccess == 1){
              Toast.show({
                type: 'success',
                props: { 
                  icon: 'smile-circle',
                  title: 'Thành công',
                  message: 'Đổi mật khẩu thành công!', 
                  backgroundColor: colors.GREEN },
                position: 'bottom'
              });
                setInputs({
                  email: authState.email,
                  oldPassword: '',
                  password: '',
                  enterPassword: '',
                })
            } else if(response.isSuccess == 2) {
              Toast.show({
                type: 'error',
                props: { 
                  icon: 'frown',
                  title: 'Lỗi xác thực',
                  message: 'Mật khẩu hiện tại không khớp, vui lòng kiểm tra lại!', 
                  backgroundColor: colors.TOMATO },
                position: 'bottom'
              });
                throw new Error('Mật khẩu hiện tại không khớp!')
            }
          } else {
            setLoading(false); 
  
          }
        } catch (error) {
            console.log('catch-error: ', error)
        }
        
        setLoading(false); 
  }

  const toastConfig = {
    success: ({ props }) => (
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
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Thay đổi mật khẩu'} />
      <Container flex={1} p={16}>
        <Container 
          width={'100%'} height={'auto'} p={16} r={16}
          bgColor={colors.WHITE} shadow>
            <PasswordInput
              label={'Mật khẩu hiện tại'}
              placeholder={'nhập mật khẩu hiện tại'}
              password
                error={errors.oldPassword}
                onFocus={() => {
                    handleError(null, 'oldPassword');
                }}
                value={inputs.oldPassword}
                onChangeText={(text) => handleOnChange(text, 'oldPassword')}
            />
            <PasswordInput
              label={'Mật khẩu mới'}
              placeholder={'nhập mật khẩu mới'}
              password
                error={errors.password}
                onFocus={() => {
                    handleError(null, 'password');
                }}
                value={inputs.password}
                onChangeText={(text) => handleOnChange(text, 'password')}
            />
            <PasswordInput
              label={'Xác nhận mật khẩu mới'}
              placeholder={'nhập lại mật khẩu'}
              password
                error={errors.enterPassword}
                onFocus={() => {
                    handleError(null, 'enterPassword');
                }}
                value={inputs.enterPassword}
                onChangeText={(text) => handleOnChange(text, 'enterPassword')}
            />
            <Button
              onPress={() => validate()}
              width={'100%'} height={48} mv={16} r={12}
              bgColor={colors.PRIMARY} jCenter aCenter
              disable={loading ? true : false}
              >
                {
                  loading ? 
                    <Container row>
                      <ActivityIndicator size={'small'} color={colors.WHITE} />
                      <Text body color={colors.WHITE} bold ml={8}>Đang xử lý...</Text>
                    </Container>
                  : <Text body color={colors.WHITE} bold>Xác nhận</Text>
                }
            </Button>
        </Container>
      </Container>
      <Toast config={toastConfig} />
    </Container>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})