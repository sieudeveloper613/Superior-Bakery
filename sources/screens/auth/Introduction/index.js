import React, { useEffect, useRef, useState } from "react"
import { FlatList, ScrollView, useWindowDimensions } from "react-native"

/* components */
import { Button, Container, Image, Text } from "../../../components"

/* implements */
import { reviews } from "../../../utils/data"
import { images } from "../../../themes/images"
import { colors } from "../../../themes/colors"
import { authorizationApi, othersApi } from "../../../APIs"
import { loginAction } from "../../../redux/Actions/authAction"

/* packages */
import { useDispatch } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Introduction = ({ navigation, route }) => {

  /* configure screen */
  const { width, height } = useWindowDimensions();

  /* create ref */
  const flatListRef = useRef(null);

  /* create redux */
  const dispatch = useDispatch();

  /* create route */
  const { account: email } = route.params;

  /* create state */
  const [isEndReached, setIsEndReached] = useState(false);
  const [introductionList, setIntroductionList] = useState([]);
  
  /* create useEffect to handle events */
  useEffect(() => {
    getUser();
    getIntroduction();
  }, []);

  /* function:  */
  const getUser = async () => {
    const getUser = await AsyncStorage.getItem("LOGIN");
    console.log("get-user: ", getUser)
  }

  const getUserInfo = async () => {
    try {
      const response = await authorizationApi.onGetInfo(email);

      if (response.code === 1) {
        return dispatch(loginAction(response.data));
      }
    } catch (error) {
      console.log("user-info-error: ", error);
      return;
    }
  }

  const getIntroduction = async () => {
    try {
      const response = await othersApi.onGetIntroduction();
      
      if (response.code !== 1) {
        setIntroductionList([]);
        return false;
      }

      setIntroductionList(onData.introduction);
    } catch (error) {
      console.log("introduction-error: ", error);
      return;
    }
  }

  const handleNextItem = (index) => {
    if (index === reviews.length) {
      // Đến vị trí cuối cùng, điều hướng đến trang tiếp theo
      console.log("end of list")
      return getUserInfo();
    } else {
      // Chưa đến vị trí cuối cùng, tiếp tục cuộn đến item tiếp theo
      return flatListRef.current?.scrollToIndex({ index: index });
    }
  };

  const handleEndReached = () => {
    // kiểm tra xem đã đến vị trí cuối cùng chưa
    const isEndReached = reviews.length === 4;
    if (isEndReached) {
      setIsEndReached(true);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Container key={index} width={width} bgColor={colors.WHITE}>
        <Container flex={1} p={16} aCenter>
          <Button onPress={() => handleNextItem(index + 1)}
            style={{ alignSelf: "flex-end" }}
            r={30} ph={24} pv={12} jCenter aCenter
            bgColor={index + 1 === 4 ? colors.PRIMARY : colors.PRIMARY_OPACITY_20}>
            <Text color={index + 1 === 4 ? colors.WHITE : colors.PRIMARY}>
              {index + 1 === 4 ? "Đi nào" : "Tiếp tục"}
            </Text>
          </Button>
          <Image source={images.SUPERIOR_LOGO} width={192} height={192} />
          <Text color={colors.PRIMARY} size={32} bold mt={8}>
            {item.title}
          </Text>
        </Container>

        <Container
          style={{
            shadowColor: colors.SHADOW,
            shadowOffset: {
              width: -2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2.5,
            elevation: 10,
          }}
          flex={1.2} rTopStart={16} rTopEnd={16}
          bgColor={colors.WHITE}>
          <Container row width={"100%"} p={16} mt={8}>
            <Container width={"70%"} jCenter>
              <Text color={colors.BLACK} size={20} bold>{item.label}</Text>
              <Container row>
                {
                  reviews.map((item, mIndex) => (
                   <Container key={mIndex} width={16} height={16} r={8} mt={8} mh={4}
                    bgColor={mIndex === index ? colors.PRIMARY : colors.GREY}
                  />
                ))}
              </Container>
            </Container>
            <Container width={"30%"} bgColor={colors.WHITE} jCenter aEnd>
              <Container jCenter aCenter b={6} r={72 / 2} width={72} height={72} bColor={colors.PRIMARY}>
                <Text color={colors.PRIMARY} size={32} bold>{index + 1}</Text>
              </Container>
            </Container>
          </Container>
          <Container mb={32} width={"100%"} height={2} bgColor={colors.PRIMARY} />
          <ScrollView style={{ paddingHorizontal: 12, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
            <Text width={"100%"} color={colors.BLACK} body justify>
              {item.content}
            </Text>
          </ScrollView>
        </Container>
      </Container>
    );
  };
  return (
    <Container safe flex={1} bgColor={colors.BACKGROUND}>
      <FlatList ref={flatListRef}
        horizontal
        pagingEnabled
        bounces={false}
        data={introductionList}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
}

export default Introduction;
