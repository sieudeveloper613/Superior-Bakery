import React from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text, Image } from '../../../../components';
import { colors } from '../../../../themes/colors';
import { Header } from '../../../../components/custom';
import { logDebug } from '../../../../utils/console';
import { images } from '../../../../themes/images';
const DetailNotification = ({ route }) => {
  const { item } = route.params;
  logDebug('get-item: ', item)
  return (
    <Container flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Chi tiết thông báo'} />
      <Container flex={1} p={16}>
        <Container 
          row width={'100%'} pv={12} r={12}
          bgColor={colors.WHITE} shadow between aCenter>
          <Container width={'30%'} jCenter aCenter>
            <Image style={{ backgroundColor: colors.WHITE }} round={72} center source={images.SUPERIOR_LOGO}/>
          </Container>
          <Container width={'70%'} pl={12}>
          <Text mb={6} body color={colors.BLUE} bold uppercase letterSpacing={1}>{item?.type === 'event' ? 'Sự kiện' : 'Của bạn'}</Text>
          <Text mt={6} size={16} color={colors.PRIMARY} bold uppercase>{item.title}</Text>
          </Container>
        </Container>
        <Text paragraph color={colors.DARK_GREY} center mv={12}>Chi tiết</Text>
        <Container 
          width={'100%'} p={12} r={12}
          bgColor={colors.WHITE} shadow aCenter>
            <Text body color={colors.BLACK}>{item.content}</Text>
            <Container width={'100%'} height={1} bgColor={colors.GREY} mv={16}/>
            <Text width={'100%'} right>{item.createAt.split("T")[0].trim()}</Text>
        </Container>
      </Container>
    </Container>
  )
}

export default DetailNotification

const styles = StyleSheet.create({})