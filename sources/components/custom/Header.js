import { StyleSheet } from 'react-native'
import Container from '../Container';
import Text from '../Text';
import Button from '../Button';
import { colors } from '../../themes/colors';
import Feather from 'react-native-vector-icons/Feather'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Header = ({ label }) => {
  const navigation = useNavigation();
  return (
    <Container row width={'100%'} height={48} bgColor={colors.WHITE} ph={16} aCenter shadow>
      <Button onPress={() => {
        navigation.goBack();
      }}
      width={'15%'} height={48}  jCenter aStart>
      <Feather name={'arrow-left'} size={24} color={colors.PRIMARY} />
      </Button>
        <Text width={'70%'} center body bold uppercase color={colors.PRIMARY}>{label}</Text>
        <Container width={'15%'} height={48}/>
    </Container>
  )
}

export default Header

const styles = StyleSheet.create({})