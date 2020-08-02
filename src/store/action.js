
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
