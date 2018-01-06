/* @flow */
export const setLoggedOn = (isLoggedIn: boolean) => {
    return {
        type: 'LOGGED_IN',
        loggedIn: isLoggedIn
    };
};