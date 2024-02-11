import React, { useState } from 'react'
import { StyleSheet, Modal, FlatList } from 'react-native'
import { Container, Text, Button } from '../../../../../components'
import { colors } from '../../../../../themes/colors';
import Feather from 'react-native-vector-icons/Feather';

const VoucherList = ({ visible, onCancel, onApply }) => {
    const [selectedItem, setSelectedItem] = useState(null); 
    const [voucherList, setVoucherList] = useState([]);

    const renderItem = ({ item, index}) => {
        return (
            <Container>

            </Container>
        )
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'>
                <Container safe flex={1} bgColor={colors.WHITE} p={16}>
                    <Container
                        row width={'100%'} between mb={24}>
                            <Button
                                onPress={onCancel} 
                                width={'25%'} aStart jCenter>
                                <Text body color={colors.DARK_GREY} bold>Hủy bỏ</Text>
                            </Button>
                            <Text width={'50%'} size={18} color={colors.PRIMARY} center bold>Mã khuyến mãi</Text>
                            <Button
                                onPress={onApply} 
                                width={'25%'} aEnd jCenter>
                                <Text body color={colors.DARK_GREY} bold>Áp dụng</Text>
                            </Button>
                    </Container>
                    {
                        voucherList && voucherList.length > 0 ?
                            <FlatList 
                                data={voucherList}
                                keyExtractor={item => item._id}
                                renderItem={renderItem}
                            />
                        :
                            <Container 
                                width={'100%'} height={48} r={8} 
                                aCenter jCenter bgColor={colors.GREY}>
                                <Text paragraph color={colors.DARK_GREY}>Hiện tại bạn không có mã khuyến mãi nào!</Text>
                            </Container>
                    }
                </Container>
        </Modal>
  )
}

export default VoucherList

const styles = StyleSheet.create({})