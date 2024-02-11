import React, { useState } from "react"
import { StyleSheet, ScrollView, useWindowDimensions } from "react-native"

/* components */
import Header from "./components/Header"
import Today from "./components/Today"
import Sellest from "./components/Sellest"
import Categories from "./components/Categories"
import DrawerNavigation from "./components/DrawerNavigation"
import { Container, Text, Button, Image } from "./../../../components"

/* implements */
import { sellest } from "../../../utils/data"
import { images } from "../../../themes/images"
import { colors } from "../../../themes/colors"

/* packages */
import "react-native-gesture-handler"

/* screens */
import { CATEGORY, SEARCHING_SCREEN } from "../../../routes/ScreenName"

const MainHome = ({ navigation: { navigate } }) => {
  /* configure screen */
  const { width, height } = useWindowDimensions();

  /* create state */
  const [open, setOpen] = useState(false);
  const [numColumns, setNumColumns] = useState(1);

  const openDrawer = () => setOpen(true);

  const closeDrawer = () => setOpen(false);

  const switchDrawer = () => setOpen(!open);

  // console.log("sellest-list: ", sellest)
  const renderItem = ({ item, index }) => {
    return (
      <Button
        key={index}
        width={240}
        height={180}
        bgColor={colors.WHITE}
        r={16}
        shadow
        mr={16}
        onPress={() => navigate(CATEGORY.PRODUCT_DETAIL_SCREEN, { item })}>
        <Image
          source={images.FOOD_REVIEW}
          width={240}
          height={120}
          radius={16}
        />
        <Container row aCenter jCenter p={12}>
          <Container width={"75%"}>
            <Text
              size={14}
              color={colors.PRIMARY}
              bold
              numberOfLines={1}
              ellipsizeMode={"tail"}>
              {item.foodName}
            </Text>
            <Text size={12} color={colors.DARK_GREY}>
              Đã bán {item.sold}
            </Text>
          </Container>
          <Text right width={"25%"} color={colors.TOMATO} size={16} bold>
            {item.price}
          </Text>
        </Container>
      </Button>
    );
  };

  const renderTodayItem = ({ item, index }) => {
    return (
      <Button
        key={index}
        onPress={() => navigate(CATEGORY.PRODUCT_DETAIL_SCREEN, { item })}
        width={"100%"}
        bgColor={colors.WHITE}
        r={16}
        shadow
        jCenter
        aCenter
        mv={8}>
        <Image
          radius={16}
          source={images.FOOD_REVIEW}
          width={"100%"}
          height={164}
        />
        <Container
          row width={"100%"} p={12} between aCenter>
          <Text
            width={"100%"}
            numberOfLines={1}
            ellipsizeMode={"tail"}
            color={colors.BLACK}
            center bold
            size={16}>
            {item.foodName}
          </Text>

        </Container>
        <Container row width={"100%"} ph={12} pb={12} between>
          <Container width={"60%"} row>
            <Container
              width={"auto"} p={6} r={6} mh={2}
              bgColor={colors.LIGHT_GREY}>
              <Text paragraph color={colors.DARK_GREY}>Bánh mì</Text>
            </Container>
            <Container
              width={"auto"} p={6} r={6} mh={2}
              bgColor={colors.LIGHT_GREY}>
              <Text paragraph color={colors.DARK_GREY}>256 calo</Text>
            </Container>
          </Container>

          <Container width={"40%"}>
            <Text width={"100%"} right color={colors.TOMATO} size={18} bold>
              {item.price}
            </Text>
          </Container>
        </Container>
      </Button>
    );
  };

  return (
    <DrawerNavigation
      open={open}
      onOpen={openDrawer}
      onClose={closeDrawer}
      onPress={switchDrawer}>
      <Container safe flex={1} aCenter ph={24} pv={16} bgColor={colors.LIGHT_GREY}>
        <Header isNews text={"Tìm kiếm sản phẩm"} onOpen={openDrawer} onPress={() => navigate(SEARCHING_SCREEN)} />

        <ScrollView
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}>
          <Sellest
            horizontal
            nestedScrollEnabled={true}
            label={"Bán chạy nhất"}
            onPress={() => { }}
            text={"xem tất cả"}
            data={sellest}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
          <Categories label={"Loại món ăn"} />
          <Today
            contentContainerStyle={{
              width: "100%",
              justifyContent: "space-between",
            }}
            label={"Gợi ý ngày hôm nay"}
            data={sellest}
            keyExtractor={item => item.id + numColumns}
            renderItem={renderTodayItem}
            nestedScrollEnabled={true}
            numColumns={numColumns}
          />
        </ScrollView>
      </Container>
    </DrawerNavigation>
  );
};

export default MainHome;

const styles = StyleSheet.create({});
