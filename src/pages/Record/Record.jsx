import React,{Component} from 'react'
import FooterBar from "../../Component/FooterBar/FooterBar";
import Navbar from "../../Component/Nabar/Navbar";
import store from "../../store";

import './Record.scss'
import SideBar from "../../Component/SideBar/SideBar";
import Calendar from "../../Component/Calendar/Calendar";
export  default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarSwitch:false,

        }


    }

    showSideBar() {

        this.setState({
            sideBarSwitch:!this.state.sideBarSwitch
        })
    }
    render() {
        return (
            <div className={'recordContainer'}>
                {/*<Navbar handleClick={() => this.showSideBar()} ></Navbar>*/}
                {/*侧边栏*/}
                {this.state.sideBarSwitch?<SideBar onShowSideBar={()=>this.showSideBar()}></SideBar>:null}
                <Calendar className={'calendar'}></Calendar>
                <FooterBar></FooterBar>

            </div>
        )
    }
}
