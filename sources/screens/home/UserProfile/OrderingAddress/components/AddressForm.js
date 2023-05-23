import React, { useState } from 'react'
import { StyleSheet, Modal, Dimensions, TextInput } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { addressType } from '../../../../../utils/data'
import { Container, Button, Text, Input } from '../../../../../components'
import { colors } from '../../../../../themes/colors'
import { logDebug, logInfo, logWarm } from '../../../../../utils/console'


const { width, height } = Dimensions.get('window');

const AddressForm = ({ visible, onCancel, onApply }) => {
    const [address, setAddress] = useState('');
    const [ward, setWard] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState(null);

    const insertAddress = async () => {
        try {
          const onInsert = await authorizationApi.insertAddress(
            userId, address, ward, district, city, 
          )
        } catch (error) {
          
        }
      }
    
      const updateAddress = () => {
        try {
          
        } catch (error) {
          
        }
      };

    const handleCheckboxClick = (item) => {
        logDebug('item: ', item)
        setSelectedAddressType(item);
      }
    
    const AddressType =({ label }) => {
        return (
            <Container width={'100%'} p={16}>
                <Text body color={colors.BLACK} bold>{label}</Text>
                <Container width={'100%'} row wrap between>
                {
                    addressType.map(item => {
                    return (
                        <BouncyCheckbox
                        key={item.id}
                        size={20}
                        fillColor={colors.GREEN}
                        unfillColor={colors.GREY}
                        text={item.name}
                        style={{ marginVertical: 6}}
                        innerIconStyle={{ borderWidth: 0 }}
                        textStyle={{ textDecorationLine: "none", marginLeft: -12, fontSize: 14 }}
                        isChecked={selectedAddressType?.id === item.id}
                        onPress={() => handleCheckboxClick(item)}
                        />
                    )
                    })
                }
                </Container>
            </Container>
        )
    }
    
    const AddressInput = ({ width, label, value, onChangeText}) => {
        return (
            <Container
            row wrap
            width={width} height={56} r={6} p={8} mv={8}
            bgColor={colors.WHITE} b={1} bColor={colors.BLACK} 
            >
            <Container 
                width={'auto'} height={'100%'} r={6}
                bgColor={colors.LIGHT_GREY} jCenter aCenter
            >
                <Text body color={colors.BLACK} ph={8} bold>{label}</Text>
            </Container>
            <Input
                numberOfLines={1}
                color={colors.BLACK} body
                width={width == '100%' ? '65%' : 'auto'} height={'100%'} ml={12}
                value={value}
                onChangeText={onChangeText}
                />
            </Container>
        )
    }
    
    const LabelModal = ({ onCancel, label, onApply }) => {
        return (
            <Container row width={'100%'} between>
            <Button
                onPress={onCancel} 
                width={'15%'} aCenter>
                <Text body color={colors.TOMATO}>Hủy</Text>
            </Button>
            <Text width={'70%'} center body color={colors.BLACK} bold>{label}</Text>
            <Button 
                onPress={onApply}
                width={'15%'} aCenter>
                <Text body color={colors.DARK_GREY}>Thêm</Text>
            </Button>
            </Container>
        )
    }

    return (
        <Container 
            width={'100%'} height={'auto'} rTopStart={16} rTopEnd={16} 
            bgColor={colors.WHITE}>
            <Container p={16}>
                <LabelModal 
                label={'Thêm địa chỉ'}
                onCancel={onCancel}
                onApply={onApply}
                />
            </Container>  
            <Container width={'100%'} height={1} bgColor={colors.GREY}/>
            <Container p={16}>
                <AddressInput 
                    width={'100%'}
                    label={'Địa chỉ nhà'}
                    value={address}
                    onChangeText={text => setAddress(text)}
                />
                <Container row between>
                <AddressInput 
                    width={'40%'}
                    label={'Phường'}
                    value={ward}
                    onChangeText={(text) => setWard(text)}
                />
                    <AddressInput 
                    width={'58%'}
                    label={'Quận'}
                    value={district}
                    onChangeText={(text) => setDistrict(text)}
                />
                </Container>
                <AddressInput 
                    width={'100%'}
                    label={'Thành phố'}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
            </Container>
            <AddressType label={'Loại địa chỉ'} />
        </Container>
    )
}

export default AddressForm

const styles = StyleSheet.create({})