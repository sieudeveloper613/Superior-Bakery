import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Input, Text } from '../../../../../components'
import { colors } from '../../../../../themes/colors'

const InfoInput = ({
    label, 
    placeholder, 
    focus,  
    value, 
    onChangeText, 
    width,
    error,
    onFocus = () => {}, 
    ...props
  }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container width={width} mb={24}>
        <Text body color={colors.BLACK} bold mb={8}>{label}</Text>
        <Container 
            width={'100%'} height={48} ph={8} b={1} bColor={colors.GREY}
            aCenter r={12} bgColor={isFocused ? colors.LIGHT_GREY : colors.WHITE}>
            <Input width={'100%'} height={'100%'} body color={colors.BLACK}
                placeholder={placeholder}
                placeholderTextColor={colors.GREY}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => {
                  onFocus();
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                style={{ letterSpacing: 1}}
                {...props}
            />
        </Container>
        {
          error && (
              <Text width={'100%'} color={colors.TOMATO} caption right>
                {error}
              </Text>
          ) 
        }
    </Container>
  )
}

export default InfoInput

const styles = StyleSheet.create({})