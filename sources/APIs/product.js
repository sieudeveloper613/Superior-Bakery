import { BASE_URL } from "./url";
import axios from 'axios';
import { logInfo, logDebug, logError } from "../utils/console";

const collectCategory = async () => {
    try {
        const onCollect = await axios.get(`${BASE_URL}/api/category`);
        logDebug('category-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-category-error: ', error);
    }
}

const collectProducts = async () => {
    try {
        const onCollect = await axios.get(`${BASE_URL}/api/collect-product`);
        logDebug('products-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-product-error: ', error);
    }
}

const collectProductById = async (id) => {
    try {
        logInfo('product-by-id-params: ', id);
        const onCollect = await axios.get(`${BASE_URL}/api/collect-product-by-id`,{
            params: {
                id
            }
        });
        logDebug('product-by-id-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-product-by-id-error: ', error);
    }
}

const collectProductByCategory = async (categoryId) => {
    try {
        logInfo('product-by-category-params: ', categoryId);
        const onCollect = await axios.get(`${BASE_URL}/api/collect-product-by-category?idCategory=${categoryId}`)
        logDebug('product-by-category-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-product-by-category-error: ', error);
    }
}

export default {
    collectCategory,
    collectProducts,
    collectProductById,
    collectProductByCategory
}