import { BASE_URL } from "./url";
import axios from "axios";
import { logError, logDebug, logInfo  } from "../utils/console";

const getIntroduction = async () => {
    try {
        const getData = await axios.get(`${BASE_URL}/api/introduction`);
        if(getData) {
            console.log('introduction-data: ', getData.data);
            return getData.data
        }
    } catch (error) {
        logError('api-introduction-error: ', error)
    }
}

const collectStore = async () => {
    try {
        const onCollect = await axios.get(`${BASE_URL}/api/collect-store`);
        logDebug('store-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-store-error: ', error);
    }
}

const collectNotification = async () => {
    try {
        const onCollect = await axios.get(`${BASE_URL}/api/collect-notification`);
        logDebug('notifications-data: ', onCollect.data);
        return onCollect.data;
    } catch (error) {
        logError('collect-notifications-error: ', error);
    }
}

const updateViewNotification = async (userId, notificationId) => {
    try {
        logInfo('update-view-params: ', userId, notificationId);
        const onUpdate = await axios.post(`${BASE_URL}/api/update-view-notification`,{
            userId, notificationId
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        logDebug('update-view-data: ', onUpdate.data);
        return onUpdate.data;
    } catch (error) {
        logError('update-view-notification-error: ', error);
    }
}

export default {
    getIntroduction,
    collectStore,
    collectNotification,
    updateViewNotification
}