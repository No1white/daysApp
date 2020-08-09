
import React,{Component} from 'react'

import {Link,withRouter} from 'react-router-dom'

import './NavBarBack.scss'
import store from "../../store/index";
// import {showNavbar} from '../../store/action'

class NavBarBack extends Component {
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
        this.state = {

            today:today,
            backUrl
        }

        store.subscribe(this.handleChange)



    }
    handleChange = () => {


    }
    componentWillMount() {

    }

    render() {

        return (
            <div>

                <div className={`navBarContainer  `}>
                    <Link to={'/'} className={'left'}>
                        <div className="left" >
                            <span className={'iconfont icon-Back'}></span>Back
                        </div>
                    </Link>
                    <div className={'nav'}>{this.props.navBarTitle}</div>
                    <div className="right" >

                    </div>
                </div>
            </div>
        )
    }
}
export  default withRouter(NavBarBack)
