import React,{Component} from 'react'



import {InputItem, PickerView, Button, List, Checkbox} from 'antd-mobile'
import Navbar from "../../Component/Nabar/Navbar";
import store from '../../store/index'
import {addTask,editTask,changeTask} from '../../store/action'
import './AddTask.scss'


const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;
export  default class AddTask extends Component {
    constructor(props) {
        super(props);

        const taskId = this.props.location.query && this.props.location.query.taskId;
        let pathName = this.props.location.pathname.replace('/','');
        if(taskId) {
            store.dispatch(editTask(taskId))
            let editTaskInfo = store.getState().HomeReducer.editTask;
            let taskTimes = editTaskInfo.taskTime.split(':');
            let repeatTimes;
            editTaskInfo.repeatTimes.forEach(time=> {
                if(time ==7) {
                    repeatTimes = '仅一次';
                }else if(time ==8) {
                    repeatTimes ='每天'
                }else{
                    repeatTimes='自定义'
                }
            })
            this.state = {
                value:taskTimes,
                switchRepeat:false,
                taskId,
                pathName,
                taskTitle:editTaskInfo.taskTitle,
                taskContent:editTaskInfo.taskContent,
                oneChecked:true,
                allChecked:false,
                days:editTaskInfo.repeatTimes,
                daysChecked:false,
                checkedList:[false,false,false,false,false,false,false],
                editFlag:true,
                finished:editTaskInfo.finished
            }
        }else {
            let date1 = new Date();
            let hour = date1.getHours()<10?'0'+date1.getHours():''+date1.getHours();
            let minute = date1.getMinutes()<10?'0'+date1.getMinutes():''+date1.getMinutes();
            this.state = {
                value:[hour,minute],
                switchRepeat:false,
                pathName,
                taskTitle:'',
                taskContent:'',
                repeatTimes:'',
                oneChecked:true,
                allChecked:false,
                days:[],
                daysChecked:false,
                checkedList:[false,false,false,false,false,false,false],
                repeatTime:'仅一次',
                editFlag:false,
                finished:false
            }

        }


    }
    //处理选择重复次数
    onChange = (value) => {
        console.log(value)
        if(value ==7) {  //判断是否选择仅一次
            let checkedList =[false,false,false,false,false,false,false]
            this.setState({
                oneChecked:!this.state.oneChecked,
                allChecked:false,
                checkedList,
                repeatTime:'仅一次', //设置repeattime标签显示
                days:[7]
            })
            this.switchRepeat()

        }else if(value==8) { //判断是否选择每天
            let checkedList =[false,false,false,false,false,false,false]
            this.setState({
                oneChecked:false,
                allChecked:!this.state.allChecked,
                checkedList,
                repeatTime:'每天',
                switchRepeat:true,
                days:[8]
            })
            this.switchRepeat()
        }else {  //处理自定义
            let arr = this.state.days;
            console.log(arr.indexOf(value))
            if(arr.indexOf(value) ==-1) {
                arr.push(value)
            }else {
                arr =arr.filter(item=> item!=value)
            }
            let checkedList =this.state.checkedList;
            checkedList[value] = !checkedList[value];
            this.setState({
                oneChecked:false,
                allChecked:false,
                checkedList:checkedList,
                days:arr,
                repeatTime:'自定义'
            });
        }
    }

    //处理用于显示选择重复次数的界面
    switchRepeat = () => {
        this.setState({
            switchRepeat:!this.state.switchRepeat
        })
    }
    onScrollChange = (value) => {
        this.setState({
            value
        })
    }

    //绑定title输入框的change事件
    handleTaskTitleChange = (event) => {
        this.setState({
            taskTitle:event
        })
    }
    handleTaskContentChange = (e) => {
        this.setState({
            taskContent:e
        })
    }
    //生成时间列表
    generateTime = () =>{
        let hour = [];
        let minute =[];
        for(let i=0;i<24;i++) {
            if(i<10) {
                hour.push({label:'0'+i,value:'0'+i});
            }else {
                hour.push({label:""+i,value:""+i});
            }
        }
        for(let i=0;i<=60;i++) {
            if(i<10) {
                minute.push({label:'0'+i,value:'0'+i});
            }else {
                minute.push({label:""+i,value:""+i});
            }
        }
        return [hour,minute];
    }
    //处理保存时间
    handleSaveTask = () => {
        let repeatTimes =[];
        if(this.state.allChecked) {
            repeatTimes.push(8)
        }
        if(this.state.oneChecked) {
            repeatTimes.push(7);
        }else {
            repeatTimes=this.state.days
        }
        let taskInfo = {
            taskId:this.state.taskId && this.state.taskId,
            taskTime:this.state.value[0]+':'+this.state.value[1],
            taskTitle:this.state.taskTitle,
            taskContent:this.state.taskContent,
            repeatTimes:repeatTimes,
            finished:this.state.finished
        }
        //判断是否是修改
        if(this.state.editFlag) {//执行修改
            store.dispatch(changeTask(taskInfo))
        }else {//执行添加任务
            store.dispatch(addTask(taskInfo))

        }
        this.props.history.push('/')
    }
    render() {
        const data = [
            { value: 0, label: '周日' },
            { value: 1, label: '周一' },
            { value: 2, label: '周二' },
            { value: 3, label: '周三' },
            { value: 4, label: '周四' },
            { value: 5, label: '周五' },
            { value: 6, label: '周六' },
        ];
        const timeData = this.generateTime();

        return (
            <div className={'addTaskContainer'}>
                <Navbar pathName={this.state.pathName} onSave={this.handleSaveTask}></Navbar>
                <PickerView
                    onChange={this.onChange}
                    onScrollChange={this.onScrollChange}
                    value={this.state.value}
                    data={timeData}
                    cascade={false}
                />
                <InputItem placeholder={'请输入主题'} className={'taskTitle'} onChange={this.handleTaskTitleChange} value={this.state.taskTitle}>标题</InputItem>
                <div className="taskList">
                    <InputItem placeholder={'请输入任务内容'} className={'taskContent'} onChange={this.handleTaskContentChange} value={this.state.taskContent}>任务内容</InputItem>
                    {/*<Button ><span className={'iconfont icon-jiahao'}></span>添加更多任务</Button>*/}
                </div>
                <div className={'repeat'}>
                    <h4 className={'repeatTitle'}>重复设置</h4>
                    <h4 className={'repeatTime'} onClick={this.switchRepeat}>{this.state.repeatTime}<span className={'iconfont icon-jiantou1'}></span></h4>
                </div>

                <div className={`selfCheckContianer ${this.state.switchRepeat?'showEle':'hideEle'}`}>
                    <div className={'list'}>
                        <List >
                            <Item>重复设置</Item>
                            <CheckboxItem checked={this.state.oneChecked}  onChange={()=>this.onChange(7)}  >
                                仅一次
                            </CheckboxItem>
                            <CheckboxItem checked={this.state.allChecked} onChange={()=>this.onChange(8)}  >
                                每天
                            </CheckboxItem>
                            <Item>自定义</Item>
                            {data.map(i => (
                                <CheckboxItem key={i.value} checked={this.state.checkedList[i.value]} onChange={() => this.onChange(i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}

                        </List>

                    </div>
                    <div className={'mask'} onClick={this.switchRepeat}></div>
                </div>
                <div className={'labels'}>
                    <h4 className={'labelTitle'}>标签</h4>
                    <h4 className={'label'}><span className={'iconfont icon-jiantou1'}></span></h4>
                </div>
            </div>
        )
    }
}
