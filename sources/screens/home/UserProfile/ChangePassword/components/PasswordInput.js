import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Input } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import IonIcon from 'react-native-vector-icons/Ionicons'

const PasswordInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  password, 
  error,
  onFocus = () => {}, 
  ...props
 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <Container width={'100%'} mb={16}>
        <Text body color={colors.BLACK} bold mb={8}>{label}</Text>
        <Container 
            row width={'100%'} height={48} ph={8} r={12}
            bgColor={colors.WHITE} b={1} bColor={colors.GREY} jCenter aCenter>
            <Input
                body color={colors.BLACK}
                width={'90%'} height={48}
                placeholder={placeholder}
                placeholderTextColor={colors.GREY}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={hidePassword}
                onFocus={() => {
                  onFocus();
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            { password && (
              <IonIcon 
                  name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                  style={{ width: '10%', fontSize: 24, color: colors.PRIMARY}}
                  onPress={() => setHidePassword(!hidePassword)}
              />
            )}
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

export default PasswordInput

const styles = StyleSheet.create({})