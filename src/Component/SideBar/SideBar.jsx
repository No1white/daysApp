import React,{Component} from 'react'
import './SideBar.scss'
import {withRouter} from 'react-router-dom'

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub:[false,false,false,false,false]
        }

    }
    sideBarClose = ()=>{

    }
    handleItemClick = (index) => {
        let sub = this.state.sub;
        sub[index]  =!sub[index];
        this.setState({
            sub:sub
        })

    }
    goTo = (url) => {
        this.props.history.push(url);
    }
    render() {
        return (
            <div className={'sideBarContainer'}>

                <div id="sideNav" className="side-nav">
                    <div className={'userInfo'} onClick={()=>this.goTo('/mine')}>
                        <img  className={'avatar'} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=231923533,1272780950&fm=11&gp=0.jpg" alt=""/>
                        <h4 className={'userName'}>忘言</h4>
                        <p className={'phrase'}>每日进步一点这不就是希望</p>
                    </div>

                    <ul className="side-nav-ul">
                        <li className="side-nav-li" >
                           <div className={'wrap'} onClick={()=>this.handleItemClick(0)}>
                               <span className="iconfont icon-86"></span>
                               <p>同步</p>
                               <span className={'iconfont icon-icon-test9'}></span>
                           </div>
                            <ul className={`sub ${this.state.sub[0] ? 'showSub':'subHide'}`} >
                                <li><span className={'iconfont icon-yunduan2'}></span><p>上传数据至云端</p></li>
                                <li><span className={'iconfont icon-bendi'}></span><p>从云端备份至本地</p></li>
                            </ul>
                        </li>

                        <li className="side-nav-li" >
                            <div className={'wrap'}  onClick={()=>this.handleItemClick(1)}>
                                <span className="iconfont icon-liulan-copy"></span>
                                <p>外观</p>
                                <span className={'iconfont icon-icon-test9'}></span>
                            </div>
                            <ul className={`sub ${this.state.sub[1] ? 'showSub':'subHide'}`}>

                            </ul>
                        </li>
                        <li className="side-nav-li" >
                            <div className={'wrap'}  onClick={()=>this.goTo('/')}>
                                <span className="iconfont icon-caidan1"></span>
                                <p>待办</p>
                                <span className={'iconfont icon-icon-test9'}></span>
                            </div>
                            <ul className={`sub ${this.state.sub[2] ? 'showSub':'subHide'}`}>

                            </ul>
                        </li>
                        <li className="side-nav-li" >
                            <div className={'wrap'}  onClick={()=>this.goTo('/note')}>
                                <span className="iconfont icon-web-icon-"></span>
                                <p>笔记</p>
                                <span className={'iconfont icon-icon-test9'}></span>
                            </div>
                            <ul className={`sub ${this.state.sub[3] ? 'showSub':'subHide'}`}>

                            </ul>
                        </li>
                        <li className="side-nav-li" >
                            <div className={'wrap'}  onClick={()=> this.goTo('/settings')}>
                                <span className="iconfont icon-86"></span>
                                <p>设置</p>
                                <span className={'iconfont icon-icon-test9'}></span>
                            </div>
                            <ul className={`sub ${this.state.sub[4] ? 'showSub':'subHide'}`}>

                            </ul>
                        </li>


                    </ul>
                </div>
                <div className="nav-mask" id="mask" onClick={this.props.onShowSideBar} ></div>
            </div>
        )
    }
}
export default withRouter(SideBar)
