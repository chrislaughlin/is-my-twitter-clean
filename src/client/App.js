/* @flow */
import React, { Component } from 'react';

import { get, post } from './utils/restUtils';
import { getQueryStringValue, buildQueryString } from './utils/windowUtils';
import {
    getRequestToken,
    getRequestTokenSecret
} from './utils/localStorageUtils';

import LandingView from './modules/landing/landingView';
import TweetView from './modules/tweets/tweetsView';

export type Props = {};

class App extends Component {
    props: Props;

    state = {
        isLoggedIn: getQueryStringValue('oauth_verifier'),
        tweets: null
    };

    componentDidMount() {
        if (getQueryStringValue('oauth_verifier')) {
            const requestToken = getRequestToken();
            const requestTokenSecret = getRequestTokenSecret();
            const oauthVerifier = getQueryStringValue('oauth_verifier');
            get(`/access-token?${buildQueryString({requestToken, requestTokenSecret, oauthVerifier})}`)
                .then(({accessToken, accessTokenSecret, results}) => {
                    this.setState({
                        accessToken,
                        accessTokenSecret
                    });
                    get(`/get-statuses?${buildQueryString({accessToken,accessTokenSecret, screenName: results.screen_name})}`).then(response => {
                        this.setState({
                            tweets: response.tweets
                        });
                    })
            })
        } else {
            localStorage.clear();
        }

    }

    deleteTweet = uuid => {
        const {
            accessToken,
            accessTokenSecret
        } = this.state;

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
            isLoggedIn,
            tweets
        } = this.state;
        return (
            <div>
                <div>
                    <h2>Is my Twitter clean</h2>
                    {
                        !isLoggedIn &&
                            <LandingView
                            />
                    }
                    {
                        isLoggedIn &&
                            <TweetView
                                tweets={tweets}
                                deleteTweet={this.deleteTweet}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default App