import React, {Component} from 'react'

import './App.css';
import {get} from './utils/restUtils';
import { getQueryStringValue, buildQueryString } from './utils/windowUtils';

class App extends Component {

    componentDidMount() {
        if (getQueryStringValue('oauth_verifier')) {
            const requestToken = window.localStorage.getItem('requestToken');
            const requestTokenSecret = window.localStorage.getItem('requestTokenSecret');
            const oauthVerifier = getQueryStringValue('oauth_verifier');
            get(`/access-token?${buildQueryString({requestToken, requestTokenSecret, oauthVerifier})}`)
                .then(({error, accessToken, accessTokenSecret, results}) => {
                    console.log({error, accessToken, accessTokenSecret, results});
                    get(`/get-statuses?${buildQueryString({accessToken,accessTokenSecret, screenName: results.screen_name})}`).then(response => {
                        console.log(response);
                    })
            })
        }

    }
    onButtonClicked = () => {
        get('/twitter-test').then(({requestToken, requestTokenSecret}) => {
            window.localStorage.setItem('requestToken', requestToken);
            window.localStorage.setItem('requestTokenSecret', requestTokenSecret);
            window.location = `https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`;
        })
    };

    render() {
        return <div className="App">
            <div className="App-heading App-flex">
                <h2>Is my Twitter clean</h2>
                <button
                    onClick={this.onButtonClicked}
                >
                    TEST
                </button>
            </div>
            <h3>Coming soon...</h3>
        </div>
    }
}

export default App
