import React, { useRef } from 'react'
import { StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import { Container, Input, } from '../../../../../components'
import { colors } from '../../../../../themes/colors'

/*
    1. Init component props, we will controll it from parent
    2. render number of inputs depends on length props passed from parent
    3. Apply some default input props
    4. Create array of refs and store input refs in it
    5. Handle on input change text and focus on next or previous input
    6. Handle on back press
    7. Update parent value
*/

const OPTInput = ({ length, disabled, value, onChange }) => {
    const inputRefs = useRef([]);

    const onChangeValue = (text, index) => {
        const newValue  = value.map((item, valueIndex) => {
            if (valueIndex === index) {
                return text;
            }
            
            return item;
        })
        onChange(newValue);
    }

    const handleChange = (text, index) => {
        onChangeValue(text, index);

        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus();
        }

        return inputRefs?.current[index - 1]?.focus();
    }

    const handleBackspace = (event, index) => {
        const { nativeEvent } = event;
        if (nativeEvent.key === 'Backspace') {
            handleChange('', index);
        }
    }

    return (
        <Container row width={'100%'} between>
            {
                [...new Array(length)].map((item,index) => {
                    return (
                        <Input
                            ref={ ref => {
                                if (ref && !inputRefs.current.includes(ref)) {
                                    inputRefs.current = [...inputRefs.current, ref]
                                }
                            }}
                            key={index}
                            color={colors.BLACK} size={24} center radius={6}
                            width={45} height={55} bgColor={colors.WHITE} 
                            maxLength={1}
                            // value={value}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={event => handleBackspace(event, index)}
                            contextMenuHiden
                            selectTextOnFocus
                            editable={!disabled}
                            keyboardType={'decimal-pad'}
                            textID={`OTPInput-${index}`}
                        />
                    )
                })
            }
        </Container>
    )
}

export default OPTInput

const styles = StyleSheet.create({})