import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Input } from '../../../../../components';
import { colors } from '../../../../../themes/colors';

const FoodNote = ({ label, placeholder, value, onChangeText }) => {
  return (
    <Container
        width={'100%'} height={'auto'} p={12} r={16} mv={8}
        bgColor={colors.WHITE} shadow>
            <Text body color={colors.PRIMARY} bold>{label}</Text>
            <Container
                width={'100%'} p={12} r={12} mt={8}
                bgColor={colors.LIGHT_GREY}>
                <Input
                    style={{ textAlignVertical: 'top' }}
                    body color={colors.BLACK}
                    placeholder={placeholder}
                    placeholderTextColor={colors.DARK_GREY}
                    underlineColorAndroid={'transparent'}
                    multiline
                    numberOfLines={5}
                    maxLength={60}
                    value={value}
                    onChangeText={onChangeText}
                />
            </Container>
    </Container>
  )
}

export default FoodNote

const styles = StyleSheet.create({})