import React,{Component} from 'react'
import FooterBar from "../../Component/FooterBar/FooterBar";
import Navbar from "../../Component/Nabar/Navbar";
import store from "../../store";
import NoteList from "../../Component/NoteList/NoteList";
import {Link} from "react-router-dom";
import './Note.scss'
import SideBar from "../../Component/SideBar/SideBar";
export  default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarSwitch:false,
            noteList:store.getState().NoteReducer.noteList
        }


    }
    handleStateChange = () => {

        this.setState({
            noteList:store.getState().NoteReducer.noteList
        })
    }
    showSideBar() {

        this.setState({
            sideBarSwitch:!this.state.sideBarSwitch
        })
    }
    render() {
        return (
            <div>
                <Navbar pathName={this.state.pathName}  handleClick={() => this.showSideBar()} ></Navbar>
                {/*侧边栏*/}
                {this.state.sideBarSwitch?<SideBar onShowSideBar={()=>this.showSideBar()}></SideBar>:null}
                <NoteList ></NoteList>
                <FooterBar></FooterBar>
                <Link to={'/add_note'}>
                    <div className={'addNote'}>
                        <span className={'iconfont icon-21'}></span>
                    </div>
                </Link>
            </div>
        )
    }
}
