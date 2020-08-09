import {
    ADD_TASK,
    FINISH_TASK,
    UNFINISHED,
    EDIT_TASK,
    CHANGE_TASK,
    DEl_TASK,

} from './action-types'
import {unfinished} from "./action";

const initState = {
    editTask:{},
    // showNavBar:false,
    taskList:[
        {
            taskId:1,
            taskTime:'09:00',
            taskTitle:'每天',
            taskContent:'每天值为8',
            repeatTimes:[8], //0-6表示周一到周日 7代表仅一次  8代表每天
            finished:false,
            finishedTime:''
        },
        {
            taskId:2,
            taskTime:'10:00',
            taskTitle:'仅一次',
            taskContent:'值为7',
            repeatTimes:[7],
            finished:false,
            finishedTime:''
        },
        {
            taskId:3,
            taskTime:'10:30',
            taskTitle:'周日',
            taskContent:'周日为0',
            repeatTimes:[0],
            finished:false,
            finishedTime:''
        },
        {
            taskId:4,
            taskTime:'14:00',
            taskTitle:'周一',
            taskContent:'值为1',
            repeatTimes:[1],
            finished:false,
            finishedTime:''
        },
        {
            taskId:5,
            taskTime:'14:00',
            taskTitle:'周二',
            taskContent:'值为2',
            repeatTimes:[2],
            finished:false,
            finishedTime:''
        },
        {
            taskId:6,
            taskTime:'14:00',
            taskTitle:'周三',
            taskContent:'值为3',
            repeatTimes:[3],
            finished:false,
            finishedTime:''
        },
        {
            taskId:7,
            taskTime:'14:00',
            taskTitle:'周4',
            taskContent:'值为4',
            repeatTimes:[4],
            finished:false,
            finishedTime:''
        },
        {
            taskId:8,
            taskTime:'14:00',
            taskTitle:'周5',
            taskContent:'值为5',
            repeatTimes:[5],
            finished:false,
            finishedTime:''
        },
        {
            taskId:9,
            taskTime:'14:00',
            taskTitle:'周6',
            taskContent:'值为6',
            repeatTimes:[6],
            finished:false,
            finishedTime:''
        }
    ],
    historyTasks: [
        {
            taskId:5,
            taskTime:'9:00',
            taskTitle:'倒计时',
            taskContent:'学习react',
            repeatTimes:[8], //0-6表示周一到周日 7代表仅一次  8代表每天
            finishedTime:'2020-7-27',
            finished:true,
        },
        {
            taskId:6,
            taskTime:'10:00',
            taskTitle:'倒计时',
            taskContent:'学习react',
            repeatTimes:[8], //0-6表示周一到周日 7代表仅一次  8代表每天
            finishedTime:'2020-7-27',
            finished:true,
        },
        {
            taskId:7,
            taskTime:'10:00',
            taskTitle:'倒计时',
            taskContent:'学习react',
            repeatTimes:[8], //0-6表示周一到周日 7代表仅一次  8代表每天
            finishedTime:'2020-7-26',
            finished:true,
        },
        {
            taskId:8,
            taskTime:'10:00',
            taskTitle:'倒计时',
            taskContent:'学习react',
            repeatTimes:[8], //0-6表示周一到周日 7代表仅一次  8代表每天
            finishedTime:'2020-7-26',
            finished:false,
        }
    ]
}
//比较时间函数
function compareTime(date1,date2){
    let time1 = date1.split(':'); // ['10','30']
    let time2 = date2.split(':');  // ['11','20']
    let date = new Date();

    if(parseInt(time1[0]) < parseInt(time2[0])) {
        return true;
    }else if(parseInt(time1[0]) == parseInt(time2[0])){
        if(parseInt(time1[1]) < parseInt(time2[1])) {
            return true;
        }else {
            return false;
        }
    }
}
//插入任务处理
function insertTask(state,taskInfo) {
    let insertIndex = -1;

    console.log(state.taskList.length)
    if(state.taskList.length<=0) {
        taskInfo.taskId = 0;
    }else {
        taskInfo.taskId = state.taskList[state.taskList.length-1].taskId+1
    }


        state.taskList.forEach((task, index)=> {

            if(compareTime(task.taskTime,taskInfo.taskTime)){
                insertIndex = index;

            }
        })
        //如果是每天或者星期则改变finished为true
        state.taskList.splice(insertIndex+1,0,taskInfo)


    return state;
}
function finishTask(state,taskId) {
    let taskIndex = -1;
    state.taskList.forEach((task,index) => {
        if(task.taskId ==taskId) {
            taskIndex = index;
        }
    })
    let taskInfo = state.taskList[taskIndex];
    console.log(taskInfo)

    //如果是每天要设置 finished为false
    if(taskInfo.repeatTimes.indexOf(7)!=-1) {
        //如果是仅一次 直接加入history 从taskList删除
        console.log("仅一次")
        let date = new Date();
        let finishedTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        taskInfo.finished = true;
        taskInfo.finishedTime = finishedTime;
        state.historyTasks.push(taskInfo);
        state.taskList.splice(taskIndex,1);


    }else {
        //如果是每天 获取星期 完成后设置时间 每次开启如果与今天时间不符将finished设置为false
        state.taskList[taskIndex].finished = true;
        let date = new Date();
        let finishedTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        state.taskList[taskIndex].finishedTime = finishedTime;
        state.historyTasks.push(state.taskList[taskIndex]);
    }
    // taskInfo.finished = true;
    // let date = new Date();
    // let finishedTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    // taskInfo.finishedTime = finishedTime;




    return state;
}
function unfinishedTask(state,taskId) {
    let taskIndex = -1;
    console.log("未完成")
    state.historyTasks.forEach((task,index) => {
        if(task.taskId ==taskId) {
            taskIndex = index;
        }
    })
    //这里如果是仅一次就插入 如果不是则改变finished
    let taskInfo = state.historyTasks[taskIndex];
    if(taskInfo.repeatTimes.indexOf(7)!==-1) {
        console.log("仅一次")
        taskInfo.finished = false;
        delete taskInfo.finishedTime;
        state = insertTask(state,taskInfo);

        state.historyTasks.splice(taskIndex,1);
    }else {
        state.historyTasks.splice(taskIndex,1);
        state.taskList.forEach((task,index)=> {
            if(task.taskId === taskInfo.taskId) {
                taskIndex=index;
            }
        })

        state.taskList[taskIndex].finished=false;
    }
    console.log(taskInfo)


    return state;
}
function findTaskById(state,taskId) {
    let taskIndex = -1;
    state.taskList.forEach((task,index) => {
        if(task.taskId === taskId) {
            taskIndex = index;
        }
    })

    if(taskIndex !=-1) {

        state.editTask = state.taskList[taskIndex];
        return state;
    }

    state.historyTasks.forEach((task,index) => {
        if(task.taskId === taskId) {
            taskIndex = index;
        }
    })
    if(taskIndex !=-1) {
       state.editTask = state.historyTasks[taskIndex];
       return state;
    }


}
function  changeTask(state,taskInfo) {
    let taskIndex = -1;

    state.taskList.forEach((task,index )=> {
        if(task.taskId ==taskInfo.taskId) {
            taskIndex = index;
        }
    })
    if(taskIndex !=-1) {
        state.taskList[taskIndex] =taskInfo
        return state;
    }
    state.historyTasks.forEach((task,index )=> {
        if(task.taskId ==taskInfo.taskId) {
            taskIndex = index;
        }
    })
    if(taskIndex !=-1) {
        state.historyTasks[taskIndex] =taskInfo
        return state;
    }


}
function delTask(state,taskId) {
    let taskIndex = -1;
    state.taskList.forEach((task,index )=> {
        if(task.taskId ==taskId) {
            taskIndex = index;
        }
    })
    if(taskIndex !=-1) {

        state.taskList.splice(taskIndex,1);

        return state;

    }
    state.historyTasks.forEach((task,index )=> {
        if(task.taskId ==taskId) {
            taskIndex = index;
        }
    })
    if(taskIndex !=-1) {
        state.historyTasks.splice(taskIndex,1);
        return state;
    }

}
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // ...错误处理
    }
};
export default function(state =initState,action){
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_TASK:
            console.log(action.taskInfo)
            newState = insertTask(newState,action.taskInfo)

            saveState(newState);
            return newState;
            break;
        case FINISH_TASK:
            newState = JSON.parse(JSON.stringify(state));
            newState = finishTask(newState,action.taskId);
            saveState(newState);
            return newState;
            break;
        case UNFINISHED:
            newState = JSON.parse(JSON.stringify(state));
            newState = unfinishedTask(state,action.taskId);
            saveState(newState);
            return newState;
            break;
        case EDIT_TASK:
            newState = JSON.parse(JSON.stringify(state));
            newState = findTaskById(state,action.taskId);
            saveState(newState);

            return newState;
        case CHANGE_TASK:
            newState = JSON.parse(JSON.stringify(state));
            newState = changeTask(state,action.taskInfo);
            saveState(newState);
            return newState;
        case DEl_TASK:
            newState = JSON.parse(JSON.stringify(state));
            newState = delTask(state,action.taskId);
            saveState(newState);
            return newState;
    }
    return state;
}
