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
                    this.props.onHasAuth({
                        accessToken,
                        accessTokenSecret
                    });
                    get(`/get-statuses?${buildQueryString({accessToken,accessTokenSecret, screenName: results.screen_name})}`).then(response => {
                        this.props.onHasTweets({
                            tweets: response.tweets
                        });
                    })
                })
        } else {
            this.props.onIsLoggedIn(false);
            localStorage.clear();
        }

    }

    deleteTweet = uuid => {
        const {
            session: {
                accessToken,
                accessTokenSecret
            }
        } = this.props;

        post(
            '/delete-tweet',
            {
                uuid: uuid,
                accessToken,
                accessTokenSecret
            }
        ).then(response => console.log(response));
    };

    render() {
        const {
            loggedIn,
            tweets
        } = this.props;
        return <App
                loggedIn={loggedIn}
                tweets={tweets}
                onDeleteTweet={this.deleteTweet}
                />;
    }
}

const mapStateToProps = ({session, loggedIn, tweets}) => {
    return {session, loggedIn, tweets};
};

const mapDispatchToProps = dispatch => {
    return {
        onHasAuth: (requestToken, requestTokenSecret) => {
            dispatch(sessionActions.setSession({requestToken, requestTokenSecret}));
        },
        onIsLoggedIn: (isLoggedIn) => {
            dispatch(loggedInActions.setLoggedOn(isLoggedIn));
        },
        onHasTweets: (tweets) => {
            dispatch(tweetActions.setTweets(tweets));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);