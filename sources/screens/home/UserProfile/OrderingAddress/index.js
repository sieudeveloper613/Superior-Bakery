import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Dimensions, FlatList, TextInput, ActivityIndicator } from 'react-native'
import { Container, Button, Text, Input } from '../../../../components'
import { colors } from '../../../../themes/colors'
import Feather from 'react-native-vector-icons/Feather'
import { Header } from '../../../../components/custom'
import { addressType } from '../../../../utils/data'
import { authorizationApi } from '../../../../APIs'
import { useSelector } from 'react-redux'
import { logDebug, logError, logInfo } from '../../../../utils/console'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import RBSheet from "@nonam4/react-native-bottom-sheet"
import { Notification } from '../../../../components/custom'

const { width, height } = Dimensions.get('window');

const OrderingAddress = () => {
  const authState = useSelector(state => state.authState.authInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(authState._id);
  const [addressList, setAddressList] = useState([]);
  const [idAddress, setIdAddress] = useState(null);
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState(null);
  const bottomSheetRef = useRef(null)

  useEffect(() => {
    collectAddress(userId);
  },[]);
  
  const collectAddress = async (id) => {
    setIsLoading(true);
    try {
      const fetchData = await authorizationApi.collectAddress(id);
      if (fetchData) {
        const { locations } = fetchData;
        setAddressList(locations);
      } else {
        setAddressList([]);
      }
    } catch (error) {
      logError('collect-address-catch: ', error);
    }
    setIsLoading(false);
  };

  const removeAddress = async (id, idAddress) => {
    setIsLoading(true);
    try {
      const onRemove = await authorizationApi.removeAddress(id, idAddress);
        if( onRemove.isSuccess == 1 ) {
          logInfo('Message: ', onRemove.message)
        } else {
          logInfo('Message: ', onRemove.message);
        }
      
    } catch (error) {
      logError('remove-address-error: ', error);
    }
    setIsLoading(false);
  };

  const insertAddress = async () => {
    setIsLoading(true);
    try {
      const onInsert = await authorizationApi.insertAddress(
        userId, address, ward, district, city, selectedAddressType.id || 0, selectedAddressType.name || null
      );
      if (onInsert) {
        const { isSuccess, message } = onInsert;
          if ( isSuccess === 1 ) {
            logDebug('Success: ', message, address)
            setAddress('');
            setWard('');
            setDistrict('');
            setCity('');
            setSelectedAddressType(null);
            await collectAddress(userId);
          } else {
            logDebug('Message: ', message)
          }
      }
      bottomSheetRef.current.close();
    } catch (error) {
      logError('insert-address-catch: ', error);
    }
    setIsLoading(false);
  }

  const updateAddress = () => {
    try {
      
    } catch (error) {
      
    }
  };

  const renderItem = ({ item, index }) => {
    const address = item.address.concat(', phường ', item.ward, ', quận ', item.district, ', ', item.city)
    return (
      <Container row width={'100%'} height={'auto'} between mb={8}>
          <Container 
            width={32} height={32} r={32/2} 
            bgColor={colors.WHITE} shadow jCenter aCenter>
            <Text body bold color={colors.PRIMARY}>{index}</Text>
          </Container>
          <Container 
            width={'88%'} p={12} r={12}
            bgColor={colors.WHITE} shadow>
            <Text
              paragraph color={colors.BLACK} justify
              numberOfLines={2}
              >{address}</Text>
            <Container row width={'100%'} mt={12} between>
              <Container width={'70%'} jEnd>
                <Text paragraph color={colors.GREEN} bold>{item.typeName}</Text>
              </Container>
              <Container row width={'30%'} between jEnd>
                <Button onPress={() => {
                  setIdAddress(item._id);
                  setModalVisible(true);
                }}>
                  <Feather name='trash-2' size={24} color={colors.TOMATO} />
                </Button>
                <Container width={1} height={'100%'} bgColor={colors.GREY} mh={8}/>
                <Button onPress={() => updateAddress()}>
                  <Feather name='edit' size={24} color={colors.BLUE} />
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
    )
  }

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
            disabled={address && ward && district && city && selectedAddressType ? false : true} 
            onPress={onApply}
            width={'15%'} aCenter>
            <Text body color={address && ward && district && city && selectedAddressType ? colors.GREEN : colors.DARK_GREY}>Thêm</Text>
        </Button>
        </Container>
    )
  }

  const NotificationMessage = () => {
    return (
      <Notification visible={modalVisible}>
        <Container
          width={'90%'} height={'auto'} p={24} r={16}
          bgColor={colors.WHITE} shadow aCenter>
            <Text headline color={colors.TOMATO} bold>Xóa địa chỉ</Text>
            <Container width={'100%'} height={1} bgColor={colors.TOMATO} mv={16}/>
            <Text body color={colors.DARK_GREY}>Bạn chắc chắn muốn xóa địa chỉ này?</Text>
            <Container row width={'100%'} between mt={24}>
              <Button
                onPress={() => setModalVisible(false)} 
                width={'30%'} height={48} r={8}
                bgColor={colors.LIGHT_GREY} aCenter jCenter>
                <Text body color={colors.DARK_GREY} bold>Quay lại</Text>
              </Button>
              <Button
                onPress={ async () => {
                  await removeAddress(userId, idAddress);
                  setModalVisible(false);
                  collectAddress(userId);
                }}
                width={'50%'} height={48} r={8}
                bgColor={colors.TOMATO_OPACITY_15} aCenter jCenter>
                <Text body color={colors.TOMATO} bold>Có, chắc chắn</Text>
              </Button>
            </Container>
        </Container>
      </Notification>
    )
  }

  return (
    <Container flex={1} safe bgColor={colors.LIGHT_GREY}>
      <Header label={'Địa chỉ giao hàng'} />
      <Container flex={1} p={16}>
        {
          addressList.length == 0 ?
            <Button
              onPress={() => bottomSheetRef.current.open()}
              row width={'100%'} height={48} r={6}
              bgColor={colors.PRIMARY} jCenter aCenter center>
              <Feather name='plus' size={24} color={colors.WHITE} />
              <Text body color={colors.WHITE} bold ml={8}>Thêm địa chỉ mới</Text>
            </Button>
          : isLoading ?
          <ActivityIndicator size={'small'} color={colors.PRIMARY} />
          : 
          <FlatList
            contentContainerStyle={{ paddingVertical: 16 }}
            data={addressList}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        }
        
        {
          addressList.length > 0 && <Button
                                      onPress={() =>  bottomSheetRef.current?.open()}
                                      absolute right={16} bottom={16} 
                                      width={48} height={48} r={48/2} jCenter aCenter bgColor={colors.PRIMARY}> 
                                      <Feather name='plus' size={24} color={colors.WHITE} />
                                    </Button>
        }
      </Container>

      <RBSheet
        ref={bottomSheetRef}
        animationType='slide'
        height={height / 1.7}
        minClosingHeight={0}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
        container: {
            paddingHorizontal: 0, 
            paddingVertical: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            elevation: 2,
        },
        wrapper: {
            backgroundColor: "transparent"
        },
        draggableIcon: {
            backgroundColor: "#000"
        }
        }}
      >
      <Container p={16}>
        <LabelModal 
          label={'Thêm địa chỉ'}
          onCancel={() => {
            bottomSheetRef.current.close();
            setAddress('');
            setWard('');
            setDistrict('');
            setCity('');
            setSelectedAddressType(null);
          }}
          onApply={() => insertAddress()}
          />
      </Container> 
      <Container width={'100%'} height={1} bgColor={colors.GREY}/>
        <Container p={16}>
          {/* HOME ADDRESS FIELD */}
          <Container
            row wrap
            width={'100%'} height={56} r={6} p={8} mv={8}
            bgColor={colors.WHITE} b={1} bColor={colors.BLACK} 
          >
            <Container 
              width={'auto'} height={'100%'} r={6}
              bgColor={colors.LIGHT_GREY} jCenter aCenter
            >
              <Text body color={colors.BLACK} ph={8} bold>{'Địa chỉ nhà'}</Text>
            </Container>
            <Input
              numberOfLines={1}
              color={colors.BLACK} body
              width={'60%'} height={'100%'} ml={12}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </Container>

          <Container row between>
            {/* WARD FIELD */}
          <Container
            row wrap
            width={'40%'} height={56} r={6} p={8} mv={8}
            bgColor={colors.WHITE} b={1} bColor={colors.BLACK} 
          >
            <Container 
                width={'auto'} height={'100%'} r={6}
                bgColor={colors.LIGHT_GREY} jCenter aCenter
            >
                <Text body color={colors.BLACK} ph={8} bold>{'Phường'}</Text>
            </Container>
            <Input
              numberOfLines={1}
              color={colors.BLACK} body
              width={'auto'} height={'100%'} ml={12}
              value={ward}
              onChangeText={(text) => setWard(text)}
            />
          </Container>

          {/* DISTRICT FIELD */}
          <Container
            row wrap
            width={'58%'} height={56} r={6} p={8} mv={8}
            bgColor={colors.WHITE} b={1} bColor={colors.BLACK} 
          >
            <Container 
              width={'auto'} height={'100%'} r={6}
              bgColor={colors.LIGHT_GREY} jCenter aCenter
            >
              <Text body color={colors.BLACK} ph={8} bold>{'Quận'}</Text>
            </Container>
            <Input
              numberOfLines={1}
              color={colors.BLACK} body
              width={'auto'} height={'100%'} ml={12}
              value={district}
              onChangeText={(text) => setDistrict(text)}
            />
            </Container>
          </Container>

          {/* CITY FIELD */}
          <Container
            row wrap
            width={'100%'} height={56} r={6} p={8} mv={8}
            bgColor={colors.WHITE} b={1} bColor={colors.BLACK} 
          >
            <Container 
                width={'auto'} height={'100%'} r={6}
                bgColor={colors.LIGHT_GREY} jCenter aCenter
            >
                <Text body color={colors.BLACK} ph={8} bold>{'Thành phố'}</Text>
            </Container>
            <Input
              numberOfLines={1}
              color={colors.BLACK} body
              width={'60%'} height={'100%'} ml={12}
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </Container>
        </Container>
      <AddressType label={'Loại địa chỉ'} />
    </RBSheet>
    <NotificationMessage />
    </Container>
  )
}

export default OrderingAddress

const styles = StyleSheet.create({})