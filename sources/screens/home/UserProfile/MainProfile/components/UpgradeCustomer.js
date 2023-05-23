import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Input, Image } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import Feather from 'react-native-vector-icons/MaterialCommunityIcons'

const ranks = [
    {
        id: 0,
        rank: 'normal',
        aim: 0,
        color: colors.BLACK
    },
    {
        id: 1,
        rank: 'bronze',
        aim: 1000000,
        color: colors.ORANGE
    },
    {
        id: 2,
        rank: 'silver',
        aim: 5000000,
        color: colors.SILVER
    },
    {
        id: 3,
        rank: 'gold',
        aim: 20000000,
        color: colors.YELLOW
    },
    {
        id: 4,
        rank: 'ruby',
        aim: 50000000,
        color: colors.TOMATO
    },
    {
        id: 5,
        rank: 'diamond',
        aim: 10000000000,
        color: colors.DIAMOND
    },
    
]

const UpgradeCustomer = ({ onPress, amount }) => {
    const [rank, setRank] = useState(null);
    const [color, setColor] = useState(null);

    // const onUpRank = (params) => {
    //     let count = 0;
    //     const onData = ranks.map(item => {
    //         if(params <= item.aim){
    //             count = item.aim - params;
    //             setColor(item.color)
    //             return count;
    //         } 
    //     })
    //     return onData;
    // }

    return (
    <Container width={'100%'} r={16} shadow bgColor={colors.WHITE} p={12} mv={8}>
        <Text paragraph color={colors.BLACK} bold>
            {`Thăng cấp hội viên \t`}
            <Text onPress={onPress} bold caption color={colors.BLUE}>Chi tiết</Text>
        </Text>
        <Text caption color={colors.DARK_GREY} mv={8}>Cố lên! còn <Text caption color={colors.BLACK} bold>{1000000 - amount}</Text> là thăng hạng rồi!</Text>
        <Container mv={8}>
            <Feather style={{ marginBottom: 4, position: 'absolute', right: 0, bottom: 6 }} name='hexagon' color={colors.YELLOW} size={24} />
            <Container width={'96%'} height={5} r={30} bgColor={colors.GREY}/>
            <Container 
                width={'1%'} height={5} r={30} bgColor={colors.BLACK}
                absolute bottom={0}   
            />
        </Container>
    </Container>
    )
}

export default UpgradeCustomer

const styles = StyleSheet.create({})