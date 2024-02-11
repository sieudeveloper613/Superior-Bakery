import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { Container, Button, Image, Text } from '../../../../components';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from '../../../../components/custom';
import { colors } from '../../../../themes/colors';
import RenderItem from './components/RenderItem';
import { othersApi } from '../../../../APIs';
import { logDebug, logError } from '../../../../utils/console';

const MainVoucher = () => {
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const loadDataCallback = useCallback( async () => {
    try {
      const onData = await othersApi.collectVouchers();
      if (onData) {
        const { isSuccess, message, vouchers } = onData;
        if (isSuccess === 1) {
          setVoucherList(vouchers);
        } else {
          logDebug('Message: ', message);
          setVoucherList([]);
        }
      }
      return null;
    } catch (error) {
      logError('load-data-callback-catch: ', error);
    }
  }, [])

  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Mã khuyến mãi'} />
      <Container flex={1} p={16}>
        {
          voucherList && voucherList.length > 0 ?
            <FlatList
              data={voucherList}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => <RenderItem item={item} index={index} />}
            />
          :
            <Container 
              width={'100%'} height={48} r={12}
              bgColor={colors.GREY} aCenter jCenter>
                <Text paragraph color={colors.DARK_GREY} italic>Hiện tại bạn không có mã khuyến mãi nào!</Text>
              </Container> 
        }
      </Container>
    </Container>
  )
}

export default MainVoucher;

const styles = StyleSheet.create({})