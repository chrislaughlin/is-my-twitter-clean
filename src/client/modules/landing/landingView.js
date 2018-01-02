import React, { PureComponent } from 'react';

import LoginWithTwitter from './loginWithTwitter';
import {get} from "../../../utils/restUtils";

class LandingView extends PureComponent {

    onUserAuthClicked = () => {
        get('/request-token').then(({requestToken, requestTokenSecret}) => {
            window.localStorage.setItem('requestToken', requestToken);
            window.localStorage.setItem('requestTokenSecret', requestTokenSecret);
            window.location = `https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`;
        })
    };

    render() {
        return (
            <LoginWithTwitter
                onUserAuthClicked={this.onUserAuthClicked}
            />
        );
    }

}

export default LandingView;
