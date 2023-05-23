import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Input, Image } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import Feather from 'react-native-vector-icons/MaterialCommunityIcons'
import { images } from '../../../../../themes/images'

const PersonalInfo = ({ onPress, avatar, buttonText, username, customerType, rank, bill, paying, product }) => {
    const InfoRow = ({ label, value }) => {
        return (
            <Container width={'33%'} jCenter aCenter>
            <Text size={16} color={colors.PRIMARY} bold mb={4}>{value}</Text>
            <Text size={12} color={colors.DARK_GREY}>{label}</Text>
            </Container>
        )
    }
    return (
        <Container width={'100%'}>
            <Container row aEnd>
                <Image imageUri={avatar} width={72} height={72} radius={16} />
                <Button 
                    width={'auto'} height={36} r={30} jCenter aCenter
                    bgColor={colors.BLUE} ph={16} ml={16}
                    onPress={onPress}
                >
                    <Text caption color={colors.WHITE}>{buttonText}</Text>
                </Button>
            </Container>
            <Container width={'100%'} row mv={16}>
                <Container width={'60%'}>
                    <Text body color={colors.BLACK} bold mb={2}>{username}</Text>
                    <Text paragraph color={colors.DARK_GREY} mt={2}>{customerType}</Text>
                </Container>
                <Container row width={'40%'} jEnd aCenter>
                    <Feather name='hexagon' color={colors.DARK_GREY} size={24} />
                    <Text paragraph bold ml={8} color={colors.DARK_GREY}>{rank}</Text>
                </Container>
            </Container>

            <Container row width={'100%'} r={12} bgColor={colors.WHITE} shadow between jCenter aCenter p={8} mv={8}>
            <InfoRow label={'Tổng'} value={bill}/>
            <Container width={1} height={'100%'} bgColor={colors.GREY}/>
            <InfoRow label={'Hóa đơn'} value={paying}/>
            <Container width={1} height={'100%'} bgColor={colors.GREY}/>
            <InfoRow label={'Sản phẩm'} value={product}/>
            </Container>
        </Container>
    )
}

export default PersonalInfo

const styles = StyleSheet.create({})