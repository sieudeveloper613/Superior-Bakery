import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Container, Text } from '../../../../../components'
import { colors } from '../../../../../themes/colors'


const { width, height } = Dimensions.get('window');

const StorePicker = 
    ({ 
        label, 
        data, 
        placeholder,
        labelField, 
        valueField,
        value,
        onChange
    }) => {
  return (
    <Container 
        width={width} height={'auto'} p={16}
        absolute left={0} right={0} top={0}
        bgColor={'rgba(255, 255, 255, 0.6)'}>
        <Text paragraph color={colors.DARK_GREY} mb={8}>{label}</Text>
        <Dropdown
            data={data}
            placeholder={placeholder}
            labelField={labelField}
            valueField={valueField}
            value={value}
            onChange={onChange}
            style={{
            shadowOffset: { width: 0, height: 1 },
            shadowColor: colors.SHADOW,
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
            width: '100%',
            height: 48,
            paddingHorizontal: 8,
            backgroundColor: colors.WHITE,
            borderRadius: 6
            }}
            placeholderStyle={{
            color: colors.BLACK,
            fontSize: 16,
            fontWeight: 'bold'
            }}
            itemTextStyle={{
            color: colors.BLACK,
            fontSize: 14
            }}
        />
    </Container>
  )
}

export default StorePicker

const styles = StyleSheet.create({})