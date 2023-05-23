import React, { useState } from 'react'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Container, Button, Text, Image } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../../themes/colors'
import { Header } from '../../../components/custom'
import { Dropdown } from 'react-native-element-dropdown'
import OrderPicker from './components/OrderPicker';
import { orderedTime } from '../../../utils/data'

const { width, height } = Dimensions.get('window');

const OrderingHictory = () => {
  const [value, setValue] = useState(0);
  const [more, setMore] = useState(false);
  
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Lịch sử mua hàng'} />
      <Container flex={1} p={16}>
        {/* --- ORDERED HISTORY PICKER ---  */}
        <OrderPicker 
          width={'100%'}
          placeholder={'Lọc lịch sử mua hàng'}
          data={orderedTime}
          labelField={'label'}
          valueField={'value'}
          value={value}
          onChange={() => {}}
        />

        {/* --- LIST OF ORDERED HISTORY --- */}
        {/* <FlatList 
          data={null}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        /> */}
        <Container 
          width={'100%'} height={more == true ? 'auto' : 84} p={12} r={6} mv={8}
          bgColor={colors.WHITE} shadow>
            <Container row width={'100%'}>
              <Container
                width={'60%'}>
                  <Text paragraph light color={colors.BLACK}>Mã đơn hàng</Text>
                  <Text paragraph bold color={colors.BLACK}>00000-00000-00000-00000</Text>
              </Container>
              <Container
                width={'40%'} aEnd>
                  <Text paragraph light color={colors.BLACK}>Ngày thanh toán</Text>
                  <Text paragraph bold color={colors.BLUE}>01/01/2023</Text>
              </Container>
            </Container>
            {
              more == true &&
              <Container width={'100%'}>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
              <Text>hello</Text>
            </Container>
            }
            
            <Button
              onPress={() => setMore(prevState => !prevState)} 
              width={'100%'} mt={8} aCenter jCenter>
              <Feather name={ more == false ? 'chevron-down' : 'chevron-up'} size={24} color={colors.DARK_GREY}/>
            </Button>
        </Container>
      </Container>
    </Container>
  )
}

export default OrderingHictory

const styles = StyleSheet.create({})