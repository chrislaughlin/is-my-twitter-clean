/* @flow */
const setItem = (key: string, value: string) => window.localStorage.setItem(key, value);
const getItem = (key: string) => window.localStorage.getItem(key);

export const setRequestToken = (requestToken: string) => setItem('requestToken', requestToken);
export const setRequestTokenSecret = (requestTokenSecret: string) => setItem('requestTokenSecret', requestTokenSecret);

export const getRequestToken = () => getItem('requestToken');
export const getRequestTokenSecret = () => getItem('requestTokenSecret');