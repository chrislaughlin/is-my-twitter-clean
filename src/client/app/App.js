/* @flow */
import * as React from 'react';

import LandingView from '../modules/landing/landingView';
import TweetView from '../modules/tweets/tweetsView';
import type {Tweet} from "../types/tweet";
import StyledApp from '../styles/app/styledApp';
import StyledAppTitle from "../styles/app/styledAppTitle";

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
                <StyledAppTitle>
                    Is my Twitter clean
                </StyledAppTitle>
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