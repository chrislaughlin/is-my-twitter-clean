/* @flow */
import * as React from 'react';

import LandingView from '../modules/landing/landingView';
import TweetView from '../modules/tweets/tweetsView';
import type {Tweet} from "../types/tweet";

type Props = {
    loggedIn: Boolean,
    tweets: Array<Tweet>,
    onDeleteTweet: Function
};

const App = (props: Props) => {
    const {
        loggedIn,
        tweets,
        onDeleteTweet
    } = props;
    return (
        <div>
            <div>
                <h2>Is my Twitter clean</h2>
                {
                    !loggedIn &&
                    <LandingView
                    />
                }
                {
                    loggedIn &&
                    <TweetView
                        tweets={tweets}
                        deleteTweet={onDeleteTweet}
                    />
                }
            </div>
        </div>
    )
};

export default App;