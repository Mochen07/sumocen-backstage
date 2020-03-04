import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
// 引入
import thunk from 'redux-thunk'

// redux-dev-tools和redux-thunk兼容
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
// redux-dev-tools和redux-thunk兼容

// 因为这里只能写一个所以做了兼容处理
const store = createStore(reducer, enhancer);
export default store;
