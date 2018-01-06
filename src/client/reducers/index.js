import { combineReducers } from 'redux';

import loggedIn from './loggedIn';
import tweets from './tweets';
import session from './session';

const reducers = combineReducers({
    loggedIn,
    tweets,
    session
});

export default reducers;
