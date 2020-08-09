
import {
    ADD_TASK,
    FINISH_TASK,
    UNFINISHED,
    EDIT_TASK,
    CHANGE_TASK,
    DEl_TASK,
    ADD_NOTE,
    EDIT_NOTE,
    DEL_NOTE
} from './action-types'
import axios from 'axios'

import {reqCode,reqLogin,reqRegister,reqChangePassword} from '../api/api'
export const addTask =(taskInfo) => {
    return {
        type:ADD_TASK,
        taskInfo
    }
}
export  const finishTask = (taskId) => {

    return {
        type:FINISH_TASK,
        taskId
    }
}
export const unfinished = (taskId) => {
    return {
        type:UNFINISHED,
        taskId
    }
}
export  const editTask = (taskId) => {
    return {
        type:EDIT_TASK,
        taskId
    }
}

export  const changeTask = (taskInfo)=> {
    return {
        type:CHANGE_TASK,
        taskInfo
    }
}

export  const delTask = (taskId) => {
    return {
        type:DEl_TASK,
        taskId
    }
}

export const addNote = (noteInfo) => {
    console.log(noteInfo)
    return {
        type:ADD_NOTE,
        noteInfo
    }
}
export const editNote = (noteId) => {
    return {
        type:EDIT_NOTE,
        noteId
    }
}
export const delNote = (noteId) => {
    return {
        type:DEL_NOTE,
        noteId
    }
}

export const getIndex = () => {
    return () => {
        axios.get('/api/')
            .then(res=> {
                console.log(res)
        })
    }
}
export const getCode = (phoneNum) => {
    return async function (dispatch) {
        let params = {
            phoneNum
        };

        let res = await reqCode(params);
        return res;

    }
}
export const login = (data) => {
    return async (dispatch) => {
        let params = {
            ...data
        };
        let res = await reqLogin(params);
        return res;
        // return res;
    }
}
export const register = (data) => {
    return async (dispatch) => {
        let params = {
            ...data
        };
        let res = await reqRegister(params);
        return res;
    }
}

export const changePassword = (data) => {
    return async () => {
        let params = {
            ...data
        };
        let res = await reqChangePassword(params);
        return res;
    }
}
