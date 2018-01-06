import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';

import App from './client/App'
import store from './client/store';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);
