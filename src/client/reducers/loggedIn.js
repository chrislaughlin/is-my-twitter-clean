/* @flow */
import type {Action} from "../types/action";

const loggedIn = (state:boolean = false, action: Action ) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return action.loggedIn
    }
    return state;
};

export default loggedIn;