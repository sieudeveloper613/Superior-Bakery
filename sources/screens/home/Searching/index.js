import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Button, Text, Image } from '../../../components'
import { colors } from '../../../themes/colors'
import Feather from 'react-native-vector-icons/Feather'
import { Header } from '../../../components/custom'
import SearchAndFilter from './components/SearchAndFilter'
import { productApi } from '../../../APIs';
import { logError } from '../../../utils/console'
import { FlatList } from 'react-native-gesture-handler'
import formatMoney from '../../../utils/formatMoney'
import { CATEGORY } from '../../../routes/ScreenName'
import { filterProduct } from '../../../utils/data'

const { width, height } = Dimensions.get('window');

const Searching = ({ navigation }) => {
    const { filterByCategory, filterByPrice, filterByType } = filterProduct;
    const [search, setSearch] = useState(null);
    const [open, setOpen] = useState(false);
    const [productList, setProductList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filteredListMany, setFilteredListMany] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryLabel, setCategoryLabel] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    console.log('selected-category: ', selectedCategory)

    useEffect(() => {
        onCollectProducts();
        onCollectCategories();
    },[]);


    const searchProduct = (text) => {
        setSearch(text);
        const newProduct = productList.filter(item => {
            const name = item.name.toLowerCase().includes(text);
            return name;
        })
        setFilteredList(newProduct);
    }
    
    const onCollectProducts = async () => {
        try {
            const onCollect = await productApi.collectProducts();
            if (onCollect) {
                const { products, isSuccess, message } = onCollect;
                if (isSuccess === 1) {
                    setProductList(products);
                } else {
                    setCategories([]);
                    logError('Message: ', message);
                }
            }
        } catch (error) {
            logError('collect-products-catch: ', error);
        }
    }

    const onCollectCategories = async () => {
        try {
            const onCollect = await productApi.collectCategory();
            if (onCollect) {
                const { categories } = onCollect;
                setCategories(categories);
            } else {
                setCategories([]);
            }
        } catch (error) {
            logError('collect-categories-catch: ', error);
        }
    }

    const handleFilter = () => {
        try {
            if (selectedCategory) {
                let getCategory = categories.find(item => item.type === selectedCategory?.category);
                console.log('find-category: ', getCategory);
                let newData = productList.filter(item => item.category === getCategory._id);
                console.log('new-data-filter: ', newData)
                setFilteredListMany(newData);
            }
        } catch (error) {
            logError('filter-product-failed: ', error);
        }
    }

    const FilterModal = ({ onClose, onPress }) => {
      return (
        <Container width={'100%'} height={'auto'} p={16} mv={8} r={16} shadow bgColor={colors.WHITE}>
            <Container width={'100%'}>
                <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo loại sản phẩm</Text>
                <Container row evenly>
                    {
                        filterByCategory.map(item => {
                            const isSelected = item.id === selectedCategory?.id;
                            return (
                                <Button 
                                    onPress={() => setSelectedCategory(item)}
                                    key={item.id} 
                                    width={'30%'} height={30} r={30} p={4} 
                                    jCenter aCenter bgColor={isSelected ? colors.PRIMARY : colors.LIGHT_GREY}>
                                    <Text color={isSelected ? colors.WHITE : colors.BLACK} size={14}>{item.name}</Text>
                                </Button>
                            )
                        })
                    }
                </Container>
            </Container>
    
            <Container width={'100%'} mv={16}>
                <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo giá</Text>
                <Container row evenly>
                    {
                        filterByPrice.map(item => {
                            const isSelected = item.id === selectedPrice?.id;
                            return (
                                <Button 
                                    onPress={() => setSelectedPrice(item)}
                                    key={item.id} 
                                    width={'45%'} height={30} r={30} p={4} 
                                    jCenter aCenter bgColor={isSelected ? colors.PRIMARY : colors.LIGHT_GREY}>
                                    <Text color={isSelected ? colors.WHITE : colors.BLACK} size={14}>{item.name}</Text>
                                </Button>
                            )
                        })
                    }
                </Container>
            </Container>
    
            <Container width={'100%'} >
                <Text caption color={colors.DARK_GREY} mb={8}>Lọc theo sản phẩm</Text>
                <Container row evenly>
                    {
                        filterByType.map(item => {
                            const isSelected = item.id === selectedProduct?.id;
                            return (
                                <Button 
                                    onPress={() => setSelectedProduct(item)}
                                    key={item.id} 
                                    width={'auto'} height={30} r={30} ph={12} 
                                    jCenter aCenter bgColor={isSelected ? colors.PRIMARY : colors.LIGHT_GREY}>
                                    <Text color={isSelected ? colors.WHITE : colors.BLACK} size={14}>{item.name}</Text>
                                </Button>
                            )
                        })
                    }
                </Container>
            </Container>
            <Container mv={16} width={'100%'} height={1} bgColor={colors.DARK_GREY}/>
            <Container row width={'100%'} between>
                <Button
                    onPress={onClose} 
                    width={90} height={36} r={30} jCenter aCenter bgColor={'rgba(255, 0, 0, 0.2)'}>
                    <Text body color={colors.TOMATO} bold>Đóng</Text>
                </Button>
                <Button
                    onPress={onPress} 
                    width={120} height={36} r={30} jCenter aCenter bgColor={colors.PRIMARY}>
                    <Text body color={colors.WHITE} bold>Áp dụng</Text>
                </Button>
            </Container>
        </Container>
      )
    }

    const renderItem = ({ item, index }) => {
        categories.filter(cat => {
            if (cat._id === item.category){
                setCategoryLabel(cat.name)
            } return;
        });
        return (
            <Button
                onPress={() => navigation.navigate(CATEGORY.PRODUCT_DETAIL_SCREEN, { item }) }
                key={item._id} 
                row width={'100%'} height={92} pr={16} shadow mv={8}
                bgColor={colors.WHITE} rTopEnd={16} rBottomEnd={16} rBottomStart={60} rTopStart={60}>
                <Image imageUri={item.image} round={92} />
        
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
                            {/* <Feather style={{ transform: [{ scaleX: -1 }], marginRight: 8 }} name='coffee' size={24} color={colors.ORANGE}/> */}
                            <Container p={4} bgColor={colors.ORANGE_OPACITY_15} r={6}>
                                <Text caption color={colors.ORANGE}>{item.power} calo</Text>
                            </Container>
                            <Container p={4} bgColor={colors.BLACK_OPACITY_20} r={6} ml={4}>
                                <Text caption color={colors.DARK_GREY}>{categoryLabel}</Text>
                            </Container>
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
            <Header label={'Tìm kiếm sản phẩm'}/>
            <Container flex={1} p={16}>
                <SearchAndFilter 
                    placeholder={'Nhập tên sản phẩm'}
                    value={search}
                    onChangeText={(text) => searchProduct(text)}
                    onPress={() => setOpen(prevOpen => !prevOpen)}
                />
                {
                    open && <FilterModal 
                                onClose={() => {
                                    setOpen(false);
                                    setSelectedCategory(null);
                                    setSelectedPrice(null);
                                    setSelectedProduct(null);
                                }}
                                onPress={() => {
                                    handleFilter();
                                    setOpen(false);
                                }}
                            />
                }
                {/* !search ?
                        <Container 
                            width={'100%'} height={48} r={6} mv={16}
                            jCenter aCenter bgColor={colors.GREY}>
                            <Text paragraph color={colors.DARK_GREY}>Vui lòng nhập tên sản phẩm để tìm kiếm</Text>
                        </Container> */}
                {
                    filteredList.length == 0  || filteredListMany.length == 0 ?
                        <Container 
                            width={'100%'} height={48} r={6} mv={16}
                            jCenter aCenter bgColor={colors.GREY}>
                            <Text paragraph color={colors.DARK_GREY}>Không có sản phẩm tìm kiếm rồi!</Text>
                        </Container>
                    : 
                        <FlatList
                            contentContainerStyle={{ marginTop: 16, paddingBottom: 32 }}
                            data={
                                filteredList && filteredList.length > 0 ? 
                                    filteredList : 
                                        filteredListMany && filteredListMany.length > 0 ? 
                                            filteredListMany : 
                                                productList
                            }
                            keyExtractor={item => item._id}
                            renderItem={renderItem}
                        />
                }
            </Container>
        </Container>  
    )
}

export default Searching

const styles = StyleSheet.create({})