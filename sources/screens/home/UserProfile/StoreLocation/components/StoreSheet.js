import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Button, Image, Text } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import RBSheet from "@nonam4/react-native-bottom-sheet"
import { ColorSpace } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window');

const StoreSheet = ({
  source, name, store, isOpen, onPress, address
}) => {
  return (
      <Container width={'100%'}>
        <Container row width={'100%'}>
          <Container width={'30%'} r={16} jCenter aCenter>
            <Image imageUri={source} square={92} radius={16} center/>
          </Container>
          <Container width={'70%'} pl={8} between>
            <Text body color={colors.BLACK} bold>{name}</Text>
            <Container row width={'100%'} mv={4}>
              <Text width={'50%'} paragraph color={colors.DARK_GREY}>({store})</Text>
              <Text
                width={'50%'} right 
                color={isOpen == true ? colors.GREEN : colors.TOMATO}
                >{isOpen === true ? 'Đang mở cửa' : 'Đang đóng cửa'}
              </Text>
            </Container>
            <Button
              onPress={onPress}
              width={'100%'} height={36} r={30} jCenter aCenter bgColor={colors.PRIMARY}>
              <Text paragraph color={colors.WHITE}>Điều hướng đến bản đồ</Text>
            </Button>
          </Container>
        </Container>
        <Text
          paragraph color={colors.BLACK} bold mv={16}
          >{`Địa chỉ: \t`}    
          <Text paragraph color={colors.BLACK} light>{address}</Text>  
        </Text>
      </Container>
  )
}

export default StoreSheet

const styles = StyleSheet.create({})