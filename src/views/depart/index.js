import React,{Fragment} from 'react';
import { Table,Button } from 'antd';
import {Switch,Route, HashRouter} from 'react-router-dom';
import {PlusOutlined } from "@ant-design/icons";
import DepartAdd from "./adddepart";
import DepartEdit from "./editdepart";
import DepartDelete from "./deletedepart";
import {GetdepartList} from '../../service/account'//导入接口

class DepartList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      addvisible:false,
      editvisible:false,
      deletevisible:false,
      depart:"",
      departid:""
    };
  }
  //生命周期的使用
  componentWillMount() {
    GetdepartList().then(response=>{
      const list=response.data.data;
      this.setState({
        list
      })
    }).catch(error=>{
    })
  }
  editFunc=(record)=>{
    const {depart,departid}=record;
    this.setState({
      depart,
      departid,
      editvisible:!this.state.editvisible
    })
  }
  deleteFunc=(record)=>{
    const {depart,departid}=record;
    this.setState({
      depart,
      departid,
      deletevisible:!this.state.deletevisible
    })
  }
  addFunc=()=>{
    this.setState({
      addvisible:!this.state.addvisible,    
    })
  }

  render(){
    const columns=[
      {
        title: '科室编号 ',
        width: 120,
        dataIndex: 'departid',
        key: 'departid',
      },
      {
        title: '科室名称 ',
        width: 120,
        dataIndex: 'depart',
        key: 'depart',
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
      },
      {
        title: '操作',
        fixed:'right',
        width: 60,
        dataIndex: 'deletedep',
        key: 'deletedep',
        render: (text, record) => {
          return (
            <a onClick={() => this.deleteFunc(record)}>删除</a>
          );
        }
      },
    ]
    return (
      <Fragment>
          <Button style={{ display: 'block',marginBottom:'10px'}} 
            type='primary' onClick={() => this.addFunc()}>
              <span
              style={{ letterSpacing: '2px' }}><PlusOutlined />添加
              </span>
          </Button>
          <Table
          columns={columns}
          dataSource={this.state.list}
          />
          {this.state.addvisible && <DepartAdd 
          addvisible={this.state.addvisible} 
          />}
          {this.state.editvisible && <DepartEdit 
          editvisible={this.state.editvisible}
          depart={this.state.depart}
          departid={this.state.departid}/>}  
          {this.state.deletevisible && <DepartDelete 
          deletevisible={this.state.deletevisible}
          depart={this.state.depart}
          departid={this.state.departid}/>} 

      </Fragment>

    );
  }
}


export default DepartList;
