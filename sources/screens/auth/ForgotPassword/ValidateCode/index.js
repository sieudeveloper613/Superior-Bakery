import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native';
import { Container, Button, Text, Input } from '../../../../components';
import { Header } from '../../../../components/custom';
import { colors } from '../../../../themes/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { FORGOT_PASSWORD } from '../../../../routes/ScreenName'

const ValidateCode = ({ navigation: { navigate }}) => {
    const [code, setCode] = useState('');
    const VerifyLabel = () => {
        return (
            <Container width={'100%'} mt={12} mb={36}>
                <Text size={24} color={colors.BLACK} bold mb={8}>Xác thực</Text>
                <Text paragraph color={colors.DARK_GREY}>Mã xác thực đã được gửi đến Email của bạn thông qua Gmail.</Text>
            </Container>
        )
    }

    const Resend = () => {
        return (
            <Container row width={'100%'} aCenter jCenter>
                <Text paragraph color={colors.DARK_GREY}>Bạn chưa nhận được mã xác thực?</Text>
                <Text
                    onPress={() => {}} 
                    body color={colors.BLACK} bold>{' '}Gửi lại mã</Text>
            </Container>
        )
    }

    return (
        <Container flex={1} bgColor={colors.LIGHT_GREY}>
            <Header label={'Mã xác thực'} />
            <Container flex={1} p={16}>
                <Container flex={0.8}>
                    <VerifyLabel />
                    <OTPInputView 
                        style={{
                            width: '100%', 
                            height: 55,
                        }}
                        codeInputFieldStyle={{
                            width: 45, height: 55,
                            borderRadius: 6,
                            backgroundColor: colors.WHITE,
                            shadowOffset: { width: 0, height: 1},
                            shadowColor: colors.SHADOW,
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 2, 
                            borderWidth: 0,
                            color: colors.BLACK,
                            fontSize: 24
                        }}
                        pinCount={6}
                        code={code}
                        autoFocusOnLoad
                        onCodeChanged={text => setCode(text)} 
                    />
                    </Container>
                <Container 
                    flex={0.2} jCenter aCenter>
                    <Resend /> 
                    <Button
                        onPress={() => {
                            if (code && code.length === 6){
                                Alert.alert('Noti', `your password is ${code}`)
                                navigate(FORGOT_PASSWORD.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN)
                            } else {
                                Alert.alert('Noti', `pass code is not empty`)
                            }
                        }}

                        width={'100%'} height={48} r={6} mt={16}
                        bgColor={colors.PRIMARY} jCenter aCenter>
                        <Text body color={colors.WHITE} bold>Xác nhận</Text>
                    </Button>
                </Container>
                
            </Container>
        </Container>
    )
}

export default ValidateCode

const styles = StyleSheet.create({})