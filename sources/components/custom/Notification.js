import React from 'react'
import { StyleSheet, Modal } from 'react-native';
import Container from './../Container'
import { colors } from '../../themes/colors';
const Notification = ({ visible, children, ...props}) => {
  return (
    <Modal
      visible={visible}
      transparent={true} 
      animationType='fade'
      {...props}
      >
      <Container flex={1} jCenter aCenter bgColor={colors.BLACK_OPACITY_20}>
        {children}
      </Container>
    </Modal>
  )
}

export default Notification

const styles = StyleSheet.create({})