import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Button, Text, Input } from '../../../../components'
import { colors } from '../../../../themes/colors'
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window');

const Head = ({ onPress, isDrawer, labelSearch  }) => {
  return (
    <Container width={'100%'} jCenter aCenter mb={16}>
        <Text style={{ fontFamily: "yeseva_one_regular"}} size={32} color={colors.PRIMARY} bold>Superior</Text>
        <Container width={'100%'} row aCenter between mv={12}>
            <Button  style={{ transform: [{rotate: '90deg'}] }}
                onPress={isDrawer} 
                width={48} height={48} r={6} jCenter aCenter shadow bgColor={colors.WHITE}>
                    <Feather name={'sliders'} size={24} color={colors.PRIMARY} />
            </Button>
            <Button onPress={onPress}
                width={'82%'} height={48} bgColor={colors.WHITE}
                shadow row r={6} p={12} jCenter aCenter>
                <Text width={'85%'} color={colors.GREY} size={16}>{labelSearch}</Text>
                <Container width={'15%'} aEnd>
                <Feather name={'search'} size={24} color={colors.PRIMARY} />
                </Container>
            </Button>
        </Container>

        <Container row width={'100%'} between>
            <Container row width={'30%'} height={48} r={6} shadow jCenter aCenter bgColor={colors.WHITE}>
                <Feather name='map-pin' size={24} color={colors.PRIMARY} />
                <Text color={colors.BLACK} size={14} ml={6}>Sai Gon</Text>
            </Container>
            <Container row width={'30%'} height={48} r={6} shadow jCenter aCenter bgColor={colors.WHITE}>
            <Feather name='navigation' size={24} color={colors.PRIMARY} />
                <Text color={colors.BLACK} size={14} ml={6}>7 km</Text>
            </Container>
            <Container row width={'30%'} height={48} r={6} shadow jCenter aCenter bgColor={colors.WHITE}>
            <Feather name='map' size={24} color={colors.PRIMARY} />
                <Text color={colors.BLACK} size={14} ml={6}>CN 1</Text>
            </Container>
        </Container>
    </Container>
    )
}

export default Head

const styles = StyleSheet.create({})