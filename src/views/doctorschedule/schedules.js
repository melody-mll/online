import React,{Fragment}  from 'react';
import { Button } from 'antd';
import {FileAddOutlined } from "@ant-design/icons";
import ScheduleTableComponent from './ScheduleTableComponent';
import AdddoctorForm from "./adddoctorForm";
//import { GetscheduleDateHeader,GetdocScheduleList } from '../../service/account'//导入接口

class Schedules extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scheduleDateHeader:[],
      doctorScheduleList:[],
      adddocvisible:false,
    };
  }
  // componentWillMount() {
  //   GetscheduleDateHeader().then(response=>{
  //     console.log(response.data.data,'1');
  //     this.setState({
  //       scheduleDateHeader:response.data.data
  //     })
  //   }).catch(error=>{
  //     console.log(error);
  //     }) 

  //     // GetdocScheduleList().then(response=>{
  //     //   console.log(response.data.data,'1');
  //     //   this.setState({
  //     //     doctorScheduleList:response.data.data
  //     //   })
  //     // }).catch(error=>{
  //     //   console.log(error);
  //     //   })  

  // }

  addFunc = () => {   
    this.setState({
      adddocvisible:!this.state.adddocvisible
    })
  }
  render(){
    return (
      <Fragment>
          {/* <Button style={{ display: 'block',marginTop:'10px'}} 
            type='primary' onClick={() => this.addFunc()}><span
              style={{ letterSpacing: '2px' }}><FileAddOutlined />添加医生</span>
          </Button>    */}
          {/* <ScheduleTableComponent
          scheduleDateHeader={this.state.scheduleDateHeader}
          doctorScheduleList={this.state.doctorScheduleList}
          /> */}
          {/* <AdddoctorForm /> */}
      </Fragment>
)
  }
}


export default Schedules;
