import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Button, Text, Image } from '../../../../components'
import { colors } from '../../../../themes/colors'
import { icons } from '../../../../themes/icons'
import { useNavigation } from '@react-navigation/native'
import { CATEGORY } from '../../../../routes/ScreenName'
import { productApi } from '../../../../APIs'
import { logError } from '../../../../utils/console'

const { width, height } = Dimensions.get('window');

const Categories = ({ label }) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        onCollectCategory();
    },[]);

    const onCollectCategory = async () => {
        try {
            const onCollect = await productApi.collectCategory();
            if( onCollect ) {
                const { categories } = onCollect;
                setCategories(categories);
            } else {
                setCategories([])
            }
        } catch (error) {
            logError('collect-category-catch: ', error);
        }
    }
    const navigation = useNavigation();
    return (
        <Container width={'100%'} wrap mv={16}>
            <Text color={colors.BLACK} size={16} bold >{label}</Text>
            <Container width={'100%'} row between mt={8}>
                {
                    categories.map((item, index) => {
                        const iconArr = [icons.CAKE_ICON, icons.BURGER_ICON, icons.DRINK_ICON, icons.DISH_ICON]
                        const iconIndex = index % iconArr.length // lấy phần dư để vòng lại mảng iconsArr
                        const icon = iconArr[iconIndex]
                        return (
                            <Button key={item.id} jCenter aCenter
                                onPress={() => navigation.navigate(CATEGORY.CATEGORIES_SCREEN, { item })}>
                                <Container 
                                    bColor={colors.WHITE} b={2} width={60} height={60} 
                                    jCenter aCenter r={16} bgColor={colors.PRIMARY}>
                                    <Image source={icon} width={28} height={28} />
                                </Container>
                                <Text color={colors.BLACK} size={13} bold mt={8}>{item.name}</Text>
                            </Button>
                        )
                    })
                }
            </Container>
        </Container>
    )
}

export default Categories

const styles = StyleSheet.create({})