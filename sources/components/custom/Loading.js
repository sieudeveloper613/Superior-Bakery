import React from 'react'
import { StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import Container from '../Container';
import Text from '../Text'
import { colors } from '../../themes/colors';


const Loading = ({ visible = false, text }) => {
    const { height, width } = useWindowDimensions();

    return visible && (
        <Container style={[ styles.container, { height, width }]}>
            <Container style={styles.loader}>
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
                <Text color={colors.PRIMARY} size={14} ml={8}>{text}</Text>
            </Container>
        </Container> 
    ) 
            
    
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    loader: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: colors.WHITE,
        marginHorizontal: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Loading;