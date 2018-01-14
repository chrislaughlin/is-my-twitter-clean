/* @flow */
import type {Action} from "../types/action";
import type {Session} from "../types/session";

const defaultSession = {
    accessToken: '',
    accessTokenSecret: ''
};

const session = (state:Session = defaultSession, action: Action ) => {
    switch (action.type) {
        case 'SET_SESSION':
            return {
                ...state,
                ...action.session
            };
        default:
            return state;
    }

};

export default session;