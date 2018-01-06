import axios from 'axios';

export const get = url => {
    return axios.get(url).then(({data}) => {
        return data;
    }).catch(error => console.error(error))
};

export const post = (url, toSend) => {
    return axios.post(url, toSend).then(({data}) => {
        return data;
    }).catch(error => console.error(error))
};