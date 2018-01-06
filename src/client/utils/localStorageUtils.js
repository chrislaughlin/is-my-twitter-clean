const setItem = (key, value) => window.localStorage.setItem(key, value);
const getItem = key => window.localStorage.getItem(key);

export const setRequestToken = requestToken => setItem('requestToken', requestToken);
export const setRequestTokenSecret = requestTokenSecret => setItem('requestTokenSecret', requestTokenSecret);

export const getRequestToken = () => getItem('requestToken');
export const getRequestTokenSecret = () => setItem('requestTokenSecret');