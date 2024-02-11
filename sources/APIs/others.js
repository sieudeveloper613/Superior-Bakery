import { BASE_URL } from "./url";
import axios from "axios";
import { logError, logDebug, logInfo  } from "../utils/console";

const onGetIntroduction = async () => {
    try {
        const request = await axios.get(`${BASE_URL}/api/getIntroduction`);
        return request.data;
    } catch (error) {
        console.log("on-get-introduction-error: ", error);
        return;
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

const collectVouchers = async () => {
    try {
        const onCollect = await axios.get(`${BASE_URL}/api/collect-vouchers`,
            {
                headers: {
                    Accept: "application/json",
                    "Content'-Type": "application/json"
                }
            }
        );
        logDebug('collect-vouchers-data: ', onCollect.data);
        return onCollect.data;

    } catch (error) {
        logError('collect-vouchers-error: ', error);
    }
};

const collectVoucherById = async (voucherId) => {
    try {
        logDebug('collect-voucher-by-id-params: ', voucherId);
        const onCollect = await axios.get(`${BASE_URL}/api/collect-voucher-by-id?voucherId=${voucherId}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content'-Type": "application/json"
                }
            }
        );
        logDebug('collect-voucher-by-id-data: ', onCollect.data);
        return onCollect.data;

    } catch (error) {
        logError('collect-vouchers-error: ', error);
    }
};

export default {
    onGetIntroduction,
    collectStore,
    collectNotification,
    updateViewNotification,
    collectVouchers,
    collectVoucherById

}