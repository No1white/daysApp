
import {saveNote} from '../utils/storageUtils'
import {ADD_NOTE,EDIT_NOTE,DEL_NOTE} from './action-types'
const initState = {
   noteList:[
       {
           noteId:1,
           noteTitle:'NoteText',
           noteContent:'noteContent',
           recordTime:'2020/7/31'
       },
       {
           noteId:2,
           noteTitle:'NoteText',
           noteContent:'noteContent',
           recordTime:'2020/7/31'
       }
   ]
}

//添加笔记
function addNote(state,noteInfo) {
    console.log(noteInfo)
    if(noteInfo.noteId == '') {
        let noteId;
        if(state.noteList.length<=0) {
            noteId = 0;
        }else {
            noteId = state.noteList[state.noteList.length-1].noteId+1;
        }

        noteInfo.noteId = noteId;
        state.noteList.push(noteInfo);
    }else {

        state.noteList.forEach((note,index) => {
            if(note.noteId === noteInfo.noteId) {
                state.noteList[index] = noteInfo;
            }
        })
        console.log(state)
        return state;
    }
    return state;

}
function delNote(state,noteId) {
    state.noteList.forEach((note,index) => {
        if(note.noteId === noteId) {
            state.noteList.splice(index,1);
        }
    })
    return state;
}
export  default  function (state =initState,action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_NOTE:
            newState = JSON.parse(JSON.stringify(state));
            newState = addNote(state,action.noteInfo)
            // newState.noteList,push(action.noteInfo)
            console.log(newState)
            return newState;
        case DEL_NOTE:
            newState = JSON.parse(JSON.stringify(state));
            newState = delNote(state,action.noteId);
            return newState
    }

    return state;
}
