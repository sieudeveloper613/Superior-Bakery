import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Container, Button, Text, Image } from '../../../../components';
import { colors } from '../../../../themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign'
import HeaderName from './components/HeaderName';
import FoodInfo from './components/FoodInfo';
import FoodNote from './components/FoodNote';
import { CART } from '../../../../routes/ScreenName';
import formatMoney from '../../../../utils/formatMoney';
import { logDebug, logError, logInfo } from '../../../../utils/console'
import { BASE_URL } from '../../../../APIs/url';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { 
  getDBConnection, 
  createTable,
  createCartTable, 
  insertFavoriteItems,
  insertCartItems, 
  deleteTable,
  collectFavoriteItems
} from '../../../../utils/localDatabase';

const Detail = ({ navigation: { navigate }, route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState(null);
  const [estimateBill, setEstimateBill] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    handleEstimateBill();
  },[count, selectedId, selectedItems])

  useEffect(() => {
    // removeTable();
    getConnection();
    
  },[]);

  useEffect(() => {
    onCheckFavorite();
  }, [])

  // useEffect(() => {
  //   if (isFavorite) {
  //     handleFavorite();
  //   } 
  // },[isFavorite])

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
    console.log('get-selected-item: ', selectedItems)
    if (count > 0 && selectedItems) {
      let estimateSidedish = 0
      for (let index = 0; index < selectedItems.length; index++) {
        console.log('quality: ', selectedItems[index].quantity)
        estimateSidedish += (parseInt(selectedItems[index].cost) * parseInt(selectedItems[index].quantity));
      }
      estimate = (parseInt(item.price) + estimateSidedish) * parseInt(count);
    }

    if (count > 0 && selectedId && selectedItems) {
      let estimateSidedish = 0
      for (let index = 0; index < selectedItems.length; index++) {
        estimateSidedish += (parseInt(selectedItems[index].cost) * parseInt(selectedItems[index].quantity));
      }
      estimate = (parseInt(item.price) + parseInt(selectedId?.cost) + estimateSidedish) * parseInt(count);
    }

    setEstimateBill(estimate)
  }

  const onCheckFavorite = async () => {
    try {
      const db = await getDBConnection();
      const onCollect = await collectFavoriteItems(db);
      logInfo('get-favorite-list: ', onCollect);
      const result = onCollect.find(res => {
        console.log('item_UUID: ', res?.PRODUCT_UUID)
        if (res?.PRODUCT_UUID === item._id) {
          setIsFavorite(true);
        }
      })
      return result;
    } catch (error) {
      logError('check-favorite-error: ',  error);
    }
  }

  const handleFavorite = async () => {
    try {
        setIsFavorite(true);
        const db = await getDBConnection();
          await insertFavoriteItems(db, item._id, item.name, item.price, JSON.stringify(item.sidedishs), JSON.stringify(item.sizes), item.image, isFavorite);
          console.log('insert favorite successful')
          Toast.show({
            type: 'success',
            props: { 
              icon: 'heart',
              title: 'Món yêu thích',
              message: 'Đã thêm vào danh sách yêu thích của bạn!', 
              backgroundColor: colors.RUBY },
            position: 'top'
          });
        
    } catch (error) {
      console.log('insert-favorite-error: ', error);
    }
  }

  const handleCart = async () => {
    setIsLoading(true);
      try {
        const db = await getDBConnection();
        const insert = await insertCartItems(db, item._id, item.name, item.price, JSON.stringify(selectedItems), JSON.stringify(selectedId), item.image,  note ? note : '', count);
        if (insert) {
          logInfo('Success', 'Add item to cart successfully!');
          Toast.show({
            type: 'success',
            props: { 
              icon: 'smile-circle',
              title: 'Thành công',
              message: 'thêm vào giỏ hàng thành công!', 
              backgroundColor: colors.GREEN },
            position: 'top'
          });
          setCount(1)
          setSelectedId(null);
          setSelectedItems([]);
          setNote('')
          setIsLoading(false);
          return insert;
        } else {
          logError('add-item-to-cart-failed!')
        }
      } catch (error) {
        logError('add-item-to-cart-failed-error: ', error);
      }
    setIsLoading(false);
  }

  const toastConfig = {
    success: ({ props }) => (
        <View style={{ 
            flexDirection: 'row',
            width: '90%', 
            backgroundColor: props.backgroundColor,
            padding: 10,
            borderRadius: 6,
            elevation: 2,
            alignItems: 'center'}}>
            <AntIcon name={props.icon} size={24} color={'white'} />
            <View style={{
              flexDirection: 'column',
              width: '85%',
              marginLeft: 12
            }}>
              <Text size={16} color={'white'} bold>{props.title}</Text>
              <Text size={12} color={'white'} >{props.message}</Text>
            </View>
        </View>
    ),
    error: ({ props }) => (
      <View style={{ 
          flexDirection: 'row',
          width: '90%', 
          backgroundColor: props.backgroundColor,
          padding: 10,
          borderRadius: 6,
          elevation: 2,
          alignItems: 'center'}}>
          <AntIcon name={props.icon} size={24} color={'white'} />
          <View style={{
            flexDirection: 'column',
            width: '85%',
            marginLeft: 12
          }}>
            <Text size={16} color={'white'} bold>{props.title}</Text>
            <Text size={12} color={'white'} >{props.message}</Text>
          </View>
      </View>
  ),
  }

  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Container flex={1} p={16}>
        <Container flex={0.1}>
          <HeaderName
            label={item.name}
            onPress={() => {
                handleFavorite();
            }}
            disabled={isFavorite}
            color={isFavorite ? colors.TOMATO : colors.DARK_GREY} 
          />
        </Container>
        <ScrollView 
          style={{ flex: 0.8, marginVertical: 16 }}
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
                    // const [subCount, setSubCount] = useState(1);
                    // // const isSelected = selectedItems.includes(value);
                    // const isSelected = selectedItems.find(item => item._id === value._id);
                    // console.log('is-selected: ', selectedItems)
                    const isSelected = selectedItems.find(item => item._id === value._id);
                    const selectedQuantity = isSelected ? isSelected.quantity : 1;

                    const handleSelectItem = () => {
                      if (isSelected) {
                        setSelectedItems(selectedItems.filter(item => item._id !== value._id));
                      } else {
                        const updatedItem = {...value, quantity: selectedQuantity};
                        setSelectedItems([...selectedItems, updatedItem]);
                      }
                    };

                    const handleDecreaseCount = () => {
                      if (isSelected && selectedQuantity > 1) {
                        const updatedItem = {...isSelected, quantity: selectedQuantity - 1};
                        const updatedItems = selectedItems.map(item => (item._id === value._id ? updatedItem : item));
                        setSelectedItems(updatedItems);
                      }
                    };

                    const handleIncreaseCount = () => {
                      if (isSelected && selectedQuantity < 49) {
                        const updatedItem = {...isSelected, quantity: selectedQuantity + 1};
                        const updatedItems = selectedItems.map(item => (item._id === value._id ? updatedItem : item));
                        setSelectedItems(updatedItems);
                      }
                    };
                    return (
                      <Button
                      onPress={() => {
                        handleSelectItem();
                        // if (isSelected) {
                        //   setSelectedItems(selectedItems.filter(sel => sel._id !== value._id));
                        // } else {
                        //   const updatedItem = {...value, quantity: subCount};
                        //   setSelectedItems([...selectedItems, updatedItem]);
                        // }
                      }}
                        key={value._id}
                        row width={'100%'} height={'auto'} aCenter mb={12}>
                          <Container 
                            width={24} height={24} r={24/2} 
                            bgColor={isSelected ? colors.PRIMARY : colors.GREY} aCenter jCenter>
                            {
                              isSelected && <Feather name='check' size={20} color={colors.WHITE}/>
                            }
                          </Container>
                          <Container row width={'88%'} between ml={8} aCenter >
                            <Container width={'65%'}>
                              <Text body color={colors.BLACK}>{value.dish}</Text>
                              <Text color={colors.TOMATO} bold>{formatMoney(value.cost)}</Text>
                            </Container>
                              <Container 
                                row width={'30%'} height={30} b={1} r={4} bColor={colors.BLACK}
                                aCenter jCenter>
                                <Button
                                    onPress={() => {
                                      handleDecreaseCount();
                                      // if (isSelected) {
                                      //   if (subCount === 1) {
                                      //     setSubCount(1)
                                      //   } else {
                                      //     setSubCount(subCount - 1)
                                      //   }
                                      // } 
                                    }} 
                                    width={25} height={30} aCenter jCenter>
                                    <Feather name='minus' size={20} color={colors.BLACK}/>
                                </Button>
                                <Text width={25} height={30} color={colors.BLACK} center bold>{selectedQuantity}</Text>
                                <Button
                                    onPress={() => {
                                      handleIncreaseCount();
                                      // if (isSelected) {
                                      //   if (subCount === 49) {
                                      //     setSubCount(49)
                                      //   } else {
                                      //     setSubCount(subCount + 1)
                                      //   }
                                      // }
                                      
                                    }} 
                                    width={25} height={30} aCenter jCenter>
                                    <Feather name='plus' size={20} color={colors.BLACK}/>
                                </Button>
                            </Container>
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
                  } else {
                    logDebug('please choose quality of item more than 0!')
                  }
                }} 
                width={'58%'} height={'100%'} r={8}
                bgColor={colors.PRIMARY} jCenter aCenter>
                  {
                    isLoading ?
                      <Container row width={'100%'} jCenter>
                        <ActivityIndicator size={'small'} color={colors.WHITE} />
                        <Text body color={colors.WHITE} bold ml={8}>Đang xử lý...</Text>
                      </Container>
                    : 
                      <Text body color={colors.WHITE} bold>Thêm vào giỏ hàng</Text>
                  }
              </Button>
          </Container>
        </Container>
      </Container>
      <Toast config={toastConfig} />
    </Container>
  )
}

export default Detail

const styles = StyleSheet.create({})