import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text, Image, Button } from '../../../../../components';
import { colors } from '../../../../../themes/colors';
import formatMoney from '../../../../../utils/formatMoney';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../../../../APIs/url';
import { useDispatch } from 'react-redux';
import { cartItemAction } from '../../../../../redux/Actions/cartAction'

const RenderItem = ({ item, isRemove, onPress  }) => {
    console.log('cart-item: ', item);
    const [sidedishList] = useState(item?.PRODUCT_SIDE_DISH ? JSON.parse(item?.PRODUCT_SIDE_DISH) : []);
    const size = JSON.parse(item?.PRODUCT_SIZE);
    const [count, setCount] = useState(item?.COUNT);
    return (
        <Container width={'100%'} pv={12} bb={1} bbColor={colors.GREY}>
            <Container row width={'100%'} between mb={8}>
                <Image style={{ borderWidth: StyleSheet.hairlineWidth }} imageUri={BASE_URL + item.PRODUCT_IMAGE.split('3000')[1]} square={60} radius={12} />
                <Container width={'50%'}>
                    <Text body color={colors.BLACK} bold numberOfLines={2} ellipsizeMode={'tail'}>{item.PRODUCT_NAME}</Text>
                    <Text body color={colors.TOMATO} bold>{formatMoney(item.PRODUCT_PRICE)}</Text>
                </Container>
                {
                    isRemove ?
                        <Button
                            onPress={onPress} 
                            width={75} height={42} r={6} bgColor={colors.TOMATO_OPACITY_15} aCenter jCenter>
                                <Text color={colors.TOMATO} bold>Xóa</Text>
                        </Button>
                    :
                        <Container 
                            row width={75} height={30} b={1} r={4} bColor={colors.BLACK}
                            aCenter jCenter>
                            <Button
                                onPress={() => {
                                    if (count === 1) {
                                        setCount(1)
                                    } else {
                                        setCount(count - 1)
                                    }
                                }} 
                                width={25} height={30} aCenter jCenter>
                                <Feather name='minus' size={20} color={colors.BLACK}/>
                            </Button>
                            <Text width={25} height={30} color={colors.BLACK} center bold>{count}</Text>
                            <Button
                                onPress={() => {
                                    if (count === 50) {
                                        setCount(50)
                                    } else {
                                        setCount(count + 1)
                                    }
                                }} 
                                width={25} height={30} aCenter jCenter>
                                <Feather name='plus' size={20} color={colors.BLACK}/>
                            </Button>
                        </Container>         
                }
            </Container>
            {
                size && (
                    <Container p={12} bgColor={colors.ORANGE_OPACITY_15} r={12}>
                        <Text paragraph color={colors.ORANGE} bold mb={4}>Kích cỡ</Text>
                        <Container row width={'100%'} mv={4} aCenter>
                            <Text width={'50%'} body color={colors.BLACK} bold>{size?.size}</Text>
                            <Text width={'50%'} body color={colors.BLACK} bold right>{formatMoney(size?.cost)}</Text>
                        </Container>
                    </Container>
                    
                )
            }
            {
                sidedishList?.length > 0 && (
                    <Container p={12} mt={16} bgColor={colors.GREEN_OPACITY_15} r={12}>
                        <Text paragraph color={colors.GREEN} bold mb={6}>Món thêm</Text>
                        {
                            sidedishList?.map((dish, index) => {
                                return (
                                    <Container key={index} row width={'100%'} mb={6} aCenter>
                                        <Text width={'55%'} body color={colors.BLACK} bold>{dish?.dish}</Text>
                                        <Text width={'15%'} body color={colors.BLACK} bold center>x {dish?.quantity}</Text>
                                        <Text width={'30%'} body color={colors.BLACK} bold right>{formatMoney(dish?.cost)}</Text>
                                    </Container>
                                )
                            })
                        }
                    </Container>
                )
            }
            {
                item?.NOTE && (
                    <Container p={12} mt={16} bgColor={colors.PRIMARY_OPACITY_20} r={12}>
                        <Text paragraph color={colors.PRIMARY} bold mb={4}>Ghi chú</Text>
                        <Text body color={colors.DARK_GREY}>{item?.NOTE.trim()}</Text>
                    </Container>
                )
            }
        </Container>
    )
}

export default RenderItem

const styles = StyleSheet.create({})