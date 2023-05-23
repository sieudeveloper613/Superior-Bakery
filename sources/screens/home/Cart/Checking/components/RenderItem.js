import React from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text, Image, Button } from '../../../../../components';
import { colors } from '../../../../../themes/colors';
import formatMoney from '../../../../../utils/formatMoney';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../../../../APIs/url';

const RenderItem = ({ item, index, onMinus, onPlus, quality }) => {
    console.log('cart-item: ', item.PRODUCT_NAME)
    return (
        <Container key={index} width={'100%'} pb={8} bb={1} bbColor={colors.GREY}>
            <Container row width={'100%'} between>
                <Image style={{ borderWidth: StyleSheet.hairlineWidth }} imageUri={BASE_URL + item.PRODUCT_IMAGE.split('3000')[1]} square={60} radius={12} />
                <Container width={'50%'}>
                    <Text paragraph color={colors.BLACK} bold numberOfLines={2} ellipsizeMode={'tail'}>{item.PRODUCT_NAME}</Text>
                    <Text body color={colors.TOMATO} bold>{formatMoney(item.PRODUCT_PRICE)}</Text>
                </Container>
                <Container 
                    row width={75} height={30} b={1} r={4} bColor={colors.BLACK}
                    aCenter jCenter>
                    <Button
                        onPress={onMinus} 
                        width={25} height={30} aCenter jCenter>
                        <Feather name='minus' size={20} color={colors.BLACK}/>
                    </Button>
                    <Text width={25} height={30} color={colors.BLACK} center bold>{quality}</Text>
                    <Button
                        onPress={onPlus} 
                        width={25} height={30} aCenter jCenter>
                        <Feather name='plus' size={20} color={colors.BLACK}/>
                    </Button>
                </Container>
            </Container>
        </Container>
    )
}

export default RenderItem

const styles = StyleSheet.create({})