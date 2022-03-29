import axiosInstance from '../../axios';
import { API_URL } from '../../utils/constants';

const subscribeNewsletter = (email) => {
    return axiosInstance.post(API_URL + "/subscribe/", {
        email
    })
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    subscribeNewsletter
}