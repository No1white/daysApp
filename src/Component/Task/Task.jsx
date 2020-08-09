import React,{Component} from 'react'


import {SegmentedControl, WingBlank,  Modal} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import history from "../../utils/history";

import {finishTask,unfinished,delTask} from '../../store/action'
import './Task.scss'
import store from '../../store/index'

const switchMusic = require('../../assets/audio/taskMusic.mp3')
const operation = Modal.operation;//确认框
class Task extends Component {
    constructor(props) {
        super(props);
        let taskList = this.filterTaskList(store.getState().HomeReducer.taskList);
        // let taskList = store.getState().HomeReducer.taskList;
        this.state = {
            taskList,
            showList:true,
            selectedIndex:0,
            playMuic:false
        }
         store.subscribe(this.handleStateChange)


    }
    componentWillUnmount() {
        this.setState = ()=>false;
    }

    handleStateChange = () => {
        // this.setState({
        //     taskList:this.filterTaskList(store.getState().HomeReducer.taskList)
        // })
        if(this.state.selectedIndex == 0) {
            this.setState({
                showList:true,
            })
            this.taskListChange();
        }else {
            this.setState({
                showList:false,
            })
            this.showHistoryList(store.getState().HomeReducer.historyTasks);
        }
    }

    //显示历史
    showHistoryList = (historyTasks) => {
        let date = new Date();
        let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        let date1 = new Date(today);

        let newHistoryTaks =historyTasks.filter((task) => {
            let date2 = new Date(task.finishedTime);
           if(date1.getTime() === date2.getTime() && task.finished ==true) {
              return task;
           }
        })
        this.setState({
            taskList:newHistoryTaks
        })
    }
    //筛选今天需要完成的任务
    filterTaskList = (taskList) => {
        let date = new Date();

        taskList =taskList.filter(item=>{
            let flag = false;
            if(item.finished === false) {
                item.repeatTimes.forEach(time=> {
                    if(time ==date.getDay() || time == 7 || time == 8 ) {
                        flag = true;
                    }
                })
            }
            if(flag) {
                return item;
            }
        })
        return taskList;
    }
    //用于比较是否是上午还是下午
    compareTime = (date1,date2) => {
        let str1 = date1.substr(0,2).replace(':','');
        let str2 = date2.substr(0,2).replace(':','');
        if(parseInt(str1)<parseInt(str2)) {
            return true;
        }else {
            return false;
        }
    }
    //处理任务完成函数
    handleFinished = (taskId,e) => {
        this.refs.music.play()
        console.log(this.state.selectedIndex)
        this.setState({
            playMuic:true
        })
        if(this.state.showList) {
            store.dispatch(finishTask(taskId))
        }else {
            store.dispatch(unfinished(taskId))
        }

    }
    //当store.state发生改变后执行的回调函数
    taskListChange = () => {
        // this.setState({
        //     taskList:store.getState.taskList
        // })
        let taskList = this.filterTaskList(store.getState().HomeReducer.taskList)
        this.setState({
            taskList
        })

    }
    //未完成和已完成 改变处理事件
    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        if(e.nativeEvent.selectedSegmentIndex == 0) {
            this.setState({
                showList:true,
                selectedIndex:e.nativeEvent.selectedSegmentIndex
            })
            this.taskListChange();
        }else {
            this.setState({
                showList:false,
                selectedIndex:e.nativeEvent.selectedSegmentIndex
            })
            this.showHistoryList(store.getState().HomeReducer.historyTasks);
        }
    }
    //touch事件开始  处理长按事件
    handleTouchStart = (taskId,e) => {

        console.log("点击开始")
        let that = this; //保存this
        this.timeOutEvent = setTimeout(function() {
            this.timeOutEvent = 0;
            console.log("长按")
            operation([
                { text: '编辑待办事项', onPress: () =>{that.editTask(taskId);
                        console.log("点击了编辑")} },
                { text: '删除待办事项', onPress: () =>{that.delTask(taskId)}},
            ])
        }, 500);
    }
    delTask = (taskId) => {
        store.dispatch(delTask(taskId));
    }
    editTask = (taskId) => {

        // const history = useHistory();

        this.props.history.push({
            pathname:'add_task',
            query:{
                taskId:taskId
            }
        });
        // this.props.location.push('/add_task')
    }
    handleTouchEnd = () => {
        console.log('你点击了');
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent != 0) {

            console.log('你点击了');
        }
        return false;
    }
    handleTouchMove = (e) => {
        console.log("点击移动")
        console.log(e)
        e.preventDefault();
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
    }
    render() {
        return (
            <div className={'taskContainer'}>
                <div className={'divide'} ></div> {/*分割线*/}
                <audio src={switchMusic} ref={'music'}></audio>

                {/*循环显示任务*/}
                <div className="taskList">
                    {
                        this.state.taskList.map((task,index) => {
                            return (
                                <div className="taskItem" key={index}
                                     >

                                    <div className="time"
                                         onTouchStart={(e)=> {this.handleTouchStart(task.taskId,e)}}
                                         onTouchMove={(e)=> {this.handleTouchMove(e)}}
                                         onTouchEnd={this.handleTouchEnd}>
                                        <p>{this.compareTime(task.taskTime,'12:00')?'上午'+task.taskTime:'下午'+task.taskTime}</p>
                                    </div>
                                    <div className="taskIcon" onClick={(e)=>this.handleFinished(task.taskId,e)}>
                                        <span className={`iconfont ${task.finished?'icon-fuxuankuang1':'icon-fuxuankuang'}`}></span>
                                    </div>
                                    <div className="taskInfo"
                                         onTouchStart={(e)=> {this.handleTouchStart(task.taskId,e)}}
                                         onTouchMove={(e)=> {this.handleTouchMove(e)}}
                                         onTouchEnd={this.handleTouchEnd}>
                                        <div className={'taskTitleWrap'}>
                                            <p className="taskTitle">{task.taskTitle}</p>
                                        </div>
                                        <p className={'taskName'}>{task.taskContent}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/*底部 未完成和已完成按钮*/}
                <div className={'btnGroup'}>
                    <WingBlank className={'btnWrap'}>
                        <SegmentedControl className={'btn'}   tintColor={'#87b44e'} values={['未完成', '已完成']} selectedIndex={this.state.selectedIndex} onChange={this.onChange}></SegmentedControl>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export  default withRouter(Task)
