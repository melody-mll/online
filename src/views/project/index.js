import React,{Fragment} from 'react';
import { Table,Button,Row,Col,Input, Select } from 'antd';
import {Switch,Route, HashRouter} from 'react-router-dom';
import {PlusOutlined } from "@ant-design/icons";
import ProjectAdd from "./addproject";
import ProjectEdit from "./editproject";
import ProjectDelete from "./deleteproject";
import {GetAllprojectList,GetprojectList,GetdepartList} from '../../service/account'//导入接口

class ProjectList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      departlist:[],
      projectlist:[],
      addvisible:false,
      editvisible:false,
      deletevisible:false,
      projectid:"",
      projectname:"",
      projectdep:"",
      projectsqlid:""
    };
  }
  //生命周期的使用
  componentWillMount() {
    GetAllprojectList().then(response=>{
      const list=response.data.data;
      this.setState({
        list
      })
    }).catch(error=>{
    })

    GetdepartList().then(response=>{
      console.log(response.data.data,'1');
      const data=response.data.data;
      if(data){
        var departlist=[];
        for(var i=0,len=data.length;i<len;i++){
          var departdata=data[i];
          departlist.push(departdata.depart)
        }
      }
      this.setState({
        departlist:departlist
      })
      console.log('11111',this.state.departlist);
    }).catch(error=>{
      console.log(error);
      }) 
  }
  editFunc=(record)=>{
    const projectsqlid = record._id;
    const {projectid,projectname,projectdep}=record;
    this.setState({
      projectid,
      projectname,
      projectdep,
      projectsqlid,
      editvisible:!this.state.editvisible
    })
  }
  deleteFunc=(record)=>{
    const {projectid,projectname,projectdep}=record;
    this.setState({
      projectid,
      projectname,
      projectdep,
      deletevisible:!this.state.deletevisible
    })
  }
  addFunc=()=>{
    this.setState({
      addvisible:!this.state.addvisible,    
    })
  }
  projectlistSearch=()=>{
    //选择特定的科室，进行列表的更新
    const requestData={projectdep:this.state.projectdep}
    GetprojectList(requestData).then(response=>{
      const data=response.data.data;
      const list=response.data.data;
      this.setState({
        list
      })
      if(data){
        var projectlist=[];
        for(var i=0,len=data.length;i<len;i++){
          var projectdata=data[i];
          projectlist.push(projectdata.project)
        }
      }
      this.setState({
        projectlist:projectlist
      })
      console.log('projectlist',this.state.projectlist);
      console.log(response.data.data,'1');
      // this.setState({
      //   doctorproject:response.data.data
      // })
    }).catch(error=>{
      console.log(error);
      }) 
  }
  selectChangedep=(e)=>{
    this.setState({
      projectdep:e
    })
  }

  render(){
    const {Option} = Select;
    const columns=[
      {
        title: '项目编号 ',
        width: 120,
        dataIndex: 'projectid',
        key: 'projectid',
      },
      {
        title: '项目名称 ',
        width: 120,
        dataIndex: 'projectname',
        key: 'projectname',
      },
      {
        title: '项目所属科室 ',
        width: 120,
        dataIndex: 'projectdep',
        key: 'projectdep',
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
          <Row style={{marginBottom:"20px"}}>
            <Col span={12}>
                <Col span={10} className='info_label'>所属科室：</Col>
                <Col span={14} className='info_input'>
                <Select defaultValue="" style={{ width: 355 }} 
                 onChange={(e) => this.selectChangedep(e)} 
                //  options={this.state.departlist.toString()}
                 value={this.state.projectdep}>
                   {this.state.departlist.map((value,  label) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                    ))}                  
                </Select>
                </Col>
            </Col>
            <Col span={12}>
              <Button
                // className="button_search"
                type="primary"
                style={{marginRight:"100px",marginTop:"10px"}}
                onClick={this.projectlistSearch}
              >
                查询
              </Button>
            </Col>
          </Row>
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
          {this.state.addvisible && <ProjectAdd 
          addvisible={this.state.addvisible} 
          />}
          {this.state.editvisible && <ProjectEdit 
          editvisible={this.state.editvisible}
          projectid={this.state.projectid}
          projectname={this.state.projectname}
          projectdep={this.state.projectdep}
          projectsqlid={this.state.projectsqlid}/>}  
          {this.state.deletevisible && <ProjectDelete
          deletevisible={this.state.deletevisible}
          projectid={this.state.projectid}
          projectname={this.state.projectname}
          projectdep={this.state.projectdep}/>} 

      </Fragment>

    );
  }
}


export default ProjectList;
