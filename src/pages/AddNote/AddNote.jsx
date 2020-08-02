import React,{Component} from 'react'



import {InputItem, TextareaItem , List, Checkbox} from 'antd-mobile'
import Navbar from "../../Component/Nabar/Navbar";
import store from '../../store/index'
import {addNote,delNote,editNote} from '../../store/action'
import './AddNote.scss'


const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;
export  default class AddNote extends Component {
    constructor(props) {
        super(props);

        const noteId = this.props.location.query && this.props.location.query.noteId;
        let pathName = this.props.location.pathname.replace('/','');
        if(noteId) {
            const nodeList = store.getState().NoteReducer.noteList;
            nodeList.forEach(note => {
                if(noteId === note.noteId) {
                    this.state = {
                        ...note,
                        pathName
                    }
                }
            })
            console.log(this.state)
        }else {
            let date = new Date();
            let recordTime = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            this.state = {
                pathName,
                noteTitle:'',
                noteContent:'',
                noteId:'',
                recordTime,
            }
        }


    }
    handleStateChange = () => {
        this.setState({

        })
    }
    //绑定title输入框的change事件
    handleNoteTitleChange = (e) => {
        this.setState({
            noteTitle:e
        })
        console.log(this.state)
    }
    handleNoteContentChange = (e) => {

        this.setState({
            noteContent:e
        })
    }

    //处理保存时间
    handleSaveNote = () => {
        if(this.state.noteId) {
            //处理修改
            let noteInfo =this.state;
            delete noteInfo.pathName;
            store.dispatch(addNote(noteInfo))
        }else {
           // 处理添加
            let noteInfo ={
                noteTitle:this.state.noteTitle,
                noteContent:this.state.noteContent,
                noteId:'',
                recordTime:this.state.recordTime,
            };

            // let noteInfo = this.state;
            store.dispatch(addNote(noteInfo))


        }
        this.props.history.push('/note');
    }
    render() {


        return (
            <div className={'addNoteContainer'}>
                <Navbar pathName={this.state.pathName} onSave={this.handleSaveNote}></Navbar>
                <InputItem placeholder={'请输入标题'} className={'noteTitle'} value={this.state.noteTitle} onChange={this.handleNoteTitleChange} ></InputItem>
                <TextareaItem
                    className={'noteContent'}
                    onChange={this.handleNoteContentChange}
                    rows={10}
                    labelNumber={5}
                    value = {this.state.noteContent}
                    placeholder={'请输入笔记内容'}
                />
                <div className={'bg'}></div>

            </div>
        )
    }
}
