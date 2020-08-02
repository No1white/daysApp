import React from 'react'
import {Link} from 'react-router-dom'

import Task from "../../Component/Task/Task";
import FooterBar from "../../Component/FooterBar/FooterBar";
import store from '../../store/index'

import './Home.scss'
import Navbar from "../../Component/Nabar/Navbar";
import SideBar from "../../Component/SideBar/SideBar";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarSwitch:false,
            taskList:store.getState().HomeReducer.taskList
        }

    }
    showSideBar() {
        this.setState({
            sideBarSwitch:!this.state.sideBarSwitch
        })
    }
    render() {
        return (<div style={{ height: '100%' }}>
            {/*顶部导航栏*/}
            <Navbar handleClick={() => this.showSideBar()} ></Navbar>

            {/*侧边栏*/}
            {this.state.sideBarSwitch?<SideBar onShowSideBar={()=>this.showSideBar()}></SideBar>:null}
            <div className={'divide'}></div> {/*分割线*/}
            <Task taskList={this.state.taskList} ></Task>
            <Link to={'/add_task'}>
                <div className={'addTask'}>
                    <span className={'iconfont icon-21'}></span>
                </div>
            </Link>
            <FooterBar></FooterBar>
        </div>);
    }
}

export default  Home
