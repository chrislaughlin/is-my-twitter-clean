import * as React from 'react';
import { connect } from 'react-redux';

import { get, post } from './../utils/restUtils';
import { getQueryStringValue, buildQueryString } from './../utils/windowUtils';
import {
    getRequestToken,
    getRequestTokenSecret
} from './../utils/localStorageUtils';

import App from './App';

import * as sessionActions from './../actions/sessionActions';
import * as loggedInActions from './../actions/loggedInActions';
import * as tweetActions from './../actions/tweetActions';

class AppContainer extends React.Component {

    componentDidMount() {
        if (getQueryStringValue('oauth_verifier')) {
            this.props.onIsLoggedIn(true);
            const requestToken = getRequestToken();
            const requestTokenSecret = getRequestTokenSecret();
            const oauthVerifier = getQueryStringValue('oauth_verifier');
            get(`/access-token?${buildQueryString({requestToken, requestTokenSecret, oauthVerifier})}`)
                .then(({accessToken, accessTokenSecret, results}) => {
                    this.props.onHasAuth(
                        accessToken,
                        accessTokenSecret
                    );
                    get(`/get-statuses?${buildQueryString({accessToken,accessTokenSecret, screenName: results.screen_name})}`).then(response => {
                        this.props.onHasTweets(response.tweets);
                    })
                })
        } else {
            this.props.onIsLoggedIn(false);
            localStorage.clear();
        }

    }

    render() {
        const {
            loggedIn
        } = this.props;
        return <App
                loggedIn={loggedIn}
                />;
    }
}

const mapStateToProps = ({session, loggedIn, tweets}) => {
    return {session, loggedIn, tweets};
};

const mapDispatchToProps = dispatch => {
    return {
        onHasAuth: (accessToken, accessTokenSecret) => {
            dispatch(sessionActions.setSession({accessToken, accessTokenSecret}));
        },
        onIsLoggedIn: (isLoggedIn) => {
            dispatch(loggedInActions.setLoggedOn(isLoggedIn));
        },
        onHasTweets: (tweets) => {
            dispatch(tweetActions.setTweets(tweets));
        },
        onDeleteTweet: (uuid) => {
            dispatch(tweetActions.deleteTweet(uuid));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);