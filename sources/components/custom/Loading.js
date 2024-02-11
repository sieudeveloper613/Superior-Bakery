import React from "react"
import { StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native"

/* components */
import Text from "../Text"
import Container from "../Container"

/* implements */
import { colors } from "../../themes/colors"

const Loading = ({ visible = false, text }) => {
    const { height, width } = useWindowDimensions();

    return visible && (
        <Container style={[ styles.container, { height, width }]}>
            <Container style={styles.loader}>
                <ActivityIndicator size={"small"} color={colors.PRIMARY} />
                <Text color={colors.PRIMARY} size={14} ml={8}>{text}</Text>
            </Container>
        </Container> 
    )   
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    loader: {
        height: 72,
        borderRadius: 6,
        flexDirection: "row",
        marginHorizontal: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.WHITE,
    },
});

export default Loading;