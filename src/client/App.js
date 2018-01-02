import React, {Component} from 'react'

import './spinner.css';

import { get, post } from '../utils/restUtils';
import { getQueryStringValue, buildQueryString } from '../utils/windowUtils';

import LandingView from './modules/landing/landingView';

class App extends Component {

    state = {
        isLoggedIn: false,
        tweets: null
    };

    componentDidMount() {
        if (getQueryStringValue('oauth_verifier')) {
            const requestToken = window.localStorage.getItem('requestToken');
            const requestTokenSecret = window.localStorage.getItem('requestTokenSecret');
            const oauthVerifier = getQueryStringValue('oauth_verifier');
            get(`/access-token?${buildQueryString({requestToken, requestTokenSecret, oauthVerifier})}`)
                .then(({accessToken, accessTokenSecret, results}) => {
                    this.setState({
                        isLoggedIn: true,
                        accessToken,
                        accessTokenSecret
                    });
                    get(`/get-statuses?${buildQueryString({accessToken,accessTokenSecret, screenName: results.screen_name})}`).then(response => {
                        this.setState({
                            isLoggedIn: true,
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

    renderTweetsView = tweets => {
        if (!tweets) {
            return <div className='spinner'/>
        }
        return (
            <div>
                <p>
                    Total Tweets: {tweets.length}
                </p>
                <ul>
                    {
                        tweets.map((tweet, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    {tweet.tweet.text}
                                    <button
                                        onClick={this.deleteTweet.bind(this, tweet.tweet.id_str)}
                                    >
                                        DELETE
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
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
                        !isLoggedIn && <LandingView/>
                    }
                    {
                        isLoggedIn && this.renderTweetsView(tweets)
                    }
                </div>
            </div>
        );
    }
}

export default App
