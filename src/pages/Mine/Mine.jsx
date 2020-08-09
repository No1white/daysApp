import React,{Component} from 'react'

import {InputItem,Button} from 'antd-mobile'

import plusExtend from "../../assets/js/plusExtend";
import NavBarBack from "../../Component/NabBarBack/NavBarBack";
import { CSSTransition } from 'react-transition-group';
import {imgBaseUrl,baseUrl} from '../../api/api'
import './Mine.scss'

export  default class Mine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBtnGroup:false,
            file:'',
            imgUrl:''
        }
    }
    //处理拍照
    handleTakePicture = () => {
        plusExtend(()=> {
            var cmr = window.plus.camera.getCamera();
            cmr.captureImage((path )=>{
                this.resolveLocalFile(path);
            })
        })
    }

    //从本地获取图片url地址
    resolveLocalFile = (path) => {
        window.plus.io.resolveLocalFileSystemURL(path,(entry) => {
            console.log("entry.toLocalURL="+entry.toLocalURL());
            //alert(entry.toLocalURL());//file:///storage/emulated/0/DCIM/Camera/IMG_20160704_112620.jpg
            //alert(entry.name);//IMG_20160704_112620.jpg
            this.compressImage(entry.toLocalURL(),entry.name);
        }, function(e) {
            window.plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });

    }
    //处理相册选择照片
    handleSelectPicture = () => {
        console.log("从相册中选择图片:");
        let that = this;
        plusExtend(()=> {
            console.log("1")
            window.plus.gallery.pick((path) =>{
                window.plus.io.resolveLocalFileSystemURL(path, function(entry) {
                    //alert(entry.toLocalURL());//file:///storage/emulated/0/DCIM/Camera/IMG_20160704_112620.jpg
                    //alert(entry.name);//IMG_20160704_112620.jpg
                   that.compressImage(entry.toLocalURL(),entry.name);
                }, function(e) {
                    window.plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                });
            }, function ( e ) {
            }, {
                filename: "_doc/camera/",
                filter:"image"
            } );
        })
    }
    //压缩照片
    compressImage = (url,filename) => {
        var name="_doc/upload/"+filename;
        let that = this;

        plusExtend(()=> {

            window.plus.zip.compressImage({

                    src:url,//src: (String 类型 )压缩转换原始图片的路径
                    dst:name,//压缩转换目标图片的路径
                    quality:20,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                    overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
                },
                function(event) {
                    //uploadf(event.target,divid);
                    var path = name;//压缩转换目标图片的路径
                    that.setState({
                        file:path
                    })
                    //event.target获取压缩转换后的图片url路
                    //filename图片名称
                    that.uploadimge(path)
                },function(error) {
                    window.plus.nativeUI.toast("压缩图片失败，请稍候再试");
                });
        })

    }

    //上传图片处理函数
    uploadimge = (path) => {
        let that = this;
        //新建上传任务

        var task = window.plus.uploader.createUpload(baseUrl+'users/avatar', {
                method: "POST",
                userId:'123456'
            },
            (t, status) => {
                window.plus.storage.setItem('avatar',imgBaseUrl+t.responseText);
                if (status == 200) {
                    this.refs.avatar.src = imgBaseUrl+t.responseText;

                    console.log("上传成功");
                } else {
                    console.log("上传失败");
                }
            }
        );
        task.addData( "userId", "123456789" );
        task.addFile(path,{key:'userAvatar'})
        task.start();

    }
    handleClickAvatar = () => {
        this.setState({
            showBtnGroup:true
        })
    }
    handleShowBtnGroup = () => {
        this.setState({
            showBtnGroup:!this.state.showBtnGroup
        })
    }
    render() {
        return (
            <div className={'mineContainer'}>
                <NavBarBack classNmae={'navBar'}></NavBarBack>
                <div className={'avatarWrap'} >
                    <div className={'avatar'} ref={'avatarWrap'}>
                        <img src={require('../../assets/avatar2.jpg')} ref={'avatar'} className={'avatarImg'} alt="" onClick={this.handleShowBtnGroup} />
                    </div>
                    <img src={require('../../assets/avatar2.jpg')} alt="" className={'mark'}/>
                    <CSSTransition
                        in={this.state.showBtnGroup}
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
                        <div className={`btnGroup my-node  }`}  >

                            <Button type={'default'} className={'disabledBtn'}  >选择拍照</Button>
                            <Button type={'default'} className={'camera'} onClick={this.handleTakePicture}>拍照</Button>
                            <Button type={'default'} className={'photo'} onClick={this.handleSelectPicture}>从相处选择</Button>
                            <Button type={'default'} className={'cancel'} onClick={this.handleShowBtnGroup}>取消</Button>

                        </div>
                    </CSSTransition>
                </div>
                <div className={`mark  ${this.state.showBtnGroup?'showEle':'hideEle'}`} ></div>
            </div>
        )
    }
}
