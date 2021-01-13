import React,{Fragment}  from 'react';
import { Table,Button } from 'antd';
import {PlusOutlined } from "@ant-design/icons";
import DoctorAdd from './adddoctor';
class DoctorListTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      addvisible:false,
    };
  }
  addFunc = () => {
    this.setState({
      addvisible:!this.state.addvisible
    })
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
          title: '操作',
          fixed:'right',
          width: 60,
          dataIndex: 'address1',
          key: 'address1',
        },
        {
          title: '操作',
          fixed:'right',
          width: 60,
          dataIndex: 'address2',
          key: 'address2',
        },
        {
          title: '操作',
          fixed:'right',
          width: 60,
          dataIndex: 'address3',
          key: 'address3',
        },]
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
            
        </Fragment> 
)
  }
}


export default DoctorListTable;
