import React from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../../../../components';
import { colors } from '../../../../../themes/colors';

const OrderBill = ({ label, voucher, estimatedCost, deliverCost, onPress }) => {
    const Row = ({ caption, body, color }) => {
        return (
            <Container row width={'100%'} mv={4}>
                <Text width={'50%'} left body color={colors.DARK_GREY}>{caption}</Text>
                <Text width={'50%'} right body color={color}>{body}</Text>
            </Container>
        )
    }
    return (
        <Container 
            width={'100%'} height={'auto'} p={12} r={16} mv={8}
            bgColor={colors.WHITE} shadow>
                <Text paragraph color={colors.PRIMARY} bold mv={8}>{label}</Text>
                <Row caption={'Tạm tính'} body={estimatedCost} color={colors.BLACK} />
                <Row caption={'Mã quà tặng'} body={voucher} color={colors.GREEN} />
                <Row caption={'Chi phí vận chuyển'} body={deliverCost} color={colors.BLACK} />
        </Container>
    )
}

export default OrderBill

const styles = StyleSheet.create({})