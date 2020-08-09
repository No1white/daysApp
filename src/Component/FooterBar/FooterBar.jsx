import React,{Component} from 'react'
import {WhiteSpace,Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './FooterBar.scss'

const footerSwtichMusic = require('../../assets/audio/footerSwtich.mp3')
class FooterBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path:this.props.location.pathname
        }



    }
    handleClickBtn = (url) => {

        this.playMusic()


        this.setState({
            path:url
        })
        this.props.history.push(url)

    }
    playMusic =()=> {

        let music = this.refs.footerSwtichMusic;
        music.play();

    }
    render() {
        return (
            <div className={'footerBarContainer'}>

                <div className="btnWrap">
                    <audio src={footerSwtichMusic} ref={'footerSwtichMusic'}></audio>
                    <button onClick={()=>{ this.handleClickBtn('/note')}} className={this.state.path=='/note'?'active':''}>日记</button>
                    <button onClick={()=>{this.handleClickBtn('/')}} className={this.state.path=='/'?'active':''}>待办</button>
                    <button onClick={()=>{this.handleClickBtn('/record')}} className={this.state.path=='/record'?'active':''}>记录</button>
                    <button onClick={()=>{this.handleClickBtn('/schedule')}} className={this.state.path=='/schedule'?'active':''}>日程</button>
                </div>
            </div>
        )
    }
}

export default withRouter(FooterBar)
