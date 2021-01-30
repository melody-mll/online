import React,{Fragment} from 'react';
import { Button,Modal,Row,Col, Input,Select} from 'antd';
import "./style.css";
import AdddoctorForm from "./adddoctorForm";
import ScheduleTableComponent from './ScheduleTableComponent';
import {GetscheduleDateHeader,GetdocScheduleList,GetdepartList,GetprojectList} from '../../service/account'//导入接口
class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scheduleDateHeader:[],
      doctorScheduleList:[],
      doctordepart:"",
      doctorproject:"",
      departlist:[],
      projectlist:[],
      adddocvisible:false
    };
  }
  // mapdeplist=this.state.departlist.map((item,index)=>{
  //   item;
  // })
  componentWillMount() {
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

    GetprojectList().then(response=>{
      const data=response.data.data;
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
      doctordepart:e
    })
  }
  selectChangepro=(e)=>{
    this.setState({
      doctorproject:e
    })
  }
  doctorlistSearch=()=>{
    console.log('koskdosk');
    GetscheduleDateHeader().then(response=>{
      console.log(response.data.data,'1');
      this.setState({
        scheduleDateHeader:response.data.data
      })
    }).catch(error=>{
      console.log(error);
      }) 

    const requestData={
      doctordepart:this.state.doctordepart,
      doctorproject:this.state.doctorproject
    }
    GetdocScheduleList(requestData).then(response=>{
      console.log(response.data.data,'1');
      this.setState({
        doctorScheduleList:response.data.data
      })
    }).catch(error=>{
      console.log(error);
      })  

  }
  addFunc = () => {   
    this.setState({
      adddocvisible:!this.state.adddocvisible
    })

  }
  render(){
    console.log(this.state.adddocvisible);
    const { Option } = Select;
    return (
      <Fragment>
            <Row>
            <Col span={12}>
                <Col span={10} className='info_label'>医生科室：</Col>
                <Col span={14} className='info_input'>
                <Select defaultValue="" style={{ width: 355 }} 
                 onChange={(e) => this.selectChangedep(e)} 
                //  options={this.state.departlist.toString()}
                 value={this.state.doctordepart}>
                   {this.state.departlist.map((value,  label) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                    ))}
                    {/* <Option value="man">骨科</Option>
                    <Option value="woman">儿科</Option> */}
                    {/* {this.state.departlist.map((item,index)=>{
                      {item};
                    })} */}
                    {/* {this.mapdeplist()} */}
                    
                    
                </Select>
                </Col>
            </Col>
            <Col span={12}>
            <Col span={10} className='info_label'>医生项目：</Col>
              <Col span={14} className='info_input'>
              <Select defaultValue="" style={{ width: 355 }} 
              onChange={(e) => this.selectChangepro(e)} 
              value={this.state.doctorproject}>
                {this.state.projectlist.map((value,  label) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                    ))}
                  {/* <Option value="man">111</Option>
                  <Option value="woman">222</Option> */}
              </Select>
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
            <Button style={{ display: 'block',marginTop:'10px',marginBottom:'10px'}} 
            type='primary' onClick={() => this.addFunc()}><span
              style={{ letterSpacing: '2px' }}>添加医生</span>
          </Button>
          <ScheduleTableComponent
          scheduleDateHeader={this.state.scheduleDateHeader}
          doctorScheduleList={this.state.doctorScheduleList}
          />
          {this.state.adddocvisible && <AdddoctorForm 
          doctordepart={this.state.doctordepart}
          doctorproject={this.state.doctorproject}
          adddocvisible={this.state.adddocvisible}
          /> }
      </Fragment>
    )
  }
}


export default SearchBar;
