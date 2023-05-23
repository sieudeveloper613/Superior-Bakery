import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from '../../../../components'
import { colors } from '../../../../themes/colors'
import { filterProduct } from '../../../../utils/data'

const FilterModal = ({ onChoose, onClose, onPress }) => {
    const { filterByCategory, filterByPrice, filterByType } = filterProduct
  return (
    <Container width={'100%'} height={'auto'} p={16} mv={8} r={16} shadow bgColor={colors.WHITE}>
        <Container width={'100%'}>
            <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo loại sản phẩm</Text>
            <Container row evenly>
                {
                    filterByCategory.map(item => {
                        return (
                            <Button 
                                onPress={onChoose}
                                key={item.id} 
                                width={'30%'} height={30} r={30} p={4} 
                                jCenter aCenter bgColor={colors.LIGHT_GREY}>
                                <Text color={colors.BLACK} size={14}>{item.name}</Text>
                            </Button>
                        )
                    })
                }
            </Container>
        </Container>

        <Container width={'100%'} mv={16}>
            <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo giá</Text>
            <Container row evenly>
                {
                    filterByPrice.map(item => {
                        return (
                            <Button 
                                onPress={onChoose}
                                key={item.id} 
                                width={'45%'} height={30} r={30} p={4} 
                                jCenter aCenter bgColor={colors.LIGHT_GREY}>
                                <Text color={colors.BLACK} size={14}>{item.name}</Text>
                            </Button>
                        )
                    })
                }
            </Container>
        </Container>

        <Container width={'100%'} >
            <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo sản phẩm</Text>
            <Container row evenly>
                {
                    filterByType.map(item => {
                        return (
                            <Button 
                                onPress={onChoose}
                                key={item.id} 
                                width={'auto'} height={30} r={30} ph={12} 
                                jCenter aCenter bgColor={colors.LIGHT_GREY}>
                                <Text color={colors.BLACK} size={14}>{item.name}</Text>
                            </Button>
                        )
                    })
                }
            </Container>
        </Container>
        <Container mv={16} width={'100%'} height={1} bgColor={colors.DARK_GREY}/>
        <Container row width={'100%'} between>
            <Button
                onPress={onClose} 
                width={90} height={36} r={30} jCenter aCenter bgColor={'rgba(255, 0, 0, 0.2)'}>
                <Text body color={colors.TOMATO} bold>Đóng</Text>
            </Button>
            <Button
                onPress={onPress} 
                width={120} height={36} r={30} jCenter aCenter bgColor={colors.PRIMARY}>
                <Text body color={colors.WHITE} bold>Áp dụng</Text>
            </Button>
        </Container>
    </Container>
  )
}

export default FilterModal

const styles = StyleSheet.create({})