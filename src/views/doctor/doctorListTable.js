import React,{Fragment}  from 'react';
import { Table,Button } from 'antd';
import {PlusOutlined } from "@ant-design/icons";
import DoctorAdd from './adddoctor';
import DoctorEdit from './editdoctor';
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
      editvisible:false
    };
  }
  addFunc = () => {   
    this.setState({
      addvisible:!this.state.addvisible,    
    })
    console.log(this.state.addvisible);
  }
  editFunc = (record) => {
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
    console.log(record);
    this.setState({
      editvisible:!this.state.editvisible
    })
    console.log(this.state.editvisible);
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
      doctorproject,
      edittype:"delete"
      })
      console.log(record);
      this.setState({
        editvisible:!this.state.editvisible
      })
      console.log(this.state.editvisible);
  }
 
  render(){ 
    const columns = [
        {
          title: '序列',
          width: 60,
          dataIndex: 'index',
          key: 'index',
          //className: 'orderTable'
        },
        {
          title: '医生编号 ',
          width: 120,
          dataIndex: 'doctorid',
          key: 'doctorid',
          //className: 'orderTable'
        },
        {
          title: '姓名',
          width: 120,
          dataIndex: 'doctorname',
          key: 'doctorname',
          render: text => <a>{text}</a>,
        },
        {
          title: '性别',
          width: 60,
          dataIndex: 'doctorsex',
          key: 'doctorsex',
          //className: 'orderTable'
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
          width: 80,
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
        const data = [
            {
              key:1,
              index:1,
              doctorid: '1',
              doctorname: 'John Brown',
              doctorsex:'男',
              doctorage: 32,
              doctorphone:18758222222,
              doctorposition:'主医师',
              doctordepart:'骨科',
              doctorproject:'project1'
            },
            {
              key:2,
              index:2,
              doctorid: '22',
              doctorname: 'John Brown',
              doctorsex:'男',
              doctorage: 32,
              doctorphone:18758222222,
              doctorposition:'主医师',
              doctordepart:'骨科',
              doctorproject:'project2'
            },]
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
        //   scroll={{ x: xTableWidth, y: this.props.scrollYSize }}
        //   expandedRowKeys={expandedRowKeys}
        //   onExpand={this.expandChangeListener}
        //   expandedRowRender={record => {
        //     return this.expandedTable(record);
        //   }}
          dataSource={data}
        //   pagination={pagination}
          columns={columns}/>
          {this.state.addvisible && <DoctorAdd addvisible={this.state.addvisible}/>}         
          {this.state.editvisible && <DoctorEdit 
          // edittype={this.state.edittype}
          doctorid={this.state.doctorid}
          doctorname={this.state.doctorname}
          doctorsex={this.state.doctorsex}
          doctorage={this.state.doctorage}
          doctorphone={this.state.doctorphone}
          doctorposition={this.state.doctorposition}
          doctordepart={this.state.doctordepart}
          doctorproject={this.state.doctorproject} 
          editvisible={this.state.editvisible}/>}
            
        </Fragment> 
)
  }
}


export default DoctorListTable;
