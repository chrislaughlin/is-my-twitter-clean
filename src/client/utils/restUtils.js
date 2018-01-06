/* @flow */
import axios from 'axios';

export const get = (url: string) => {
    return axios.get(url).then(({data}) => {
        return data;
    }).catch(error => console.error(error))
};

export const post = (url: string, toSend: Object) => {
    return axios.post(url, toSend).then(({data}) => {
        return data;
    }).catch(error => console.error(error))
};