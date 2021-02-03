import React, { Fragment } from 'react';
import { Table,Button,Row,Col,Input, Select,DatePicker } from 'antd';
import {Getpatientlist} from '../../service/account'//导入接口
class PatientList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      editvisible:false,
      
    };
  }
  componentWillMount() {
    Getpatientlist().then(response=>{
      const list=response.data.data;
      this.setState({
        list
      })
    }).catch(error=>{
    })
  }
  editFunc=(record)=>{
    console.log(record);
  }
  render(){
    const columns=[
      {
        title: '患者姓名 ',
        width: 120,
        dataIndex: 'patientname',
        key: 'patientname',
      },
      {
        title: '患者性别 ',
        width: 120,
        dataIndex: 'patientsex',
        key: 'patientsex',
      },
      {
        title: '患者年龄 ',
        width: 120,
        dataIndex: 'patientage',
        key: 'patientage',
      },
      {
        title: '患者电话 ',
        width: 120,
        dataIndex: 'patientphone',
        key: 'patientphone',
      },
      {
        title: '疾病名称 ',
        width: 120,
        dataIndex: 'diseasename',
        key: 'diseasename',
      },
      {
        title: '诊断详情 ',
        width: 240,
        dataIndex: 'diseasedetail',
        key: 'diseasedetail',
      },
      {
        title: '就诊日期 ',
        width: 120,
        dataIndex: 'clinicdate',
        key: 'clinicdate',
      },
      {
        title: '操作',
        fixed:'right',
        width: 60,
        dataIndex: 'edit',
        key: 'edit',
        render: (text, record) => {
          return (
            <a onClick={() => this.editFunc(record)}>编辑</a>
          );
        }
      },
      {
        title: '操作',
        fixed:'right',
        width: 120,
        dataIndex: 'editdep',
        key: 'editdep',
        render: (text, record) => {
          return (
            <a onClick={() => this.editFunc(record)}>在线沟通</a>
          );
        }
      }
      
      
    ]
    return (    
      <Fragment>
        <Table
          columns={columns}
          dataSource={this.state.list}
          scroll={
            {
              x: 'max-content',
              y:'max-content'
            }
          }
          />
      </Fragment>
    )
  }
}


export default PatientList;
