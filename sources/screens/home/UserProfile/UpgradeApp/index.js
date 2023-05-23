import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from '../../../../components'
import { colors } from '../../../../themes/colors'
import { Header } from '../../../../components/custom'
import Feather from 'react-native-vector-icons/Feather'

const UpgradeApp = () => {
  const [isCurrent, setIsCurrent] = useState(false);
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Phiên bản ứng dụng'} />
      <Container flex={1} p={16}>
        <Container 
          width={'100%'} height={'auto'} r={16} p={16}
          row bgColor={colors.WHITE} shadow>
            <Container width={'70%'}>
              <Text body color={colors.BLACK} bold>Phiên bản ứng dụng</Text>
              <Text paragraph color={colors.DARK_GREY}>1.0.2</Text>
            </Container>
            <Button
              onPress={() => setIsCurrent(prev => !prev)}
              width={'30%'} height={36} r={30} shadow
              bgColor={colors.BLUE} aCenter jCenter>
              <Text paragraph color={colors.WHITE} bold>Kiểm tra</Text>
            </Button>
        </Container>
        {
          isCurrent == true ?
            <Container 
              width={'100%'} height={48} r={16} mv={16}
              bgColor={colors.GREEN} jCenter aCenter>
                <Text body medium color={colors.WHITE}>Đây đã là phiên bản mới nhất</Text>
            </Container>
          :
            <Container
              width={'100%'} height={'auto'} r={16} mv={16} p={20}
              bgColor={colors.WHITE} shadow jCenter aCenter>
                <Text
                  body color={colors.BLACK}
                  >Đã có phiên bản mới, bạn có muốn cật nhập không?
                </Text>
                <Container row width={'100%'} mv={16} between>
                  <Container row width={'50%'} aCenter>
                    <Feather name='save' size={24} color={colors.DARK_GREY} />
                    <Text color={colors.BLACK} ml={8}>45.23 mb</Text>
                  </Container>
                  <Text 
                    width={'50%'} paragraph color={colors.DARK_GREY}
                    >
                      {`Trạng thái: \t`} 
                      <Text paragraph color={colors.BLUE} bold>Có sãn</Text>
                  </Text>
                </Container>
                <Container row width={'100%'} between>
                  <Button 
                    onPress={() => {}}
                    width={'30%'} height={42} r={12}
                    bgColor={'rgba(255, 0, 0, 0.15)'} jCenter aCenter>
                      <Text body color={colors.TOMATO} bold>Hủy</Text>
                  </Button>
                  <Button 
                    onPress={() => {}}
                    width={'50%'} height={42} r={12}
                    bgColor={colors.GREEN} jCenter aCenter>
                      <Text body color={colors.WHITE} bold>Cật nhập</Text>
                  </Button>
                </Container>
            </Container>
        }
      </Container>
    </Container>
  )
}

export default UpgradeApp

const styles = StyleSheet.create({})