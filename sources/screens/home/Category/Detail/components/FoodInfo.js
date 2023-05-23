import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from '../../../../../components';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../../../../themes/colors';
import formatMoney from '../../../../../utils/formatMoney'



const FoodInfo = ({ onMinus, onPlus, count, meal, power, price, isSale }) => {
      
    return (
        <Container
            width={'100%'} height={'auto'} r={12} p={16} mv={16}
            bgColor={colors.WHITE} shadow>
                <Container row width={'100%'} between mb={6}>
                    <Container row width={'40%'} aCenter>
                        <Feather name='sunrise' size={24} color={colors.ORANGE} />
                        <Text paragraph color={colors.BLACK} bold pl={8}>{meal}</Text>
                    </Container>
                    <Container row width={'60%'} aCenter>
                        <Text width={'40%'} center paragraph color={colors.DARK_GREY} lineThrough></Text>
                        <Text width={'60%'} right headline color={colors.TOMATO} bold>{formatMoney(price)}</Text>
                    </Container>
                </Container>
                <Container row width={'100%'} between mt={6}>
                    <Container row width={'40%'} aCenter>
                        <Feather style={{transform: [{ scaleX: -1 }]}} name='coffee' size={24} color={colors.ORANGE} />
                        <Text paragraph color={colors.ORANGE} bold pl={8}>{power} calo</Text>
                    </Container>
                    <Container row width={'60%'} jEnd>
                        <Container 
                            row width={100} height={36} r={30}
                            bgColor={colors.PRIMARY} between aCenter>
                            <Button onPress={onMinus}
                                width={30} height={36} aCenter jCenter>
                                <Feather name='minus' size={15} color={colors.WHITE} />
                            </Button>
                            <Text width={40} center body color={colors.WHITE} bold>{count == null ? 0 : count}</Text>
                            <Button onPress={onPlus}
                                width={30} height={36} aCenter jCenter>
                                <Feather name='plus' size={15} color={colors.WHITE} />
                            </Button>
                        </Container>
                    </Container>
                </Container>
        </Container>
    )
}

export default FoodInfo

const styles = StyleSheet.create({})