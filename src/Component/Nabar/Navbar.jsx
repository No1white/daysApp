
import React,{Component} from 'react'

import {Link,withRouter} from 'react-router-dom'

import './Navbar.scss'
import store from "../../store/index";
// import {showNavbar} from '../../store/action'

class Navbar extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let days =['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        let week = days[date.getDay()];
        let today ={
            month,
            day,
            week
        }
        let backUrl = "/"+this.props.location.pathname.substr(this.props.location.pathname.indexOf('_')+1,);

        if(/^\/add*/.test(this.props.location.pathname)) {
            this.state = {
                pathName:true,
                today:today,
                backUrl
            }
        }else {
            this.state = {
                pathName:false,
                today:today,
                backUrl
            }
        }

        // this.state = {
        //     pathName:this.props.location.pathname=='/add_task'?true:false,
        //     today:today
        // }

        store.subscribe(this.handleChange)



    }
    handleChange = () => {


    }
    componentWillMount() {

    }

    render() {

        return (
            <div>
                <div className={`${this.state.pathName?'hide':'show'} navBarContainer`}  >
                    <div className="leftIcon" onClick={this.props.handleClick}>
                        <span className={'iconfont icon-caidan'}></span>
                    </div>
                   <div className={'navTitle'}>{this.state.today.month}月{this.state.today.day}日{this.state.today.week}</div>
                    <div className="rightIcon">
                        <span className={'iconfont icon-share'}></span>
                    </div>
                </div>
                <div className={`navBarContainer ${this.state.pathName?'show':'hide'} `}>
                    <Link to={this.state.backUrl}  className={'left'}>
                        <div className="left" >
                            <span className={'iconfont icon-Back'}></span>Back
                        </div>
                    </Link>
                    <div className={'nav'}>添加任务</div>
                    <div className="right" onClick={this.props.onSave}>
                        保存
                    </div>
                </div>
            </div>
        )
    }
}
export  default withRouter(Navbar)
