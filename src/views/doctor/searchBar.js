import React,{Fragment} from 'react';
import { Row, Col, Button, Input,Select} from 'antd';
import { DownOutlined, UpOutlined  } from "@ant-design/icons";
import {Getdoctorlist,GetdepartList} from '../../service/account'//导入接口
import store from "../../store"
import "./style.css"
class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state=store.getState();
    this.state={
        unfolded:false,
        departlist:[]
    };
    store.subscribe(()=>{
      this.setState(store.getState())
  })
  }
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
    }
  unfoldedChange= () =>{
      this.setState({
          unfolded:!this.state.unfolded
      })
      console.log(this.state);   
  }
  inputChange= (prop, e) =>{
      const action={
        type:"update-form",
        payload: {
          [prop]: e.target.value
        }
      };
      store.dispatch(action);
  }
  selectChangedep=(e)=>{
    this.setState({
      doctordepart:e
    })
  }
  doctorlistSearch =() =>{
    const requestData = {
      doctorid: this.state.doctorid,
      doctorname:this.state.doctorname,
      doctorphone:this.state.doctorphone,
      doctorposition:this.state.doctorposition,
      doctordepart:this.state.doctordepart
    }
    //点击查询后应该根据条件返回结果
    Getdoctorlist(requestData).then(response=>{
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })
  }
  render(){
      const {unfolded}=this.state;
      const {Option}=Select;
    return (
        <Fragment>
            <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>医生编号：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={(e) => this.inputChange('doctorid',e)} value={this.state.doctorid} />
                </Col>
            </Col>
              <Col span={8}>
              <Col span={10} className='info_label'>医生姓名：</Col>
                <Col span={14} className='info_input'>
                    <Input  onChange={(e) => this.inputChange('doctorname',e)} value={this.state.doctorname} />
                </Col>
              </Col>
              <Col span={8}>
              <Col span={10} className='info_label'>电话号码：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={(e) => this.inputChange('doctorphone',e)} value={this.state.doctorphone} />
                </Col>
              </Col>
            </Row>
            {unfolded?
            <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>医生职称：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={(e) => this.inputChange('doctorposition',e)} value={this.state.doctorposition} />
                </Col>
            </Col>
            <Col span={8}>
              <Col span={10} className='info_label'>所在科室：</Col>
              <Col span={14} className='info_input'>
                <Select defaultValue="" style={{width:"175px"}}
                 onChange={(e) => this.selectChangedep(e)} 
                 value={this.state.doctordepart}>
                   {this.state.departlist.map((value,  label) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                    ))}     
                </Select>
                    {/* <Input 
                    onChange={(e) => this.inputChange('doctordepart',e)} 
                    value={this.state.doctordepart} /> */}
                </Col>
            </Col>
            </Row>:" "}
            <Button
              className="button_search"
              type="primary"
              onClick={this.doctorlistSearch}
            >
              查询
            </Button>
            <div className="unfold_text" onClick={this.unfoldedChange}>
                {unfolded?<span>收起</span>:<span>展开</span>}
                {unfolded?<UpOutlined />:<DownOutlined />}
                
            </div>
        </Fragment>
    )
  }
}


export default SearchBar;
