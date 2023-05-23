import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Keyboard, ActivityIndicator, } from 'react-native';
import { Container, Button, Text} from '../../../../components'
import { colors } from '../../../../themes/colors';
import { Header } from '../../../../components/custom';
import InfoInput from './components/InfoInput';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useSelector, useDispatch } from 'react-redux';
import { authorizationApi } from '../../../../APIs';
import { logDebug, logError } from '../../../../utils/console';
import { loginAction } from '../../../../redux/Actions/authAction';

const EditProfile = () => {
  const authState = useSelector(state => state.authState.authInfo);
  const dispatch = useDispatch();
  let username = authState.fullname.split(' ');
  const firstElement = username.pop();
  const [inputs, setInputs] = useState({
    id: authState._id,
    email: authState.email,
    firstname: firstElement,
    lastname: username.join(' '),
    phone: authState.phone,
  })
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    callbackData();
  },[])
  
  const callbackData = async () => {
    try {
      const handleData = await authorizationApi.getInfo(authState.email);
      if(handleData) {
        dispatch(loginAction(handleData))
      }
    } catch (error) {
      logError('catch-error: ', error)
    }
  }

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (ErrorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: ErrorMessage}));
  }
  
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    
    if(!inputs.lastname) {
      handleError('Họ đệm không được trống', 'lastname')
      valid = false;
    }

    if(!inputs.firstname){
      handleError('Tên không được để trống', 'firstname')
      valid = false;
    } 

     if(!inputs.phone) {
        handleError('Số điện thoại không được để trống!', 'phone');
        valid = false;
    } if(inputs.phone.length != 10 && inputs.phone.length > 0) {
      handleError('Số điện thoại phải đủ 10 số', 'phone');
      valid = false;
    }

    if(valid) {
      onUpdateInfo();
    }
  };

  const onUpdateInfo = async () => {
      setLoading(true);
        try {
          let mergeString = inputs.lastname.concat(" ", inputs.firstname);
          logDebug('merge-string: ', mergeString, inputs.id);
          if(inputs.id){
            const response = await authorizationApi.updateInfo(
              inputs.id,
              mergeString.toString(),
              inputs.phone,
            );
            console.log('get-data: ', response)
            if(response.isSuccess == 1){
              Toast.show({
                type: 'success',
                props: { 
                  icon: 'smile-circle',
                  title: 'Thành công',
                  message: 'Cật nhập thông tin thành công!', 
                  backgroundColor: colors.GREEN },
                position: 'bottom'
              });
                setInputs({
                  id: authState._id,
                  email: authState.email,
                  firstname: authState.fullname.split(" ").pop(),
                  lastname: authState.fullname.join(' '),
                  phone: authState.phone,
                })
                await callbackData();
            } else if(response.isSuccess == 0) {
              Toast.show({
                type: 'error',
                props: { 
                  icon: 'frown',
                  title: 'Thất bại',
                  message: 'Cật nhập không thành công!', 
                  backgroundColor: colors.TOMATO },
                position: 'bottom'
              });
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
    <Container flex={1} safe bgColor={colors.LIGHT_GREY}>
      <Header label={'Cật nhập thông tin'} />
      <Container flex={1} p={16}>
        <Container bgColor={colors.WHITE} shadow r={16} p={16}>
          <InfoInput 
            width={'100%'}
            label={'Địa chỉ Email'}
            placeholder={'Nhập địa chỉ Email'}
            value={inputs.email}
            onChangeText={() => {}}
            editable={false}
          />
          <Container row width={'100%'} between>
          <InfoInput 
            width={'48%'}
            label={'Họ đệm'}
            placeholder={'Nhập họ đệm'}
            value={inputs.lastname}
            error={errors.lastname}
            onFocus={() => {
                handleError(null, 'lastname');
            }}
            onChangeText={(text) => handleOnChange(text, 'lastname')}
          />
           <InfoInput 
            width={'48%'}
            label={'Tên'}
            placeholder={'Nhập tên'}
            value={inputs.firstname}
            error={errors.firstname}
            onFocus={() => {
                handleError(null, 'firstname');
            }}
            onChangeText={(text) => handleOnChange(text, 'firstname')}
          />
          </Container>
           
           <InfoInput 
            width={'100%'}
            label={'Số điện thoại'}
            placeholder={'Nhập số điện thoại'}
            value={inputs.phone}
            error={errors.phone}
            onFocus={() => {
                handleError(null, 'phone');
            }}
            onChangeText={(text) => handleOnChange(text, 'phone')}
            keyboardType={'numeric'}
          />
          <Button 
            onPress={() => validate()}
            width={'100%'} height={48} r={12}
            bgColor={colors.PRIMARY} jCenter aCenter
            disable={loading ? true : false}>
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

export default EditProfile

const styles = StyleSheet.create({})