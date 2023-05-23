import React from 'react'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Container, Text, Image, Button } from '../../../../components'
import { colors } from '../../../../themes/colors';

const { width, height } = Dimensions.get("window");

const Sellest = ({ label, onPress, text, data, keyExtractor, renderItem, ...props}) => {
    
  return (
    <Container width={'100%'} mv={16}>
        <Container row width={'100%'} mb={16}>
        <Text width={'60%'} size={18} color={colors.BLACK} bold>{label}</Text>
        <Text right width={'40%'} color={colors.DARK_GREY} onPress={onPress}>{text}</Text>
        </Container>
        <FlatList 
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            {...props}
        />
    </Container>  
  )
}

export default Sellest

const styles = StyleSheet.create({})