import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Image } from '../../../../components'
import { colors } from '../../../../themes/colors'
import { Header } from '../../../../components/custom'
import { icons } from '../../../../themes/icons'

const VoucherDetail = () => {
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Chi tiết mã khuyến mãi'} />
      <Container flex={1} p={16}>

      </Container>
    </Container>
  )
}

export default VoucherDetail

const styles = StyleSheet.create({})