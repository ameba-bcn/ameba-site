import axiosInstance from './../../axios';

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const subscribeNewsletter = (email) => {
    return axiosInstance.post(API_URL + "/subscribe/", {
        email
    })
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    subscribeNewsletter
}