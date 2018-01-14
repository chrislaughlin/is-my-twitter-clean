/* @flow */
import type {Action} from "../types/action";
import type {Tweet} from "../types/tweet";

type State = {
    tweets: Array<Tweet>,
    isLoading: Boolean
};

const initialState = {
    tweets: [],
    isLoading: true
};

const tweets = (state:State = initialState, action: Action ) => {
    switch (action.type) {
        case 'SET_TWEETS':
            return {
                ...state,
                tweets: action.tweets,
                isLoading: false
            };
        case 'DELETE_TWEET':
            return {
                ...state,
                tweets: state.tweets.filter(({tweet: {id_str}}) => id_str !== action.uuid)
            };
        default:
            return state;
    }
};

export default tweets;