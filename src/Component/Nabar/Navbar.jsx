
import React,{Component} from 'react'

import {Link,withRouter} from 'react-router-dom'
import {Button} from 'antd-mobile'
import './Navbar.scss'
import store from "../../store/index";
// import {showNavbar} from '../../store/action'
import plusExtends from "../../assets/js/plusExtend";
import {CSSTransition} from "react-transition-group";

var buttons=[
    {title:'我的好友',extra:{scene:'WXSceneSession'}},
    {title:'朋友圈',extra:{scene:'WXSceneTimeline'}},
    {title:'我的收藏',extra:{scene:'WXSceneFavorite'}}
];
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
                backUrl,
                showShare:false,
                shares:null,
                sqq:null,
                weixin:null,
                sinaweibo:null,
            }
        }else {
            this.state = {
                pathName:false,
                today:today,
                backUrl,
                shares:null,
                sqq:null
            }
        }
        store.subscribe(this.handleChange)
        let that = this;
        plusExtends(() => {
            var shares=null;

            var wvs=window.plus.webview.all();
            for(var i=0;i<wvs.length;i++){
                console.log('webview'+i+': '+wvs[i].getURL());
            }

            //getServices 用户获取
            window.plus.share.getServices(function(s){//s是一个数组
                shares={};//shares是一个对象
                for(var i in s){
                    var t=s[i];
                    console.log(t.id); // qq  sinaweibo   weixin
                    shares[t.id]=t;

                }
                console.log("shraes=")
                console.log(shares)


                that.setState({
                    shares,
                    sqq:shares['qq'],
                    weixin:shares['weixin'],
                    sinaweibo:shares['sinaweibo']
                })
            }, function(e){
                console.log("获取分析服务器列表失败"+e.message);
            });

            console.log(this.state)
        })


    }
    handleChange = () => {


    }
    componentWillMount() {


    }
    // 分享微信
    shareTextWechat = () => {
        let that = this;
        var msg={type:'text',content:'内容'};
        this.state.weixin?that.share(that.state.weixin, msg, {title:'我的好友',extra:{scene:'WXSceneSession'}})
            :window.plus.nativeUI.alert('当前环境不支持微信分享操作!');

    }
    shareTextWechatFriends = () => {
        let that = this;
        var msg={type:'text',content:'内容'};
        this.state.weixin?that.share(that.state.weixin, msg, {title:'朋友圈',extra:{scene:'WXSceneTimeline'}})
            :window.plus.nativeUI.alert('当前环境不支持微信分享操作!');

    }

    // 分享文本
    shareText = (shareSocial) => {
        var msg={type:'text'};
        console.log(this.state.sqq)
        msg.title="我在days打卡第19天"
        msg.href='http://www.dcloud.io';
        console.log("sharesocial--------------------")
        console.log(this.state[shareSocial]);
        console.log(this.state.shareSocial)
        console.log("sharesocial--------------------")

        this.state[shareSocial]?this.share(this.state[shareSocial], msg):window.plus.nativeUI.alert(`当前环境不支持${shareSocial}分享操作!`);
    }
    // 分享
    share = (srv, msg, button) => {
        let that = this;
        if(!srv){

            return;
        }
        button&&(msg.extra=button.extra);
        // 发送分享
        if(srv.authenticated){

            this.doShare(srv, msg);
        }else{

            srv.authorize(function(){
                that.doShare(srv, msg);
            }, function(e){

            });
        }
    }
    // 发送分享
    doShare = (srv, msg) => {
        srv.send(msg, function(){
            console.log("分享成功")
            // outLine('分享到"'+srv.description+'"成功！');
        }, function(e){
            console.log("分享失败")
            // outLine('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
        });
    }

    handleShare = () => {
        plusExtends(()=> {

        })
    }
    handleShowShare = () => {

        this.setState({
            showShare:!this.state.showShare
        })
    }

    //分享到微信
    handleShareWechat = () => {
        var shares=null;
        var sqq=null;
        plusExtends(() => {
            var wvs=window.plus.webview.all();
            console.log(wvs.length);
            for(var i=0;i<wvs.length;i++){
                console.log('webview'+i+': '+wvs[i].getURL());
            }

            //getServices 用户获取
            window.plus.share.getServices(function(s){//s是一个数组
                shares={};//shares是一个对象
                for(var i in s){
                    var t=s[i];
                    console.log(t.id); // qq  sinaweibo   weixin
                    shares[t.id]=t;
                }
                console.log(s); //  [object Object],[object Object],[object Object]
                sqq=shares['qq'];  //sqq这里自己声明的全局变量
            }, function(e){
                console.log("获取分析服务器列表失败"+e.message);
            });
            // 分享文本
            function shareText(){
                var msg={type:'text'};

                msg.title="123"
                msg.href='http://www.dcloud.io';
                sqq?share(sqq, msg):window.plus.nativeUI.alert('当前环境不支持QQ分享操作!');
            }
            // 分享
            function share(srv, msg, button){

                if(!srv){

                    return;
                }
                button&&(msg.extra=button.extra);
                // 发送分享
                if(srv.authenticated){

                    doShare(srv, msg);
                }else{

                    srv.authorize(function(){
                        doShare(srv, msg);
                    }, function(e){

                    });
                }
            }
            // 发送分享
            function doShare(srv, msg){

                srv.send(msg, function(){
                    console.log("分享成功")
                    // outLine('分享到"'+srv.description+'"成功！');
                }, function(e){
                    console.log("分析失败")
                    // outLine('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
                });
            }
            function goto() {

            }
        })
    }
    render() {

        return (
            <div>
                <div className={`${this.state.pathName?'hide':'show'} navBarContainer`}  >
                    <div className="leftIcon" onClick={this.props.handleClick}>
                        <span className={'iconfont icon-caidan'}></span>
                    </div>
                   <div className={'navTitle'}>{this.state.today.month}月{this.state.today.day}日{this.state.today.week}</div>
                    <div className="rightIcon" onClick={this.handleShowShare}>
                        <span className={'iconfont icon-share'}></span>
                    </div>
                    <div className={`mark ${this.state.showShare?'showEle':'hideEle'}`} onClick={this.handleShowShare}></div>
                    <CSSTransition
                        in={this.state.showShare}
                        timeout={300}
                        classNames="alert"
                        unmountOnExit
                        onEntered={(el) => {
                            //可选，动画入场之后的回调，el指被包裹的dom，让div内的字体颜色等于蓝色
                        }}
                        onExited={() => {
                            //同理，动画出场之后的回调，也可以在这里来个setState啥的操作
                        }}
                        classNames="btn"
                    >
                        <div className={'shareWrap'}>
                            <ul className={'btnList'}>
                                <li onClick={this.shareTextWechat}>
                                    <div className={'btnWrap'}>
                                        {/*<span className={'iconfont icon-weixin'}></span>*/}
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-weixin"/>  // #icon-woshiicon 为 Font-class

                                        </svg>
                                    </div>
                                    <p>微信</p>
                                </li>
                                <li onClick={this.shareTextWechatFriends}>
                                    <div className={'btnWrap'}>
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-pengyouquan"/>  // #icon-woshiicon 为 Font-class

                                        </svg>
                                    </div>
                                    <p>朋友圈</p>
                                </li>
                                <li onClick={()=>this.shareText('sqq')}>
                                    <div className={'btnWrap'}>
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-QQ"/>  // #icon-woshiicon 为 Font-class
                                        </svg>
                                    </div>
                                    <p>QQ</p>
                              </li>
                                <li>
                                    <div className={'btnWrap'}>
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-QQkongjian"/>  // #icon-woshiicon 为 Font-class

                                        </svg>
                                    </div>
                                    <p>QQ空间</p>
                                </li>
                                <li>
                                    <div className={'btnWrap'}>
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-zhifubao"/>  // #icon-woshiicon 为 Font-class

                                        </svg>
                                    </div>
                                    <p>支付宝</p>
                                </li>
                                <li>
                                    <div className={'btnWrap'}>
                                        <svg className={'icon'} aria-hidden="true">
                                            <use xlinkHref="#icon-lianjie"/>  // #icon-woshiicon 为 Font-class

                                        </svg>
                                    </div>
                                    <p>复制链接</p>
                                </li>
                            </ul>
                            <Button className={'cancel'} type={'default'} onClick={this.handleShowShare}>取消</Button>
                        </div>
                    </CSSTransition>

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
