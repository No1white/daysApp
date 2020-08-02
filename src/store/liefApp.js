import {combineReducers} from  'redux'
import HomeReducer from "./HomeReducer";
import NoteReducer from "./NoteReducer";
const lifeApp = combineReducers({
    HomeReducer,
    NoteReducer
})
export default lifeApp
