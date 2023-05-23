import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Button, Text, Image } from '../../../../components';
import { colors } from '../../../../themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import HeaderName from './components/HeaderName';
import FoodInfo from './components/FoodInfo';
import FoodNote from './components/FoodNote';
import { CART } from '../../../../routes/ScreenName';
import formatMoney from '../../../../utils/formatMoney';
import { logDebug, logError, logInfo } from '../../../../utils/console'
import { BASE_URL } from '../../../../APIs/url';
import { 
  getDBConnection, 
  createTable,
  createCartTable, 
  insertFavoriteItems,
  insertCartItems, 
  deleteTable 
} from '../../../../utils/localDatabase';

// SQLite.enablePromise(true);

// var db = openDatabase({ name: 'FavoriteFoodDatabase.db' });

const Detail = ({ navigation: { navigate }, route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState(null);
  const [estimateBill, setEstimateBill] = useState(0);
  console.log('selected-items: ', selectedItems)
  console.log('begin-is-favorite: ', isFavorite);


  useEffect(() => {
    handleEstimateBill();
  },[count, selectedId, selectedItems])

  useEffect(() => {
    // removeTable();
    getConnection();
  },[])

  useEffect(() => {
    if (isFavorite) {
      handleFavorite();
    } 
  },[isFavorite])

  const getConnection = async () => {
    const db = await getDBConnection();
    await createTable(db);
    await createCartTable(db);
    console.log('create table successful')
  }

  const removeTable = async () => {
    const db = await getDBConnection();
    await deleteTable(db);
    console.log('remove table successful')
  }

  const handleEstimateBill = () => {
    let estimate = 0;
    if (count) {
      estimate = parseInt(item.price) * parseInt(count);
    }
    
    if (count > 0 && selectedId) {
      estimate = (parseInt(item.price) + parseInt(selectedId?.cost)) * parseInt(count);
    }

    if (count > 0 && selectedItems) {
      let estimateSidedish = 0
      for (let index = 0; index < selectedItems.length; index++) {
        estimateSidedish += parseInt(selectedItems[index].cost);
      }
      estimate = (parseInt(item.price) + estimateSidedish) * parseInt(count);
    }

    if (count > 0 && selectedId && selectedItems) {
      let estimateSidedish = 0
      for (let index = 0; index < selectedItems.length; index++) {
        estimateSidedish += parseInt(selectedItems[index].cost);
      }
      estimate = (parseInt(item.price) + parseInt(selectedId?.cost) + estimateSidedish) * parseInt(count);
    }

    setEstimateBill(estimate)
  }

  const handleFavorite = async () => {
    console.log('favorite-item: ', item)
    try {
        const db = await getDBConnection();
        await insertFavoriteItems(db, item._id, item.name, item.price, JSON.stringify(item.sidedishs), JSON.stringify(item.sizes), item.image, isFavorite);
        console.log('insert favorite successful')
      
    } catch (error) {
      console.log('insert-favorite-error: ', error);
    }
  }

  const handleCart = async () => {
    try {
      const db = await getDBConnection();
      const insert = await insertCartItems(db, item._id, item.name, item.price, JSON.stringify(selectedId), JSON.stringify(selectedItems),item.image,  note ? note : '', count);
      if (insert) {
        logInfo('Success', 'Add item to cart successfully!')
        return insert;
      }

      return new Error('add-item-to-cart-failed!')
    } catch (error) {
      logError('add-item-to-cart-failed-error: ', error);
    }
  }

  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Container flex={1} p={16}>
        <Container flex={0.1}>
          <HeaderName
            label={item.name}
            onPress={() => {
                setIsFavorite(true);
            }}
            color={isFavorite ? colors.TOMATO : colors.DARK_GREY} 
          />
        </Container>
        <ScrollView 
          style={{ flex: 0.8, marginVertical: 16}}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}>
            <Image imageUri={BASE_URL + item?.image?.split('3000')[1]} width={'100%'} height={300} radius={16}/>
            <FoodInfo
              meal={item.meal}
              power={item.power}
              price={item.price}
              onMinus={() => {
                if(count == 0) {
                  setCount(0);
                } else {
                  setCount(count - 1)
                }
              }}
              count={count}
              onPlus={() => {
                if(count == 49) {
                  setCount(49);
                } else {
                  setCount(count + 1)
                }
              }} 
            />

            {/* --- DISTRIBUTE AND ELEMENTS --- */}
            <Container
              row width={'100%'} height={'auto'} between mb={8}>
                <Container 
                  width={'48%'} height={200} p={12} r={16}
                  bgColor={colors.WHITE} shadow>
                    <Text body color={colors.PRIMARY} bold>Mô tả</Text>
                    <Text paragraph color={colors.DARK_GREY} justify>{item.distribute}</Text>
                  </Container>
                  <Container 
                  width={'48%'} height={200} p={12} r={16}
                  bgColor={colors.WHITE} shadow>
                    <Text body color={colors.PRIMARY} bold>Thành phần</Text>
                    {
                      item.elements.map((item, index) => {
                        return (
                          <Text key={index} paragraph color={colors.DARK_GREY} mv={2}>{item}</Text>
                        )
                      })
                    }
                  </Container>
            </Container>

            {/* --- SIDE ORDER LIST --- */}
            {
              item.sizes.length > 0 &&
              <Container
                width={'100%'} height={'auto'} p={12} r={16} mv={8}
                bgColor={colors.WHITE} shadow>
                <Text body color={colors.PRIMARY} bold mb={16}>Chọn kích cỡ</Text>
                {/* --- ADD SIDE ORDER HERE WITH MAP --- */}
                {
                  item.sizes.map((item, index) => {
                    const isSelected = selectedId?._id == item._id;
                    return (
                      <Button
                        onPress={() => {
                          setSelectedId(item);
                        }}
                        key={item._id}
                        row width={'100%'} height={42} aCenter>
                          <Container 
                            width={24} height={24} r={24/2} 
                            bgColor={isSelected ? colors.PRIMARY : colors.GREY} aCenter jCenter>
                            {
                              isSelected && <Feather name='check' size={20} color={colors.WHITE}/>
                            }
                          </Container>
                          <Container row width={'88%'} ml={8}>
                            <Text width={'50%'} body color={colors.BLACK}>{item.size}</Text>
                            <Text width={'50%'} body color={colors.TOMATO} right bold>{formatMoney(item.cost)}</Text>
                          </Container>
                      </Button>
                    )
                  })
                }
              </Container>
            }
            
            {/* --- SIDE ORDER LIST --- */}
            {
              item.sidedishs.length > 0 &&
              <Container
                width={'100%'} height={'auto'} p={12} r={16} mv={8}
                bgColor={colors.WHITE} shadow>
                <Text body color={colors.PRIMARY} bold mb={16}>Món thêm</Text>
                {/* --- ADD SIDE ORDER HERE WITH MAP --- */}
                {
                  item.sidedishs.map((value, index) => {
                    const isSelected = selectedItems.includes(value);
                    return (
                      <Button
                      onPress={() => {
                        if (isSelected) {
                          setSelectedItems(selectedItems.filter(sel => sel._id !== value._id));
                        } else {
                          setSelectedItems([...selectedItems, value]);
                        }
                      }}
                        key={value._id}
                        row width={'100%'} height={42} aCenter>
                          <Container 
                            width={24} height={24} r={24/2} 
                            bgColor={isSelected ? colors.PRIMARY : colors.GREY} aCenter jCenter>
                            {
                              isSelected && <Feather name='check' size={20} color={colors.WHITE}/>
                            }
                          </Container>
                          <Container row width={'88%'} ml={8}>
                            <Text width={'50%'} body color={colors.BLACK}>{value.dish}</Text>
                            <Text width={'50%'} body color={colors.TOMATO} right bold>{formatMoney(value.cost)}</Text>
                          </Container>
                      </Button>
                    )
                  })
                }
              </Container>
            }

            {/* --- ADD FOOD NOTE HERE --- */}
            <FoodNote
              label={'Ghi chú (nếu có)'}
              placeholder={'Nhập ghi chú ở đây...'}
              value={note}
              onChangeText={(text) => setNote(text)}
            />
        </ScrollView>
        <Container flex={0.1}>
          <Container 
            row width={'100%'} height={56} r={12} between>
              <Container
                width={'40%'} height={'100%'} r={8} p={6}
                bgColor={colors.WHITE} shadow>
                  <Text paragraph color={colors.DARK_GREY} mb={4}>Tạm tính</Text>
                  <Text body color={colors.GREEN} bold>{formatMoney(estimateBill)}</Text>
              </Container>
              <Button
                onPress={() => {
                  if (count) {
                    handleCart();
                    navigate(CART.CHECKING_SCREEN)
                  } else {
                    logDebug('please choose quality of item more than 0!')
                  }
                }} 
                width={'58%'} height={'100%'} r={8}
                bgColor={colors.PRIMARY} jCenter aCenter>
                <Text body color={colors.WHITE} bold>Thêm vào giỏ hàng</Text>
              </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Detail

const styles = StyleSheet.create({})