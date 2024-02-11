import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Image } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import { logDebug } from '../../../../../utils/console'
import { images } from '../../../../../themes/images'
import formatMoney from '../../../../../utils/formatMoney'
import { icons } from '../../../../../themes/icons'
import { useNavigation } from '@react-navigation/native'
import { VOUCHERS } from '../../../../../routes/ScreenName'

const RenderItem = ({ item, index }) => {
    const navigation = useNavigation();
    logDebug('item-and-index: ', item)
    return (
        <Button
            onPress={() => navigation.navigate(VOUCHERS.VOUCHER_DETAIL_SCREEN, { item })} 
            key={index} width={'100%'} height={'auto'} r={12} p={16} mv={8}
            bgColor={colors.WHITE} shadow aCenter jCenter>
                <Container width={'100%'}>
                    <Container row width={'100%'} bbColor={colors.DARK_GREY} bb={1} pb={12} mb={12}>
                        <Container width={'60%'}>
                            <Container row aCenter>
                                <Image source={images.SUPERIOR_LOGO} square={36} />
                                <Text 
                                    paragraph color={colors.PRIMARY} light ml={8}
                                    letterSpacing={0.5}>
                                        SUPERIOR
                                </Text>
                            </Container>
                           <Text title color={colors.BLACK} bold mt={16}>{formatMoney(item.price)}</Text>
                           <Text body color={colors.PRIMARY} bold mt={8}>{item.code}</Text>
                        </Container>
                        <Container width={'40%'} aCenter jCenter>
                            <Image source={icons.VOUCHER_ICON} square={72} />
                        </Container>
                    </Container>

                    <Container row width={'100%'} between aCenter>
                        <Text 
                            width={'75%'} body light color={colors.BLACK} pr={12}
                            numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                        <Container width={1} height={'50%'} bgColor={colors.DARK_GREY} />
                        <Text
                            width={'25%'} paragraph color={colors.BLUE} bold right>
                                Chi tiết {`\>`}
                        </Text>
                    </Container>
                    
                </Container>
        </Button>
    )
}

export default RenderItem

const styles = StyleSheet.create({})