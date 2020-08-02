import React,{Component} from 'react'

import {List,Checkbox,Flex} from 'antd-mobile'

import './SelfCheck.scss'

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;
export  default class SelfCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchRepeat:this.props.switchRepeat
        }
        // setInterval(()=>{
        //     console.log(this.props)
        // },2000)

    }
    onChange = (val) => {
        console.log(val);

    }

    render() {
        const data = [
            { value: 1, label: '周一' },
            { value: 2, label: '周二' },
            { value: 3, label: '周三' },
            { value: 4, label: '周四' },
            { value: 5, label: '周五' },
            { value: 6, label: '周六' },
            { value: 7, label: '周日' },
        ];
        return (
            <div className={`selfCheckContianer ${this.state.switchRepeat?'showEle':'hideEle'} `}>
                <div className={'list'}>
                    <List >
                        <Item>重复设置</Item>
                        <CheckboxItem  >
                            仅一次
                        </CheckboxItem>
                        <CheckboxItem  >
                            每天
                        </CheckboxItem>
                        <Item>自定义</Item>
                        {data.map(i => (
                            <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                                {i.label}
                            </CheckboxItem>
                        ))}

                    </List>

                </div>
                <div className={'mask'} ></div>
            </div>
        )
    }
}
