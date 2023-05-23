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
import { getDBConnection, collectCartItems  } from '../../../../utils/localDatabase';
import { FlatList } from 'react-native-gesture-handler';


const Checking = ({ navigation }) => {
  const [cartList, setCartList] = useState([])
  console.log('cart-list-check: ', cartList[0]?.COUNT)
  let defaultCount = cartList[0]?.COUNT;
  const [count, setCount] = useState(0)
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
  },[])

  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Giỏ hàng'} />
      <Container flex={1} p={16}>
        <Container flex={0.9}>
          {/* --- ORDERED FOOD --- */}
          <Container 
            width={'100%'} height={'auto'} p={16} r={16} mb={8}
            bgColor={colors.WHITE} shadow>
              <Container row width={'100%'} between mb={8}>
                <Text width={'60%'} paragraph color={colors.PRIMARY} bold>Món ăn</Text>
                <Text width={'40%'} paragraph color={colors.DARK_GREY} right>Loại bỏ món</Text>
              </Container>
              {/* --- ADD ORDERED FOOD HERE --- */}
                <FlatList 
                  data={cartList}
                  keyExtractor={item => item.PRODUCT_ID}
                  renderItem={({ item, index }) => {
                    return (
                      <RenderItem 
                        item={item} 
                        index={index}
                        quality={count}
                        onMinus={() => setCount(count - 1)}
                        onPlus={() => setCount(count + 1)} 
                      />
                    )
                  }}
                />
              
          </Container>

          {/* --- FOOD COST --- */}
          <OrderBill 
            label={'Hóa đơn thanh toán'}
            estimatedCost={'90.000 đ'}
            voucher={'0 đ'}
            deliverCost={'15.000 đ'}
            onPress={() => {}}
          /> 

          {/* --- FOOD NOTE --- */}
          <FoodNote 
            label={'Ghi chú cho nhà hàng'}
            placeholder={'Nhập ghi chú'}
            value={null}
            onChangeText={() => {}}
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
    </Container>
  )
}

export default Checking

const styles = StyleSheet.create({})