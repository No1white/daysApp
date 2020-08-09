import {createStore,combineReducers,applyMiddleware,compose} from 'redux'


import reducer from './liefApp'

import thunk from "redux-thunk";
import {loadState} from '../utils/storageUtils' //处理localstorage函数
console.log(loadState())
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

let store = createStore(reducer,loadState(),applyMiddleware(thunk))
// let store = createStore(reducer,loadState(),applyMiddleware(thunk))


export  default  store
