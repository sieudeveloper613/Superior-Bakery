import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text, Button } from '../../../../../components';
import { colors } from '../../../../../themes/colors';

const OrderBill = ({ label, voucher, estimatedCost, deliverCost, onPress }) => {
    const [isChoose, setIsChoose] = useState(false);
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
            width={'100%'} height={'auto'} p={12} r={0} mv={8}
            bgColor={colors.WHITE} shadow>
                <Text paragraph color={colors.PRIMARY} bold mv={8}>{label}</Text>
                <Row caption={'Tạm tính'} body={estimatedCost} color={colors.BLACK} />
                <Row caption={'Mã quà tặng'} body={voucher} color={colors.GREEN} />
                <Button
                    onPress={onPress}
                    row width={'100%'} height={'auto'} r={6} p={8} mt={16} aCenter jCenter
                    bgColor={colors.WHITE} bColor={colors.PRIMARY} b={1} dashed>
                    <Text width={'75%'} paragraph color={isChoose ? colors.GREEN : colors.DARK_GREY}>
                        { isChoose ? 'XXXXLLC' : 'Bạn chưa áp dụng mã quà tặng' }
                    </Text>
                    <Text body color={colors.PRIMARY} width={'25%'} bold right>
                        {isChoose ? 'Thay đổi' : 'Thêm mã'}
                    </Text>
                </Button>
        </Container>
    )
}

export default OrderBill

const styles = StyleSheet.create({})