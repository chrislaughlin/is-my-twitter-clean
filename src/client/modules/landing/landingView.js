import React from 'react';

import LoginWithTwitter from './loginWithTwitter';
import {get} from "../../utils/restUtils";
import {
    setRequestToken,
    setRequestTokenSecret
} from '../../utils/localStorageUtils';
import { setWindowLocation } from '../../utils/windowUtils';


const onUserAuthClicked = () => {
    get('/request-token').then(({requestToken, requestTokenSecret}) => {
        setRequestToken(requestToken);
        setRequestTokenSecret(requestTokenSecret);
        setWindowLocation(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
    });
};


const LandingView = () => {
    return (
        <LoginWithTwitter
            onUserAuthClicked={onUserAuthClicked}
        />
    );
};

export default LandingView;
