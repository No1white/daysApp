import React,{Component} from 'react'
import FooterBar from "../../Component/FooterBar/FooterBar";
import Navbar from "../../Component/Nabar/Navbar";
import store from "../../store";
import SideBar from "../../Component/SideBar/SideBar";

export  default class Schedule extends Component {
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
            <div>
                {/*<Navbar handleClick={() => this.showSideBar()} ></Navbar>*/}
                {/*侧边栏*/}
                {this.state.sideBarSwitch?<SideBar onShowSideBar={()=>this.showSideBar()}></SideBar>:null}

                <FooterBar></FooterBar>
            </div>
        )
    }
}
