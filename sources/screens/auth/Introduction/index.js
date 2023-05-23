import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, FlatList, Dimensions, ScrollView} from 'react-native';
import {Button, Container, Image, Text} from '../../../components';
import {colors} from '../../../themes/colors';
import { authorizationApi, othersApi } from '../../../APIs';
import {reviews} from '../../../utils/data';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/Actions/authAction'
import { HOME_SCREEN } from '../../../routes/ScreenName'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logError } from '../../../utils/console';
import { images } from '../../../themes/images';

const { width, height } = Dimensions.get('window');

export default function Introduction({ navigation, route }) {
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const [isEndReached, setIsEndReached] = useState(false);
  const [introductionList, setIntroductionList] = useState([])
  const { account } = route.params;
  const [email, setEmail] = useState(account);
  console.log('account: ', email)
  useEffect(() => {
    onGetUser();
    
    onGetIntroduction();
  },[])

  const onGetUser = async () => {
    const getUser = await AsyncStorage.getItem('LOGIN');
    console.log('get-user: ', getUser)
  }

  const onGetUserInfo = async () => {
    try {
      const handleData = await authorizationApi.getInfo(email);
      if(handleData) {
        dispatch(loginAction(handleData))
      }
    } catch (error) {
      logError('catch-error: ', error)
    }
  }

  const onGetIntroduction = async () => {
    try {
      const onData = await othersApi.getIntroduction();
      if(onData) {
        setIntroductionList(onData.introduction);
      } else {
        throw new Error('can not fecth introduction data!')
      }
    } catch (error) {
      logError('catch-error: ', error)
    }
  }

  const handleNextItem = (index) => {
    if (index === reviews.length) {
      // Đến vị trí cuối cùng, điều hướng đến trang tiếp theo
      console.log('end of list')
      onGetUserInfo();
      // navigation.navigate(HOME_SCREEN);
    } else {
      // Chưa đến vị trí cuối cùng, tiếp tục cuộn đến item tiếp theo
      flatListRef.current?.scrollToIndex({ index: index });
    }
  };

  const handleEndReached = () => {
    // kiểm tra xem đã đến vị trí cuối cùng chưa
    const isEndReached = reviews.length === 4;
    if (isEndReached) {
      console.log('end of list')
      setIsEndReached(true);
    }
  };

  const renderItem = ({item, index}, ) => {
    return (
      <Container key={index} width={width} bgColor={colors.WHITE}>
        <Container flex={1} p={16} aCenter>
          <Button 
            onPress={() => handleNextItem(index + 1)}
            style={{alignSelf: 'flex-end'}}
            width={'30%'}
            height={42}
            jCenter
            aCenter
            r={30}
            bgColor={index + 1 === 4 ? colors.PRIMARY : colors.GREY}>
            <Text
              color={index + 1 === 4 ? colors.WHITE : colors.DARK_GREY}
              size={14}>
              {index + 1 === 4 ? 'Đi nào' : 'Tiếp tục'}
            </Text>
          </Button>
          <Image source={images.SUPERIOR_LOGO} width={192} height={192} />
          <Text color={colors.PRIMARY} size={32} bold mt={8}>
            {item.title}
          </Text>
        </Container>

        <Container
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          flex={1}
          rTopStart={16}
          rTopEnd={16}
          bgColor={colors.WHITE}>
          <Container row width={'100%'} p={16} mt={8}>
            <Container width={'70%'} jCenter>
              <Text color={colors.BLACK} size={20} bold>
                {item.label}
              </Text>
              <Container row>
                {reviews.map((item, index) => (
                  <Container
                    key={index}
                    width={16}
                    height={16}
                    r={8}
                    bgColor={
                      reviews.filter(value => value.id === item.id)
                        ? colors.PRIMARY
                        : colors.GREY
                    }
                    mt={8}
                    mh={4}
                  />
                ))}
              </Container>
            </Container>
            <Container width={'30%'} bgColor={colors.WHITE} jCenter aEnd>
              <Container
                width={72}
                height={72}
                jCenter
                aCenter
                b={6}
                r={72 / 2}
                bColor={colors.PRIMARY}>
                <Text color={colors.PRIMARY} size={32} bold>
                  {index + 1}
                </Text>
              </Container>
            </Container>
          </Container>
          <Container
            width={'100%'}
            height={2}
            bgColor={colors.PRIMARY}
            mb={32}
          />
          <ScrollView>
          <Text ph={16} pb={16} color={colors.BLACK} body justify>
            {item.content}
          </Text>
          </ScrollView>
          
        </Container>
      </Container>
    );
  };
  return (
    <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        data={introductionList}
        onEndReached={handleEndReached}
        keyExtractor={item => item._id} // if have no id ==> index => index.toString();
        renderItem={renderItem}
        pagingEnabled
        bounces={false}
      />
      
    </Container>
  );
}

const styles = StyleSheet.create({});
