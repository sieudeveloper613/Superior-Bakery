import axios from "axios"
import { BASE_URL } from "./url"

 const onSignIn = async (email = "", password = "") => {
    try {
        console.log("sign-in-params: ", { email, password });

        const request = await axios.post(`${BASE_URL}/api/signIn`, {
            email,
            password
        });

        return request.data;
    } catch (error) {
        console.log("on-sign-in-error: ", error)
        return;
    }
}

 const onSignUp = async (email = "", fullname = "", phone = "", password = "") => {
    try {
        console.log("sign-up-params: ", { email, fullname, phone, password });
        const request = await axios.post(`${BASE_URL}/api/signUp`, {
            email,
            fullname,
            phone,
            password
        });

        return request.data;
    } catch (error) {
        console.log("on-sign-in-error: ", error)
        return;
    }
}

const onGetInfo = async (email = "") => {
    try {
        console.log("get-infor-params: ", { email });

        const request = await axios.get(`${BASE_URL}/api/getUserInfo?email=${email}`);
        return request.data;
    } catch (error) {
        console.log("on-get-infor-error: ", error);
        return;
    }
}

const changePassword = async (email, oldPassword, newPassword) => {
    console.log("params-change-password: ", email, oldPassword, newPassword)
    try {
        const onData = await axios.post(`${BASE_URL}/api/change-password`, {
            email,
            oldPassword,
            newPassword
        })
        console.log("FETCHING-DATA: ", onData.data);
        return onData.data;
    } catch (error) {
        console.log("change-password-error: ", error);
    }
}

const updateInfo = async (id, fullname, phone) => {
    try {
        console.log("params-update-info: ", id, fullname, phone)
        const onData = await axios.post(`${BASE_URL}/api/update-info`, {
            id,
            fullname,
            phone,
        })
        console.log("FETCHING-DATA: ", onData.data);
        return onData.data;
    } catch (error) {
        console.log("update-info-error: ", error);
    }
}

const insertAddress = async (id, address, ward, district, city, type, typeName) => {
    try {
        console.log("insert-address-params: ", id, address, ward, district, city, type, typeName);
        const onInsert = await axios.post(`${BASE_URL}/api/insert-address`, {
            id, address, ward, district, city, type, typeName
        });
        console.log("insert-address-data: ", onInsert.data);
        return onInsert.data;
    } catch (error) {
        console.log("insert-address-error: ", error);
    }
}

const collectAddress = async (userId) => {
    try {
        console.log("collect-address-params: ", userId);
        const onCollect = await axios.get(`${BASE_URL}/api/collect-address-by-id?id=${userId}`)
        console.log("collect-address-data: ", onCollect.data);
        return onCollect.data;
    } catch (error) {
        console.log("collect-address-error: ", error);
    }
}

const updateAddress = async (id, idAddress, address, ward, district, city, type, typeName) => {
    try {
        console.log("update-address-params: ", id, idAddress, address, ward, district, city, type, typeName);
        const onUpdate = await axios.post(`${BASE_URL}/api/update-address-by-id`, {
            id, idAddress, address, ward, district, city, type, typeName
        });
        console.log("update-address-data: ", onUpdate.data);
        return onUpdate.data;
    } catch (error) {
        console.log("update-address-error: ", error);
    }
}

const removeAddress = async (userId, idAddress) => {
    try {
        console.log("remove-address-params: ", userId, idAddress);
        const onRemove = await axios.post(`${BASE_URL}/api/remove-address-by-id`, {
            id: userId,
            idAddress: idAddress,
        });
        console.log("remove-address-data: ", onRemove.data);
        return onRemove.data;
    } catch (error) {
        console.log("remove-address-error: ", error);
    }
}

const uploadAvatar = async (userId, imageUri) => {
    try {
        console.log("params-upload-avatar: ", userId, imageUri)
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            type: "image/jpeg",
            name: "avatar.jpg",
        });
        formData.append("id", userId);
        const response = await axios.post(`${BASE_URL}/api/update-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default {
    onSignIn,
    onSignUp,
    onGetInfo,
    changePassword,
    updateInfo,
    insertAddress,
    collectAddress,
    updateAddress,
    removeAddress,
    uploadAvatar
}