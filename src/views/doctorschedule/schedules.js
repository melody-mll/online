import React,{Fragment}  from 'react';
import { Button } from 'antd';
import {FileAddOutlined } from "@ant-design/icons";
import ScheduleTableComponent from './ScheduleTableComponent';
import { GetscheduleDateHeader,GetdocScheduleList } from '../../service/account'//导入接口

class Schedules extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scheduleDateHeader:[],
      doctorScheduleList:[]
    };
  }
  componentWillMount() {
    GetscheduleDateHeader().then(response=>{
      console.log(response.data.data,'1');
      this.setState({
        scheduleDateHeader:response.data.data
      })
    }).catch(error=>{
      console.log(error);
      }) 

      GetdocScheduleList().then(response=>{
        console.log(response.data.data,'1');
        this.setState({
          doctorScheduleList:response.data.data
        })
      }).catch(error=>{
        console.log(error);
        })  

  }

  addFunc = () => {   
    console.log(111);
  }
  render(){
    return (
      <Fragment>
          <Button style={{ display: 'block',marginBottom:'10px'}} 
            type='primary' onClick={() => this.addFunc()}><span
              style={{ letterSpacing: '2px' }}><FileAddOutlined />添加医生</span>
          </Button>   
          <ScheduleTableComponent
          scheduleDateHeader={this.state.scheduleDateHeader}
          doctorScheduleList={this.state.doctorScheduleList}
          />
      </Fragment>
)
  }
}


export default Schedules;
