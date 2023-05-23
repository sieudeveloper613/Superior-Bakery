import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Image, Text } from '../../../../components'
import { Header } from '../../../../components/custom'
import { colors } from '../../../../themes/colors'
import Feather from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import {launchImageLibrary} from 'react-native-image-picker';
import { logDebug, logError } from '../../../../utils/console'
import { authorizationApi } from '../../../../APIs'
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ChangeAvatar = () => {
  const authState = useSelector(state => state.authState.authInfo);
  const [filePath, setFilePath] = useState({});

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 300,
      selectionLimit: 1,
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      const { assets } = response;
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      console.log('uri -> ', assets[0].uri);
      console.log('width -> ', assets[0].width);
      console.log('height -> ', assets[0].height);
      console.log('fileSize -> ', assets[0].fileSize);
      console.log('type -> ', assets[0].type);
      console.log('fileName -> ', assets[0].fileName);
      
      setFilePath(assets[0]);
    });
  };

  const onUploadAvatar = async () => {
    try {
      const onUpload = await authorizationApi.uploadAvatar(
        authState._id,
        filePath?.uri
      );
      if (onUpload) {
        const { isSuccess, message } = onUpload;
        if (isSuccess === 1) {
          logDebug('Message-success: ', message);
          Toast.show({
            type: 'success',
            props: { 
              icon: 'smile-circle',
              title: 'Thành công',
              message: 'Đổi mật khẩu thành công!', 
              backgroundColor: colors.GREEN },
            position: 'bottom'
          });
        } else {
          logDebug('Message-failed: ', message);
          Toast.show({
            type: 'error',
            props: { 
              icon: 'frown',
              title: 'Thất bại',
              message: 'Tải ảnh lên thất bại, vui lòng kiểm tra lại!', 
              backgroundColor: colors.TOMATO },
            position: 'bottom'
          });
        }
      }
    } catch (error) {
      logError('on-upload-avatar-catch: ', error);
    }
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
      <Header label={'Đổi ảnh đại diện'} />
      <Container flex={1} p={24} aCenter>
          <Button
            onPress={() => chooseFile()}
            width={300} height={300} r={300/2} b={5} dotted bColor={colors.WHITE} shadow
            jCenter aCenter>
            {
              filePath?.uri ?
                <Image imageUri={filePath?.uri} width={'100%'} height={'100%'} radius={300} contain />
              :
                <Container jCenter aCenter>
                  <Feather name='plus' size={92} color={colors.DARK_GREY} />
                  <Text body color={colors.DARK_GREY} bold>Nhấn vào đây để cật nhập ảnh</Text>
                </Container>
            }
          </Button>
          <Button 
            onPress={() => onUploadAvatar()}
            width={'100%'} height={48} mv={24} r={12}
            bgColor={colors.PRIMARY} jCenter aCenter>
            <Text body color={colors.WHITE} bold uppercase>Tải ảnh lên</Text>
          </Button>
      </Container>
      <Toast config={toastConfig} />
    </Container>
  )
}

export default ChangeAvatar

const styles = StyleSheet.create({})