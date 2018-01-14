import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';

import './index.css';
import AppContainer from './client/app/appContainer'
import store from './client/store';

render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.querySelector('#app')
);
