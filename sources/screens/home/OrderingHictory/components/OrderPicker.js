import React from 'react'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { colors } from '../../../../themes/colors'


const OrderPicker = ({ data, placeholder, labelField, valueField, value, onChange, width, }) => {
  return (
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
        width: width,
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
  )
}

export default OrderPicker

const styles = StyleSheet.create({})