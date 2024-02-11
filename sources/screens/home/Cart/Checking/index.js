import React, { useEffect, useState, useCallback} from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Button, Text, Image } from '../../../../components';
import { colors } from '../../../../themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from '../../../../components/custom';
import OrderBill from './components/OrderBill';
import FoodNote from './components/FoodNote';
import ContinueChecking from './components/ContinueChecking';
import RenderItem from './components/RenderItem';
import { getDBConnection, collectCartItems, deleteCartItem  } from '../../../../utils/localDatabase';
import { images } from '../../../../themes/images';
import VoucherList from './components/VoucherList';
import { useSelector } from 'react-redux';


const Checking = ({ navigation }) => {
  const cartState = useSelector(state => state.cartState.cartItem);
  console.log('cart-state: ', cartState)
  const [cartList, setCartList] = useState([])
  const [isRemove, setIsRemove] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurantNote, setRestaurantNote] = useState(null);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback])

  const loadDataCallback = useCallback( async () => {
    try {
      const db = await getDBConnection();
      const storedCartItems = await collectCartItems(db);
      if (storedCartItems.length) {
        console.log('list: ', storedCartItems);
        setCartList(storedCartItems);
      } else {
        setCartList([]);
      }
    } catch (error) {
      console.error(error);
    }
  },[]);

  const removeCart = async (id) => {
    try {
        const db = await getDBConnection();
        if (id) {
            const onRemove = await deleteCartItem(db, id);
            console.log(`remove ${id} from cart successfully!`)
            await loadDataCallback();
            return onRemove;
        } else {
            return 0;
        }
    } catch (error) {
        console.log('remove-item-from-cart-error: ', error);        
    }
}

  if (cartList.length === 0 || cartList === undefined) {
    return (
      <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
        <Header label={'Giỏ hàng'} />
        <Container flex={1} p={16} aCenter jCenter>
          <Image source={images.EMPTY_CART} square={164}/>
          <Text body color={colors.DARK_GREY} mt={16}>Hiện tại bạn vẫn chưa có sản phẩm nào!</Text>
        </Container>
      </Container>
    )
  } else {
    return (
      <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
        <Header label={'Giỏ hàng'} />
        <Container flex={1} pv={16}>
          <Container flex={0.9} scrollView>
            {/* --- ORDERED FOOD --- */}
            <Container 
              flex={1} p={16} mb={8}
              bgColor={colors.WHITE} shadow>
                <Container row width={'100%'} between mb={8}>
                  <Text width={'60%'} paragraph color={colors.PRIMARY} bold>Món ăn ({cartList.length})</Text>
                  <Text
                    onPress={() => setIsRemove(prevState => !prevState)} 
                    width={'40%'} paragraph color={isRemove ? colors.TOMATO : colors.DARK_GREY} right>
                      {isRemove ? 'Hủy bỏ' : 'Loại bỏ món'}
                  </Text>
                </Container>
                {/* --- ADD ORDERED FOOD HERE --- */}
                  {
                    cartList.map((item, index) => {
                      console.log('item-cart: ', item)
                      return (
                        <RenderItem
                          key={index} 
                          item={item} 
                          isRemove={isRemove}
                          onPress={() => removeCart(item.PRODUCT_ID)}
                        />
                      )
                    })
                  }
            </Container>
  
            {/* --- FOOD COST --- */}
            <OrderBill 
              label={'Hóa đơn thanh toán'}
              estimatedCost={'90.000 đ'}
              voucher={'0 đ'}
              deliverCost={'15.000 đ'}
              onPress={() => setModalVisible(true)}
            /> 
  
            {/* --- FOOD NOTE --- */}
            <FoodNote 
              label={'Ghi chú cho nhà hàng'}
              placeholder={'Nhập ghi chú'}
              value={restaurantNote}
              onChangeText={text => setRestaurantNote(text)}
            />
          </Container>
          
          <Container flex={0.1}>
            <ContinueChecking 
              cost={'105.000 đ'}
              text={'Tiếp tục'}
              onPress={() => {}}
            />
          </Container>
        </Container>
        <VoucherList 
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onApply={() => {}} />
      </Container>
    )
  }

  
}

export default Checking

const styles = StyleSheet.create({})