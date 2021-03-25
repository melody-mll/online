import React, { Fragment } from 'react';
import PatientEdit from "./editpatient";
import PatientAdd from "./addpatient";
import PatientChat from "./chatpatient";
import {PlusOutlined } from "@ant-design/icons";
import { Table,Button,Row,Col,Input, message } from 'antd';
import {Getpatientlist} from '../../service/account'//导入接口
class PatientList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      editvisible:false,
      addvisible:false,
      chatvisible:false,
      patientsqlid:"",
      patientname:"",
      patientsex:"",
      patientid:"",
      patientage:"",
      patientphone:"",
      diseasename:"",  
      diseasedetail:"",
      clinicdate:""
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
    console.log('record',record);
    const patientsqlid=record._id;
    const {
      patientname,
      patientsex,
      patientid,
      patientage,
      patientphone,
      diseasename,  
      diseasedetail,
      clinicdate} = record;
      this.setState({
        patientsqlid,
        patientname,
        patientsex,
        patientid,
        patientage,
        patientphone,
        diseasename,  
        diseasedetail,
        clinicdate,
        editvisible:!this.state.editvisible
      })
  }

  chatFunc=(record)=>{
    const {
      patientname,
      patientsex,
      patientid,
      patientage,
      patientphone,
      diseasename,  
      diseasedetail,
      clinicdate} = record;
      this.setState({
        patientname,
        patientsex,
        patientid,
        patientage,
        patientphone,
        diseasename,  
        diseasedetail,
        clinicdate,
        chatvisible:!this.state.chatvisible
      })
  }

  changeInputname=(e)=>{
    this.setState({
      patientname:e.target.value
    })
  }
  changeInputid=(e)=>{
    this.setState({
      patientid:e.target.value
    })
  }
  patientlistSearch=()=>{
    if(!this.state.patientname){
      return message.warning("患者姓名不可为空");
    }
    if(!this.state.patientid){
      return message.warning("患者证件号不可为空");
    }
    console.log(this.state);
    const requestData = {
      action:"query",
      patientname:this.state.patientname,
      patientid:this.state.patientid,
    }
    console.log('requestData',requestData);
    Getpatientlist(requestData).then(response=>{
      const list=response.data.data;
      this.setState({
        list
      })
    }).catch(error=>{
    })
  }
  addFunc=()=>{
    this.setState({
      addvisible:!this.state.addvisible
    })
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
        title: '患者证件号 ',
        width: 240,
        dataIndex: 'patientid',
        key: 'patientid',
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
        dataIndex: 'chat',
        key: 'chat',
        render: (text, record) => {
          return (
            <a onClick={() => this.chatFunc(record)}>在线沟通</a>
          );
        }
      }
      
      
    ]
    return (    
      <Fragment>

        <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>患者姓名：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={(e) => this.changeInputname(e)} value={this.state.patientname} />
                </Col>
            </Col>
              <Col span={8}>
              <Col span={10} className='info_label'>患者证件号：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={(e) => this.changeInputid(e)}  value={this.state.patientid} />
                </Col>
              </Col>
        </Row>
        <Button
          className="button_search"
          type="primary"
          onClick={this.patientlistSearch}
        >
          查询
        </Button>
        <Button style={{ display: 'block',marginBottom:'10px'}} 
            type='primary' onClick={() => this.addFunc()}><span
              style={{ letterSpacing: '2px' }}><PlusOutlined />添加</span>
        </Button>  
        <div>    
        <Table
          columns={columns}
          dataSource={this.state.list}
          scroll={
            {
              x: 'max-content',
              y:'max-content'
            }
          }
          /></div>  
          {this.state.editvisible && <PatientEdit 
          patientsqlid={this.state.patientsqlid}
          patientname={this.state.patientname}
          patientsex={this.state.patientsex}
          patientid={this.state.patientid}
          patientage={this.state.patientage}
          patientphone={this.state.patientphone}
          diseasename={this.state.diseasename} 
          diseasedetail={this.state.diseasedetail}
          clinicdate={this.state.clinicdate}
          editvisible={this.state.editvisible}/>}
          {this.state.chatvisible && <PatientChat 
          patientname={this.state.patientname}
          patientsex={this.state.patientsex}
          patientid={this.state.patientid}
          patientage={this.state.patientage}
          patientphone={this.state.patientphone}
          diseasename={this.state.diseasename} 
          diseasedetail={this.state.diseasedetail}
          clinicdate={this.state.clinicdate}
          chatvisible={this.state.chatvisible}/>}
          {this.state.addvisible && <PatientAdd 
          addvisible={this.state.addvisible} 
          />}   
      </Fragment>
    )
  }
}


export default PatientList;
