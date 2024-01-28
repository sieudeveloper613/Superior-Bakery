import React, { useState } from "react"
import { StyleSheet } from "react-native"

/* components */
import { Container, Button, Input, Text } from "../../../../components"

/* implements */
import { colors } from "../../../../themes/colors"

/* packages */
import IonIcon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"

const CustomizedInput = ({ 
    icon = "", value = "", placeholder = "", 
    password = null, error = null,
    onFocus = () => {}, 
    onChangeText = () => {} 
}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isHidePassword, setIsHidePassword] = useState(false);

    return (
        <>
            <Container width={"100%"} height={48} shadow row center jCenter aCenter bgColor={colors.WHITE} mv={8}
                style={isFocused && { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 }}>
                <Container bgColor={colors.PRIMARY} aCenter jCenter width={48} height={48}>
                    <AntIcon size={24} color={colors.WHITE} name={icon} />
                </Container>
                <Input ph={8} body width={password ? "78%" : "86%"} height={"100%"} color={colors.BLACK}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }} 
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.GREY}
                    secureTextEntry={isHidePassword ? true : false}
                />
                {
                    password && (
                        <Button onPress={() => setIsHidePassword(!isHidePassword)}>
                            <IonIcon size={24} color={colors.PRIMARY} name={isHidePassword ? "eye" : "eye-off"} />
                        </Button>
                    )
                }
            </Container>
            { error && <Text size={12} color={colors.TOMATO} right>{error}</Text>}
        </>
    )
}

export default CustomizedInput

const styles = StyleSheet.create({})