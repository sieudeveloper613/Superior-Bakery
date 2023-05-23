import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Button, Text } from '../../../../../components';
import { colors } from '../../../../../themes/colors';

const { width, height } = Dimensions.get('window');

const ContinueChecking = ({ cost, text, onPress }) => {
  return (
    <Container 
        row width={'100%'} height={72} ph={16} pv={12} r={12}
        bgColor={colors.WHITE} shadow>
            <Container width={'40%'} around>
                <Text body color={colors.BLACK} bold>{cost}</Text>
                <Text paragraph color={colors.BLUE}>Tổng hóa đơn</Text>
            </Container>
            <Button
                onPress={onPress}
                width={'60%'} height={48} r={30}
                bgColor={colors.GREEN} jCenter aCenter>
                    <Text body color={colors.WHITE} bold>{text}</Text>
            </Button>
    </Container>
  )
}

export default ContinueChecking

const styles = StyleSheet.create({})