import React from 'react';
import { Container, Input } from '../../../../components'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../../../themes/colors';

const Searching = ({ placeholder, value, onValueChange }) => {
    return (
      <Container 
        row width={'100%'} height={48} r={6} ph={8}
        bgColor={colors.WHITE} between shadow aCenter>
          <Input 
            body color={colors.BLACK}
            width={'85%'} height={'100%'}
            placeholder={placeholder}
            placeholderTextColor={colors.DARK_GREY}
            value={value}
            onValueChange={onValueChange}
          />
          <Feather name='search' size={24} color={colors.DARK_GREY} />
        </Container>
    )
  }

export default Searching