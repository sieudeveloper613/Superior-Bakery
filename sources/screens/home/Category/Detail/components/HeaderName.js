import React from 'react'
import { StyleSheet } from 'react-native';
import { Container, Button, Text, } from '../../../../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../../../../themes/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const HeaderName = ({ onPress = () => {}, label, color, disabled }) => {
    const navigation = useNavigation();
   
    return (
        <Container row width={'100%'} between>
            <Button
                onPress={() => navigation.goBack()} 
                width={36} height={36} r={36/2}
                bgColor={colors.WHITE} shadow jCenter aCenter>
                    <Feather name='arrow-left' size={24} color={colors.PRIMARY} />
            </Button>
            <Text
                numberOfLines={2} 
                width={'60%'} center size={18} bold color={colors.PRIMARY}>{label}</Text>
            <Button
                disabled={disabled}
                onPress={() => {
                    onPress();
                }} 
                width={36} height={36} r={36/2}
                bgColor={colors.WHITE} shadow jCenter aCenter>
                    <MaterialIcons name='favorite' size={24} color={color} />
            </Button>
        </Container>
    )
}

export default HeaderName

const styles = StyleSheet.create({})