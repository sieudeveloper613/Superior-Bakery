import React, { useState } from 'react';
import { Container, Input, Text } from '../../../../components';
import { colors } from '../../../../themes/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const InputView = ({ 
    label, 
    iconName, 
    error, 
    info, 
    onPress,
    onFocus = () => {}, 
    ...props 
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <Container width={'100%'}>
        <Container width={'100%'} height={48} row center jCenter aCenter bgColor={colors.LIGHT_GREY} mt={16}
          style={ isFocused ? { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 } : null }>
          <Container width={'15%'} height={'100%'} bgColor={colors.PRIMARY} jCenter aCenter>
            <AntIcon size={24} color={colors.WHITE} name={iconName} />
          </Container>
          <Input ph={8} paragraph width={info ? '75%' : '85%'} height={'100%'} color={colors.BLACK}
            placeholderTextColor={colors.GREY}
            autoCorrect={false}
            onFocus={() => {
                onFocus();
                setIsFocused(true);
            }} 
            onBlur={() => {
                setIsFocused(false);
            }}
            {...props}
          />
          { info && (
            <AntIcon 
                name={'exclamationcircleo'}
                style={{ width: '10%', fontSize: 24, color: colors.PRIMARY}}
                onPress={onPress}
            />
          )}
        </Container>
        {
          error && (
              <Text width={'100%'} color={colors.TOMATO} caption right>
                {error}
              </Text>
          )
            
        }
      </Container>
      
        
    )
  }