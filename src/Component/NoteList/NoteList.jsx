import React,{Component} from 'react'

import {List, Modal} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './NoteList.scss'
import store from "../../store";
import {delNote} from '../../store/action'
const Item = List.Item;
const operation = Modal.operation;//确认框
class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteList:store.getState().NoteReducer.noteList
        }

    }
    handleClickNote = (noteId) => {

        this.props.history.push({
            pathname:'add_note',
            query:{
                noteId:noteId
            }
        });
    }
    //touch事件开始  处理长按事件
    handleTouchStart = (noteId,e) => {
        e.preventDefault();
        console.log("点击开始")
        let that = this; //保存this
        this.timeOutEvent = setTimeout(function() {
            this.timeOutEvent = 0;
            console.log("长按")
            operation([
                { text: '删除日志', onPress: () =>{that.delNote(noteId);
                        console.log("点击了编辑")} },
            ])
        }, 500);
    }
    delNote = (noteId) => {
        store.dispatch(delNote(noteId));
    }
    handleTouchEnd = () => {
        console.log('你点击了');
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent != 0) {

            console.log('你点击了');
        }
        return false;
    }
    handleTouchMove = (e) => {
        console.log("点击移动")
        console.log(e)
        e.preventDefault();
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
    }
    render() {
        return (
            <div className={'noteListContainer'}>
                <List className={'noteList'}>
                    {
                        this.state.noteList.map((note) => {
                            return (
                                <Item className={'listItem'}
                                      extra={note.recordTime}
                                      multipleLine
                                      onClick={()=>this.handleClickNote(note.noteId)}
                                      key={note.noteId}
                                      wrap
                                        >
                                    <p className={'noteTitle'}>{note.noteTitle}</p>
                                    <p className={'noteContent'}>{note.noteContent}</p>
                                </Item>

                            )
                        })
                    }

                </List>
            </div>
        )
    }
}
export  default withRouter(NoteList)
