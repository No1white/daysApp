import HomeReducer from "../store/HomeReducer";
import NoteReducer from "../store/NoteReducer";

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // ...错误处理
    }
}
export const loadState = () => {
    try { // 也可以容错一下不支持localStorage的情况下，用其他本地存储
        const serializedState = localStorage.getItem('state');
        const serializedNote =  localStorage.getItem('note');


        if (serializedState === null ) {
            let note = JSON.parse(serializedNote);
            return {
                HomeReducer:{
                    taskList:[],
                    historyTasks:[],
                    editTask:{}
                },
                NoteReducer:{
                    NoteReducer:note
                }
            };
        } else if ( serializedNote ===null) {
            let state = JSON.parse(serializedState);
            return {
                HomeReducer:state,
                NoteReducer:{
                    noteList:[]
                }
            };
        } else {
            let state = JSON.parse(serializedState);
            let note = JSON.parse(serializedNote);
            console.log(state)
            let date = new Date();
            let timeStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            let date1 = new Date(timeStr);
            state.taskList.forEach(task => {
                if(task.finishedTime) {
                    let date2 = new Date(task.finishedTime);
                    console.log(date1.getTime() != date2.getTime())
                    if(date1.getTime() != date2.getTime()) {
                        task.finished = false;
                    }

                }
            })
           return {
               HomeReducer:state,
               NoteReducer:note
           }
        }
    } catch (err) {
        // ... 错误处理
        return undefined;
    }
}

export const saveNote = (note) => {
    try {
        const serializedState = JSON.stringify(note);
        localStorage.setItem('note', serializedState);
    } catch (err) {
        // ...错误处理
    }
}
