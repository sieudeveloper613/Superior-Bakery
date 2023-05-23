import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Button, Text, Image } from '../../../../components'
import { colors } from '../../../../themes/colors'
import Feather from 'react-native-vector-icons/Feather'
import { Header } from '../../../../components/custom'
import SearchAndFilter from './components/SearchAndFilter'
import FilterModal from './components/FilterModal'
import { logError } from '../../../../utils/console'
import { CATEGORY } from '../../../../routes/ScreenName'
import { productApi } from '../../../../APIs'
import formatMoney from '../../../../utils/formatMoney'
import { BASE_URL } from '../../../../APIs/url'

const Categories = ({ navigation: { navigate }, route }) => {
  const { item } = route.params;
  const [search, setSearch] = useState(null);
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([])
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    onCollectProductByCategory(item._id);
  },[])

  const searchProduct = (text) => {
    setSearch(text);
    const newProduct = productList.filter(item => {
        const name = item.name.toLowerCase().includes(text);
        return name;
    })
    setFilteredList(newProduct);
}

  const onCollectProductByCategory = async (categoryId) => {
    try {
      const collect = await productApi.collectProductByCategory(categoryId);
      if (collect) {
        const { products } = collect;
        setProductList(products);
      } else {
        setProductList([])
      }
    } catch (error) {
      logError('product-by-category-catch: ', error);
    }
  }

  const isProductExist = productList.some(product => product.name === search);

  const renderItem = ({ item, index }) => {
    return (
      <Button
        onPress={() => navigate(CATEGORY.PRODUCT_DETAIL_SCREEN, { item }) }
        key={item._id} 
        row width={'100%'} height={92} pr={16} shadow mv={8}
        bgColor={colors.WHITE} rTopEnd={16} rBottomEnd={16} rBottomStart={60} rTopStart={60}>
          <Image imageUri={BASE_URL + item?.image?.split('3000')[1]} round={92} />

          <Container 
            width={'72%'} height={'auto'} pv={12} pl={8}
            >
              <Text
                body color={colors.BLACK} bold
                numberOfLines={1} ellipsizeMode={'tail'}
              >{item.name}</Text>

              <Container 
                width={'100%'} mt={4}
                row between aCenter>
                <Container width={'50%'}>
                  <Text mb={4}>{item.meal}</Text>
                  <Container row aCenter>
                    <Feather style={{ transform: [{ scaleX: -1 }], marginRight: 8 }} name='coffee' size={24} color={colors.ORANGE}/>
                    <Text paragraph color={colors.ORANGE}>{item.power} calo</Text>
                  </Container>
                </Container>
                <Text body color={colors.TOMATO} bold>{formatMoney(item.price)}</Text>
              </Container>
          </Container>
      </Button>
    )
  }

  return (
      <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
          <Header label={item.name}/>
          <Container flex={1} p={16}>
              <SearchAndFilter 
                  placeholder={'Nhập tên sản phẩm'}
                  value={search}
                  onChangeText={(text) => searchProduct(text)}
                  onPress={() => setOpen(prevOpen => !prevOpen)}
              />
              {
                  open && <FilterModal 
                              onChoose={() => {}}
                              onClose={() => setOpen(false)}
                              onPress={() => {}}
                          />
              }
              {
                  productList.length > 0 || filteredList.length > 0 ?
                    <FlatList
                      contentContainerStyle={{ marginVertical: 16, paddingBottom: 32 }}
                      data={filteredList.length > 0 ? filteredList : productList}
                      keyExtractor={item => item._id}
                      renderItem={renderItem}
                    /> 
                  : isProductExist ? null :
                    <Container 
                      width={'100%'} height={48} r={6} mv={16}
                      jCenter aCenter bgColor={colors.GREY}>
                      <Text paragraph color={colors.DARK_GREY}>Hiện tại không có sản phẩm nào!</Text>
                    </Container>
              }
                          
          </Container>
      </Container>
  )
}

export default Categories

const styles = StyleSheet.create({})