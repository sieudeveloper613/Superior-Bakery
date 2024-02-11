import React, { useState } from "react"

/* components */
import { Container, Input, Text } from "../../../../components";

/* implements */
import { colors } from "../../../../themes/colors";

/* packages */
import IonIcon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"

const CustomizedInput = ({ label = "", iconName = "", error = "", password = false, onFocus = () => {}, ...props }) => {
    /* create state */
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    return (
        <>
            <Container width={"100%"} height={48} row center jCenter aCenter bgColor={colors.WHITE} mv={8}
                style={isFocused ? { borderBottomColor: colors.PRIMARY, borderBottomWidth: 1 } : null}>
                <Container width={"15%"} height={"100%"} bgColor={colors.PRIMARY} jCenter aCenter>
                    <AntIcon size={24} color={colors.WHITE} name={iconName} />
                </Container>
                <Input ph={8} paragraph width={password ? "75%" : "85%"} height={"100%"} color={colors.BLACK}
                    placeholderTextColor={colors.GREY}
                    secureTextEntry={hidePassword}
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
                {password && (
                    <IonIcon
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        style={{ width: "10%", fontSize: 24, color: colors.PRIMARY }}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                )}
            </Container>
            {
                error && (
                    <Text width={"100%"} color={colors.TOMATO} caption right>{error}</Text>
                )
            }
        </>
    )
}

export default CustomizedInput
