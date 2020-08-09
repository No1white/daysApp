import React,{Component} from 'react'
import {List,InputItem,Button,Toast} from 'antd-mobile'

import {saveStorage,getStorage} from '../../utils/storageUtils'
import {getCode,login,register,changePassword} from '../../store/action'
import store from "../../store";
import './Settings.scss'
import { withCookies, Cookies } from 'react-cookie';
// import Navbar from "../../Component/Nabar/Navbar";
import NavBarBack from "../../Component/NabBarBack/NavBarBack";

const Item = List.Item;
const Brief = Item.Brief;
let timer;
class Settings extends Component {


    constructor(props) {
        super(props);
        console.log(props)

        this.state = {
            login:false,  //登录组件显示
            register:false, //注册组件显示
            changePassword:false, //修改密码组件
            phone:'',  //手机号
            code:'', //验证码
            password:'',  //密码
            codeTime:'获取验证码',

        }
    }
    //处理登录注册显示
    handleShowComponent = (name) => {
        this.setState({
            [name]:!this.state[name]
        })
        console.log(this.state)
    }
    //处理遮罩显示
    handleMark = () => {
        this.setState({
            login:false,
            register:false,
            changePassword:false
        })
    }
    handleInputChange = (e,property) => {
        this.setState({
            [property]:e
        })
    }
    //获取验证码
    handleGetCode = () => {
        let reg = new RegExp('^1[3456789]\\d{9}$');

        let i=60;
        if(reg.test(this.state.phone)) {
        // if(true) {
            const action = getCode(this.state.phone);
            store.dispatch(action).then(res=> {
                if( res.code === 0 ) {
                    console.log("获取成功");
                    saveStorage(res.token,'userToken');
                }
            });
            timer = setInterval(()=> {
                this.setState({
                    codeTime:i+"秒"
                })
                i--;
                if(i<=0) {
                    this.setState({
                        codeTime:'获取验证码'
                    })
                }
            },1000)

        }else {
            Toast.info('请输入正确的手机号', 2, null, false);
        }
    }
    //处理注册
    handleRegister = () => {
        const {cookies} = this.props;
        let token = getStorage('userToken');

        let userInfo = {
            phoneNum:this.state.phone,
            password:this.state.password,
            vefCode:this.state.code,
            token
        }
        const action = register(userInfo);
        store.dispatch(action).then(res=> {
            // setCookie('user',res.data)
            if(res.code===0) {
                cookies.set('user',res.user,{path:'/',maxAge:24*60*60*1000})
                Toast.info('注册成功', 2, null, false);
                this.handleMark();
                if(timer) {
                    clearInterval(timer);
                    this.setState({
                        codeTime:'获取验证码'
                    })
                }
            }else {
                Toast.info('验证码输入有误', 2, null, false);
            }

        })
    }
    handleLogin = () => {
        const {cookies} = this.props;
        let userInfo = {
            phoneNum:this.state.phone,
            password:this.state.password
        }
        const action = login(userInfo);


        store.dispatch(action).then(res=> {
            // setCookie('user',res.data)
            if(res.user) {
                cookies.set('user',res.user,{path:'/',maxAge:24*60*60*1000})
                Toast.info('登录成功', 2, null, false);
                this.handleMark();
            }else {
                Toast.info('账号或密码错误', 2, null, false);
            }

        })


    }
    //处理修改密码
    handleChangePassword = ()=> {
        const {cookies} = this.props;
        let userInfo = {
            phoneNum:this.state.phone,
            password:this.state.password,
            vefCode:this.state.code
        }
        const action = changePassword(userInfo);
        store.dispatch(action).then(res=> {
            // setCookie('user',res.data)
            if(res.code===0) {
                cookies.set('user',res.user,{path:'/',maxAge:24*60*60*1000})
                Toast.info('修改成功', 2, null, false);
                this.handleMark();
                if(timer) {
                    clearInterval(timer);
                    this.setState({
                        codeTime:'获取验证码'
                    })
                }
            }else {
                Toast.info('验证码请重新输入', 2, null, false);
            }

        })
    }
    render() {
        return (

            <div className={'settingContainer'}>
                {/*<Navbar></Navbar>*/}

                <NavBarBack navBarTitle={'设置'}></NavBarBack>
                <List renderHeader={() => '账号'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={()=>this.handleShowComponent('login')}>
                        登录
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={()=>this.handleShowComponent('register')}>
                        注册
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={()=>this.handleShowComponent('changePassword')}>
                        忘记密码
                    </Item>
                </List>
                <List renderHeader={() => '设置'} className="settingList">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        头像
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        昵称
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>修改密码</Item>
                    <Item arrow="horizontal"  onClick={() => {}}>关于版本</Item>
                </List>
                <div className={`acountWrap ${this.state.login || this.state.register||this.state.changePassword ?'show':'hide'} `}>
                    <div className={`login ${this.state.login?'show':'hide'}`}>
                        <h4>登录days</h4>
                        <InputItem placeholder={'请输入手机号'} onChange={(e)=> this.handleInputChange(e,'phone')}></InputItem>
                        <InputItem placeholder={'请输入密码'} onChange={(e)=> this.handleInputChange(e,'password')}></InputItem>
                        <Button className={'btnLogin'} onClick={this.handleLogin}>登入</Button>

                    </div>
                    <div className={`register  ${this.state.register?'show':'hide'}`}>
                        <h4>注册days</h4>
                        <InputItem placeholder={'请输入手机号'} onChange={(e)=> this.handleInputChange(e,'phone')}></InputItem>
                        <div className={'codeWrap'}>
                            <InputItem placeholder={'请输入验证码'} className={'codeInput'} onChange={(e)=> this.handleInputChange(e,'code')}></InputItem>
                            <Button type={'primary'} inline className={'getCode'} disabled={this.state.codeTime!=='获取验证码'} onClick={this.handleGetCode}>{this.state.codeTime}</Button>
                        </div>
                        <InputItem placeholder={'请输入密码'} onChange={(e)=> this.handleInputChange(e,'password')}></InputItem>
                        <Button className={'btnLogin'} onClick={this.handleRegister}>注册</Button>

                    </div>
                    <div className={`changePassword  ${this.state.changePassword?'show':'hide'}`}>
                        <h4>修改密码</h4>
                        <InputItem placeholder={'请输入手机号'} onChange={(e)=> this.handleInputChange(e,'phone')}></InputItem>
                        <div className={'codeWrap'}>
                            <InputItem placeholder={'请输入验证码'} className={'codeInput'} onChange={(e)=> this.handleInputChange(e,'code')}></InputItem>
                            <Button type={'primary'} inline className={'getCode'} disabled={this.state.codeTime!=='获取验证码'} onClick={this.handleGetCode}>{this.state.codeTime}</Button>
                        </div>
                        <InputItem placeholder={'请输入新密码'} onChange={(e)=> this.handleInputChange(e,'password')}></InputItem>
                        <Button className={'btnLogin'} onClick={this.handleChangePassword}>修改密码</Button>

                    </div>
                    <div className="mark" onClick={this.handleMark}></div>
                </div>

            </div>
        )
    }
}
export default withCookies(Settings);
