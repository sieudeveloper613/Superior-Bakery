import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Button, Text, Input, Image } from '../../../../components';
import { colors } from '../../../../themes/colors';
import { Header } from '../../../../components/custom'
import { notificationType } from '../../../../utils/data';
import Feather from 'react-native-vector-icons/Feather'
import { NOTIFICATION } from '../../../../routes/ScreenName'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { logDebug, logError, logInfo } from '../../../../utils/console';
import { othersApi } from '../../../../APIs';
import { useSelector } from 'react-redux';
import { images } from '../../../../themes/images';



const MainNotification = ({}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const authState = useSelector(state => state.authState.authInfo);
  console.log('notification-type: ', authState)
  const [selectedId, setSelectedId] = useState(0);
  const [initialNotificationList, setInitialNotificationList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    isFocused && onCollectNotification();
  },[isFocused])

  useEffect(() => {
    onCollectNotification();
  },[onCollectNotification]);

  const onCollectNotification = useCallback(async () => {
    try {
      const onNotification = await othersApi.collectNotification();
      if (onNotification){
        const { notifications } = onNotification;
        const filteredData = notifications.filter(item => {
          if (item.type === 'yours' && item?.user !== authState._id) {
            // Nếu kiểu thông báo là yours và user không khớp với ID người dùng, loại bỏ thông báo này
            return false;
          } else {
            // Ngược lại, giữ lại thông báo này
            return true;
          }
        });
        setNotificationList(filteredData);
        setInitialNotificationList(filteredData);
      } else {
        setNotificationList([])
      }
    } catch (error) {
      logError('collect-notification-catch: ', error);
    }
  }, [])

  const filterNotification = (type) => {
    console.log('filter-type: ', type);
  
    if (type === 'all') {
      // Nếu người dùng chọn kiểu "all", hiển thị toàn bộ danh sách thông báo
      const newData = initialNotificationList.filter(item => {
        if (item.type === 'yours' && item?.user !== authState._id) {
          // Nếu kiểu thông báo là yours và user không khớp với ID người dùng, loại bỏ thông báo này
          return false;
        } else {
          // Ngược lại, giữ lại thông báo này
          return true;
        }
      });
      setNotificationList(newData);
      setNewArr(newData);
    } else {
      // Ngược lại, lọc danh sách thông báo theo kiểu được chọn
      const newData = initialNotificationList.filter(item => {
        if (item.type === 'yours' && item.user !== authState._id) {
          // Nếu kiểu thông báo là yours và user không khớp với ID người dùng, loại bỏ thông báo này
          return false;
        } else if (item.type === type) {
          // Ngược lại, nếu kiểu thông báo khớp với kiểu được chọn, giữ lại thông báo này
          return true;
        } else {
          // Nếu không thì loại bỏ thông báo này
          return false;
        }
      });
      console.log('on-new-data: ', newData);
      setNotificationList(newData);
      setNewArr(newData);
    }
  };

  const updateViewNotification = async (userId, notificationId, item) => {
    try {
      const onUpdate = await othersApi.updateViewNotification(userId, notificationId);
      if (onUpdate) {
        const { isSuccess, message } = onUpdate;
        if (isSuccess === 1) {
          logDebug('SUCCESS: ', message);
          return navigation.navigate(NOTIFICATION.DETAIL_NOTIFICATION, { item: item })
        } else {
          logDebug('FAILED: ', message);
        }
      } else {
        return new Error('UNDEFINED ERROR OCCURED!')
      }
    } catch (error) {
      logError('update-view-notification-catch: ', error);
    }
  }

  const Dot = ({view}) => {
    return (
      <Container 
        style={{ display: view ? 'none' : 'flex'}} 
        width={10} height={10} r={10/2} bgColor={colors.BLUE}/>
    )
  }

  const renderItem = ({ item, index }) => {
    logDebug('item-noti: ', item)
    return (
      <Button 
        onPress={() => {
          if (item.isView) {
            navigation.navigate(NOTIFICATION.DETAIL_NOTIFICATION, { item: item })
          } else {
            updateViewNotification(authState._id, item._id, item)
          }
        }}
        row width={'100%'} height={92} p={16} bb={StyleSheet.hairlineWidth}
        bgColor={item.isView ? colors.GREY : colors.WHITE}>
          <Container width={'20%'}>
            <Image source={images.SUPERIOR_LOGO} round={56} radius={56/2} />
          </Container>
          <Container width={'80%'} pl={8}>
            <Container row width={'100%'}>
              <Text 
                width={'90%'} body color={colors.BLACK} bold
                numberOfLines={2} ellipsizeMode={'tail'}
              >{item.title}</Text>
              <Container width={'10%'} aEnd>
                <Dot view={item.isView}/>
              </Container>
            </Container>
            <Container row width={'100%'} mt={8}>
              <Text width={'50%'} medium>Xem chi tiết</Text>
              <Text width={'50%'} light right>{item.sendAt}</Text>
            </Container>
          </Container>
      </Button>
    )
  }

  const SearchInput = () => {
    return (
      <Container 
        row width={'100%'} height={48} p={8} r={6} 
        shadow bgColor={colors.WHITE} jCenter aCenter>
        <Input
          placeholder={'Tìm kiếm thông báo'}
          placeholderTextColor={colors.DARK_GREY} 
          width={'90%'} height={48}/>
        <Feather name='search' size={24} color={colors.DARK_GREY} />
      </Container>
    )
  }
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      <Header label={'Thông báo'} />
      <Container flex={1} p={0}>
        <Container p={16}>
          {/* --- SEARCHING BAR --- */}
          <SearchInput />
          
          {/* --- TYPE OF NOTIFICATION: ALL | YOURS | EVENTS --- */}
          <Container row width={'100%'} mv={16}>
            {
              notificationType.map(item => {
                return (
                  <Button onPress={() => {
                    setSelectedId(item.id)
                    filterNotification(item.type)
                    
                  }}
                  key={item.id} width={'auto'} p={12} 
                  jCenter aCenter r={6} shadow={selectedId === item.id ? true : false} mh={item.id == 1 ? 8 : 0}
                  bgColor={selectedId === item.id ? colors.WHITE : colors.LIGHT_GREY}>
                    <Text body color={selectedId === item.id ? colors.BLACK : colors.DARK_GREY} bold>{item.name}</Text>
                  </Button>
                )
              })
            }
          </Container>
        </Container>
        
        {/* --- LIST OF NOTIFICATION --- */}
        {
          notificationList?.length == 0 ?
            <Container 
              width={'90%'} height={48} r={12} 
              bgColor={colors.GREY} jCenter aCenter center>
              <Text body color={colors.DARK_GREY} italic>Hiện tại không có thông báo nào!</Text>
            </Container>
          :
          <FlatList
            style={{ marginTop: 0 }}
            data={notificationList}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        }
        
      </Container>
    </Container>
  )
}

export default MainNotification

const styles = StyleSheet.create({})