import React,{Fragment}  from 'react';
import { Button } from 'antd';
import {FileAddOutlined } from "@ant-design/icons";
import ScheduleTableComponent from './ScheduleTableComponent';
import { GetscheduleDateHeader } from '../../service/account'//导入接口

class Schedules extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scheduleDateHeader:[]
    };
  }
  componentWillMount() {
    GetscheduleDateHeader().then(response=>{
      console.log(response.data.data);
      // this.setState({
      //   scheduleDateHeader:response
      // })
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
          <div className="docScheduleTitleRow">
          {
            this.state.scheduleDateHeader.map((item, index) => {
              const { week, date } = item;
              return (
                <div key={index}>
                  <p>
                    {week.replace('星期', '周')}（{date.substring(5)}）
                  </p>
                </div>
              );
            })
          }
          </div>     
          <ScheduleTableComponent
          />
      </Fragment>
)
  }
}


export default Schedules;
