import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, FlatList, Modal } from 'react-native'
import { Container, Button, Text, Input, Image } from '../../../components'
import { colors } from '../../../themes/colors'
import { Header } from '../../../components/custom'
import Searching from './components/Searching'
import Feather from 'react-native-vector-icons/Feather'
import { sellest } from '../../../utils/data'
import { images } from '../../../themes/images'
import { getDBConnection, createTable, collectFavoriteItems, deleteItem } from '../../../utils/localDatabase'
import { BASE_URL } from '../../../APIs/url'
import formatMoney from '../../../utils/formatMoney'
import { logDebug, logError } from '../../../utils/console'

const Favorite = () => {
  const [more, setMore] = useState(false);
  const [selectedId, setSelectedId ] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedFavoriteItems = await collectFavoriteItems(db);
      if (storedFavoriteItems.length) {
        console.log('list: ', storedFavoriteItems);
        setFavoriteList(storedFavoriteItems);
      } else {
        setFavoriteList([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  const removeItem = async (id) => {
    try {
      const db = await getDBConnection();
      const onRemove = await deleteItem(db, id);
      logDebug(`remove item ${id} successfully`);
      setModalVisible(false);
      loadDataCallback();
      return onRemove;
    } catch (error) {
      logError('remove-item-error: ', error);
    }
  }

  const renderItem = ({ item, index }) => {
    const isSelected = selectedId === item.PRODUCT_ID;
    return (
      <Container width={'100%'}>
        <Container 
        width={'100%'} height={84} p={12} r={16} mv={8}
        row bgColor={colors.WHITE} shadow aCenter>
          <Image imageUri={BASE_URL + item.PRODUCT_IMAGE.split('3000')[1]} square={60} radius={16}/>
          <Container width={'72%'} pl={8}>
            <Text
              body color={colors.BLACK} bold mb={4}
              numberOfLines={2} ellipsizeMode={'tail'}
            >{item.PRODUCT_NAME}</Text>
            <Text body bold color={colors.TOMATO}>{formatMoney(item.PRODUCT_PRICE)}</Text>
          </Container>
          <Button
            onPress={() => {
              console.log('item-id: ', item)
              setSelectedId(item.PRODUCT_ID);
              if (isSelected) {
                setMore(prev => !prev)
              }
            }} 
            width={'8%'} aEnd>
            <Feather name='more-vertical' size={24} color={colors.PRIMARY} />
          </Button>
        </Container>
        {
          isSelected && more && 
            <Container row width={'100%'} height={'auto'} mb={8} evenly>
              <Button
                onPress={() => {}}
                width={'40%'} height={36} r={6}
                bgColor={colors.PRIMARY_OPACITY_20} jCenter aCenter
                >
                <Text paragraph color={colors.PRIMARY} bold>Đặt món nhanh</Text>
              </Button>
              <Button
                onPress={() => setModalVisible(true)}
                width={'40%'} height={36} r={6}
                bgColor={colors.TOMATO_OPACITY_15} jCenter aCenter
                >
                <Text paragraph color={colors.TOMATO} bold>Hủy yêu thích</Text>
              </Button>
            </Container>
        }
      </Container>
      
    )
  }

  const CancelModal = () => {
    return(
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
      >
        <Container flex={1} aCenter jEnd pb={24} bgColor={colors.BLACK_OPACITY_20}>
          <Container width={'90%'} p={24} bgColor={colors.WHITE} shadow r={16} aCenter>
            <Text headline color={colors.TOMATO} bold>Hủy yêu thích</Text>
            <Text paragraph color={colors.DARK_GREY} mv={16}>Bạn chắc chắn muốn bỏ yêu thích món này</Text>
            <Container row width={'100%'} between>
              <Button
                onPress={() => setModalVisible(false)} 
                width={'35%'} height={30} r={30}
                bgColor={colors.BLACK_OPACITY_20} aCenter jCenter>
                <Text paragraph color={colors.PRIMARY} bold>Quay lại</Text>
              </Button>
              <Button 
                onPress={() => removeItem(selectedId)}
                width={'35%'} height={30} r={30}
                bgColor={colors.TOMATO} aCenter jCenter>
                <Text paragraph color={colors.WHITE} bold>Có, hủy</Text>
              </Button>
            </Container>
          </Container>
        </Container>
      </Modal>
    )
  }

  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Các món yêu thích'} />
      <Container flex={1} p={16}>

        {/* --- SEARCHING INPUT --- */}
        <Searching 
          placeholder={'Tìm kiếm món'}
          value={null}
          onValueChange={() => {}}
        />

        {
          favoriteList.length ?
            <FlatList
              style={{ marginTop: 8 }} 
              data={favoriteList}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          : 
          <Container 
            width={'100%'} height={48} r={6} mv={16}
            jCenter aCenter bgColor={colors.GREY}>
            <Text paragraph color={colors.DARK_GREY}>Hiện tại không có món ăn yêu thích nào!</Text>
          </Container>
        }
      </Container>
      <CancelModal />
    </Container>
  )
}

export default Favorite

const styles = StyleSheet.create({})