import React,{Fragment} from 'react';
import moment from 'moment';
import { Table,Button,Row,Col,Input, Select,DatePicker } from 'antd';
import {Getpatientlist} from '../../service/account'//导入接口
import {Switch,Route, HashRouter} from 'react-router-dom';
class RegisterList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      patientname:"",
      patientid:"",
      registerdate:""
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
  changeInputids=(e)=>{
    this.setState({
      registerdate:e
    })
  }
  getinitialvalue=()=>{
    datas=moment(dateString)
  }
  onChange=(date, dateString) =>{
    const dateFormat = 'YYYY-MM-DD';
    const data=moment(dateString);
    this.setState({
      registerdate:data
    });
    // this.setState({
    //   registerdate:this.state.registerdate.format(dateFormat)
    // })
    console.log(1);
  }
  render(){
    console.log(this.state,'44');
    const columns=[
      {
        title: '患者姓名 ',
        width: 120,
        dataIndex: 'patientname',
        key: 'patientname',
      },
      {
        title: '患者手机号 ',
        width: 120,
        dataIndex: 'patientphone',
        key: 'patientphone',
      },
      {
        title: '患者证件号 ',
        width: 120,
        dataIndex: 'patientid',
        key: 'patientid',
      },
      {
        title: '预约科室 ',
        width: 120,
        dataIndex: 'depname',
        key: 'depname',
      },
      {
        title: '预约项目 ',
        width: 120,
        dataIndex: 'projectname',
        key: 'projectname',
      },
      {
        title: '预约医生 ',
        width: 120,
        dataIndex: 'doctorname',
        key: 'doctorname',
      },
      {
        title: '预约日期 ',
        width: 120,
        dataIndex: 'registerdate',
        key: 'registerdate',
      },
      {
        title: '预约状态 ',
        width: 120,
        dataIndex: 'registerstatus',
        key: 'registerstatus',
      },
      {
        title: '操作',
        fixed:'right',
        width: 60,
        dataIndex: 'editdep',
        key: 'editdep',
        render: (text, record) => {
          return (
            <a onClick={() => this.editFunc(record)}>编辑</a>
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
              <Col span={8}>
              <Col span={10} className='info_label'>预约日期：</Col>
                <Col span={14} className='info_input'>
                    <DatePicker onChange={(date, dateString) => {
                      let value=dateString.getinitialvalue()
                      this.onChange(date, dateString,value)}} 
                      value={this.state.registerdate}/>
                </Col>
              </Col>
            </Row>
            <Button
              className="button_search"
              type="primary"
              onClick={this.doctorlistSearch}
            >
              查询
            </Button>
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
    );
  }
}


export default RegisterList;
