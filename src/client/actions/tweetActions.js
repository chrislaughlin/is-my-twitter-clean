/* @flow */
import type {Tweet} from "../types/tweet";

export const setTweets = (tweets: Array<Tweet>) => {
    return {
        type: 'SET_TWEETS',
        tweets
    };
};