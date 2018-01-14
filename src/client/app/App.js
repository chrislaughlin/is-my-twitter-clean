/* @flow */
import * as React from 'react';

import LandingView from '../modules/landing/landingView';
import TweetView from '../modules/tweets/tweetsView';
import type {Tweet} from "../types/tweet";
import StyledApp from '../styles/app/styledApp';

type Props = {
    loggedIn: Boolean,
    tweets: Array<Tweet>,
    onDeleteTweet: Function
};

const App = (props: Props) => {
    const {
        loggedIn
    } = props;
    return (
        <StyledApp>
            <div>
                <h2>Is my Twitter clean</h2>
                {
                    !loggedIn &&
                    <LandingView
                    />
                }
                {
                    loggedIn &&
                    <TweetView/>
                }
            </div>
        </StyledApp>
    )
};

export default App;