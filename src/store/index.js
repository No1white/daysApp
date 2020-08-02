import {createStore,combineReducers} from 'redux'

import action from './action'
import reducer from './liefApp'
import NoteReducer from "./NoteReducer";
import HomeReducer from "./HomeReducer";
import {loadState} from '../utils/storageUtils' //处理localstorage函数

// let store = createStore(reducer, loadState())
let store = createStore(reducer,loadState(),window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__())

// const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__());

export  default  store
