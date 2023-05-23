import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Input } from '../../../../components';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../../../themes/colors';

const SearchAndFilter = ({ placeholder, value, onChangeText, onPress, ...props }) => {
  return (
   <Container row width={'100%'} aCenter between>
        <Container row width={'82%'} height={48} p={4} r={8}
                   jCenter aCenter bgColor={colors.WHITE} shadow>
            <Feather name='search' size={24} color={colors.PRIMARY} />
            <Input
                height={'100%'}
                width={'85%'}
                ml={8}
                color={colors.BLACK} size={16}
                placeholder={placeholder}
                placeholderTextColor={colors.GREY}
                value={value}
                onChangeText={onChangeText} 
                {...props}
            />
        </Container>
        <Button
            onPress={onPress} 
            width={48} height={48} r={8} jCenter aCenter bgColor={colors.PRIMARY} shadow>
            <Feather name={'filter'} size={24} color={colors.WHITE} />
        </Button>
   </Container>
  )
}

export default SearchAndFilter

const styles = StyleSheet.create({})