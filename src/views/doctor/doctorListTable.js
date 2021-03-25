import React,{Fragment}  from 'react';
import { Table,Button } from 'antd';
import {PlusOutlined } from "@ant-design/icons";
import {Getdoctorlist} from '../../service/account'//导入接口
import DoctorAdd from './adddoctor';
import DoctorEdit from './editdoctor';
import DoctorDelete from './deletedoctor';
class DoctorListTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      doctorid:'',
      doctorname:'',
      doctorsex:'man',
      doctorage:'',
      doctorphone:'',
      doctorposition:'',
      doctordepart:'',
      doctorproject:'',
      doctorsqlid:"",
      editvisible:false,
      deletevisible:false,
      list:[]
    };
  }
  addFunc = () => {   
    this.setState({
      addvisible:!this.state.addvisible,    
    })
  }
  //生命周期的使用，componentWillMount在渲染前调用,在客户端也在服务端。
  componentWillMount() {
    const requestData = {
      doctorid: this.state.doctorid,
      doctorname:this.state.doctorname,
      doctorphone:this.state.doctorphone,
      doctorposition:this.state.doctorposition,
      doctordepart:this.state.doctordepart
    }
    Getdoctorlist(requestData).then(response=>{
      const list=response.data.data;
      this.setState({
        list
      })
    }).catch(error=>{
    })
  }
  editFunc = (record) => {
    const doctorsqlid=record._id;
    const {
    doctorid,
    doctorname,
    doctorsex,
    doctorage,
    doctorphone,
    doctorposition,
    doctordepart,
    doctorproject}=record;
    this.setState({
    doctorsqlid,
    doctorid,
    doctorname,
    doctorsex,
    doctorage,
    doctorphone,
    doctorposition,
    doctordepart,
    doctorproject
    })
    this.setState({
      editvisible:!this.state.editvisible
    })
  }
  deleteFunc = (record) => {   
    const {
      doctorid,
      doctorname,
      doctorsex,
      doctorage,
      doctorphone,
      doctorposition,
      doctordepart,
      doctorproject}=record;
      this.setState({
      doctorid,
      doctorname,
      doctorsex,
      doctorage,
      doctorphone,
      doctorposition,
      doctordepart,
      doctorproject
      })
      this.setState({
        deletevisible:!this.state.deletevisible,    
      })
  }
 
  render(){ 
    const columns = [
        // {
        //   title: '序列',
        //   width: 60,
        //   dataIndex: 'index',
        //   key: 'index',
        // },
        {
          title: '医生编号 ',
          width: 120,
          fixed:'left',
          dataIndex: 'doctorid',
          key: 'doctorid',
        },
        {
          title: '姓名',
          width: 120,
          fixed:'left',
          dataIndex: 'doctorname',
          key: 'doctorname',
          render: text => <a>{text}</a>,
        },
        {
          title: '性别',
          width: 60,
          dataIndex: 'doctorsex',
          key: 'doctorsex',
        },
        {
          title: '年龄',
          width: 60,
          dataIndex: 'doctorage',
          key: 'doctorage',
        },
        {
          title: '电话号码',
          width: 120,
          dataIndex: 'doctorphone',
          key: 'doctorphone',
        },
        {
          title: '职位',
          width: 100,
          dataIndex: 'doctorposition',
          key: 'doctorposition',
        },
        {
          title: '科室',
          width: 80,
          dataIndex: 'doctordepart',
          key: 'doctordepart',
        },
        {
          title: '所在项目',
          width: 120,
          dataIndex: 'doctorproject',
          key: 'doctorproject',
        },
        {
          title: '操作',
          fixed:'right',
          width: 60,
          dataIndex: 'address1',
          key: 'address1',
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
          dataIndex: 'address2',
          key: 'address2',
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
            type='primary' onClick={() => this.addFunc()}><span
              style={{ letterSpacing: '2px' }}><PlusOutlined />添加</span>
          </Button>
        <Table
          size='middle'
          className={""}
          scroll={
            {
              x: 'max-content',
              y:'max-content'
            }
          }
          dataSource={this.state.list}
          columns={columns}/>
          {this.state.addvisible && <DoctorAdd 
          addvisible={this.state.addvisible} 
          list={this.state.list}/>}  
          {this.state.deletevisible && <DoctorDelete 
          doctorid={this.state.doctorid}
          doctorname={this.state.doctorname}
          doctorsex={this.state.doctorsex}
          doctorage={this.state.doctorage}
          doctorphone={this.state.doctorphone}
          doctorposition={this.state.doctorposition}
          doctordepart={this.state.doctordepart}
          doctorproject={this.state.doctorproject} 
          deletevisible={this.state.deletevisible}/>}        
          {this.state.editvisible && <DoctorEdit 
          doctorid={this.state.doctorid}
          doctorname={this.state.doctorname}
          doctorsex={this.state.doctorsex}
          doctorage={this.state.doctorage}
          doctorphone={this.state.doctorphone}
          doctorposition={this.state.doctorposition}
          doctordepart={this.state.doctordepart}
          doctorproject={this.state.doctorproject} 
          editvisible={this.state.editvisible}
          doctorsqlid={this.state.doctorsqlid}/>}          
        </Fragment> 
)
  }
}
export default DoctorListTable;