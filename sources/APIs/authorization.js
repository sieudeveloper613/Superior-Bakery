import { logDebug, logError, logInfo } from "../utils/console";
import { BASE_URL } from "./url";
import axios from 'axios';

 const signIn = async (email, password) => {
    try {
        logInfo('PARAMS-SIGN-IN: ', email, password);
        const onData = await axios.post(`${BASE_URL}/api/signIn`, {
            email,
            password
        });
        logInfo('FETCHING-DATA: ', onData);
        return onData.data;
    } catch (error) {
        logError('GOT-AN-ERROR', error)
    }
}

 const signUp = async (email, fullname, phone, password) => {
    try {
        logInfo('PARAMS-SIGN-UP: ', email, fullname, phone, password);
        const onData = await axios.post(`${BASE_URL}/api/signUp`, {
            email,
            fullname,
            phone,
            password
        });
        logInfo('FETCHING-DATA: ', onData);
        return onData.data;
    } catch (error) {
        logError('GOT-AN-ERROR', error)
    }
}

const getInfo = async (email) => {
    try {
        logInfo('PARAMS-GET-INFO: ', email);
        const onData = await axios.post(`${BASE_URL}/api/user-info`,{
            email,
        });
        logInfo('FETCHING-DATA: ', onData.data);
        return onData.data;
    } catch (error) {
        logError('GOT-AN-ERROR', error)
    }
}

const changePassword = async (email, oldPassword, newPassword) => {
    logDebug('params-change-password: ', email, oldPassword, newPassword)
    try {
        const onData = await axios.post(`${BASE_URL}/api/change-password`, {
            email,
            oldPassword,
            newPassword
        })
        logInfo('FETCHING-DATA: ', onData.data);
        return onData.data;
    } catch (error) {
        logError('change-password-error: ', error);
    }
}

const updateInfo = async (id, fullname, phone) => {
    try {
        logDebug('params-update-info: ', id, fullname, phone)
        const onData = await axios.post(`${BASE_URL}/api/update-info`, {
            id,
            fullname,
            phone,
        })
        logInfo('FETCHING-DATA: ', onData.data);
        return onData.data;
    } catch (error) {
        logError('update-info-error: ', error);
    }
}

const insertAddress = async (id, address, ward, district, city, type, typeName) => {
    try {
        logDebug('insert-address-params: ', id, address, ward, district, city, type, typeName);
        const onInsert = await axios.post(`${BASE_URL}/api/insert-address`, {
            id, address, ward, district, city, type, typeName
        });
        logInfo('insert-address-data: ', onInsert.data);
        return onInsert.data;
    } catch (error) {
        logError('insert-address-error: ', error);
    }
}

const collectAddress = async (userId) => {
    try {
        logDebug('collect-address-params: ', userId);
        const onCollect = await axios.get(`${BASE_URL}/api/collect-address-by-id?id=${userId}`)
        logInfo('collect-address-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-address-error: ', error);
    }
}

const updateAddress = async (id, idAddress, address, ward, district, city, type, typeName) => {
    try {
        logDebug('update-address-params: ', id, idAddress, address, ward, district, city, type, typeName);
        const onUpdate = await axios.post(`${BASE_URL}/api/update-address-by-id`, {
            id, idAddress, address, ward, district, city, type, typeName
        });
        logInfo('update-address-data: ', onUpdate.data);
        return onUpdate.data;
    } catch (error) {
        logError('update-address-error: ', error);
    }
}

const removeAddress = async (userId, idAddress) => {
    try {
        logDebug('remove-address-params: ', userId, idAddress);
        const onRemove = await axios.post(`${BASE_URL}/api/remove-address-by-id`, {
            id: userId,
            idAddress: idAddress,
        });
        logInfo('remove-address-data: ', onRemove.data);
        return onRemove.data;
    } catch (error) {
        logError('remove-address-error: ', error);
    }
}

const uploadAvatar = async (userId, imageUri) => {
    try {
        logInfo('params-upload-avatar: ', userId, imageUri)
        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'avatar.jpg',
        });
        formData.append('id', userId);
        const response = await axios.post(`${BASE_URL}/api/update-avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default {
    signIn,
    signUp,
    getInfo,
    changePassword,
    updateInfo,
    insertAddress,
    collectAddress,
    updateAddress,
    removeAddress,
    uploadAvatar
}