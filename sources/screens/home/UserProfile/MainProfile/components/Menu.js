import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from '../../../../../components'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../../../../themes/colors'
import { profileMenu } from '../../../../../utils/data'
import { useNavigation } from '@react-navigation/native'
import {
    ORDERING_HISTORY_SCREEN,
    PROFILE
} from '../../../../../routes/ScreenName'

const Menu = () => {
    const navigation = useNavigation();
    console.log('profile-menu: ', profileMenu);
    const onClick = (id) => {
        switch(id) {
            case 0 : navigation.navigate(PROFILE.EDIT_PROFILE_SCREEN); break;
            case 1 : navigation.navigate(PROFILE.ORDERING_ADDRESS); break;
            case 2 : navigation.navigate(PROFILE.CHANGE_PASSWORD_SCREEN); break;
            case 3 : navigation.navigate(ORDERING_HISTORY_SCREEN); break;
            case 4 : navigation.navigate(PROFILE.STORE_LOCATION_SCREEN); break;
            case 5 : navigation.navigate(PROFILE.UPGRADE_APP_SCREEN); break;
            case 6 : console.log('pressed log-out'); break;
        }
    }
    return (
        <Container>
            {
                profileMenu.map(item => {
                    return (
                        <Button key={item.id} onPress={() => onClick(item.id)} 
                            row width={'100%'} height={48} r={12} ph={16} mv={8} 
                            bgColor={item.id == 6 ? colors.TOMATO : colors.WHITE} shadow jCenter aCenter>
                            <Feather style={{ width: '10%'}} name={item.icon} size={24} color={item.id == 6 ? colors.WHITE : colors.PRIMARY} />
                            <Text width={'80%'} body bold color={item.id == 6 ? colors.WHITE : colors.BLACK} pl={12}>{item.name}</Text>
                            <Container width={'10%'} aEnd>
                                <Feather name='chevron-right' size={24} color={item.id == 6 ? colors.WHITE : colors.PRIMARY} />
                            </Container>
                        </Button>
                    )
                })
            }
        </Container>
    )
}

export default Menu

const styles = StyleSheet.create({})