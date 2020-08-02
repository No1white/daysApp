import React,{Component} from 'react'
import {List,InputItem,Button} from 'antd-mobile'


import './Settings.scss'

// import Navbar from "../../Component/Nabar/Navbar";
import NavBarBack from "../../Component/NabBarBack/NavBarBack";
const Item = List.Item;
const Brief = Item.Brief;
export  default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:false,
            register:false
        }
    }

    handleLogin = (name) => {
        this.setState({
            [name]:!this.state[name]
        })
        console.log(this.state)
    }
    handleMark = () => {
        this.setState({
            login:false,
            register:false
        })
    }
    render() {
        return (

            <div className={'settingContainer'}>
                {/*<Navbar></Navbar>*/}
                <NavBarBack></NavBarBack>
                <List renderHeader={() => '账号'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={()=>this.handleLogin('login')}>
                        登录
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={()=>this.handleLogin('register')}>
                        注册
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        忘记密码
                    </Item>
                </List>
                <List renderHeader={() => '设置'} className="settingList">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        账号登录
                    </Item>
                </List>
                <div className={`acountWrap ${this.state.login || this.state.register ?'show':'hide'} `}>
                    <div className={`login ${this.state.login?'show':'hide'}`}>
                        <h4>登录days</h4>
                        <InputItem placeholder={'请输入手机号'}></InputItem>
                        <InputItem placeholder={'请输入密码'}></InputItem>
                        <Button className={'btnLogin'}>登入</Button>

                    </div>
                    <div className={`register  ${this.state.register?'show':'hide'}`}>
                        <h4>注册days</h4>
                        <InputItem placeholder={'请输入手机号'}></InputItem>
                        <InputItem placeholder={'请输入密码'}></InputItem>
                        <Button className={'btnLogin'}>注册</Button>

                    </div>
                    <div className="mark" onClick={this.handleMark}></div>
                </div>

            </div>
        )
    }
}
