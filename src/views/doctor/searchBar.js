import React,{Fragment} from 'react';
import { Modal,Icon, Row, Col, Button, Radio, Input, Cascader, Select } from 'antd';
import { DownOutlined, UpOutlined  } from "@ant-design/icons";
import store from "../../store"
import "./style.css"
class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state=store.getState();
    this.state={
        unfolded:false,
    };
    store.subscribe(()=>{
      this.setState(store.getState())
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
  render(){
      const {unfolded}=this.state;
    return (
        <Fragment>
            <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>医生编号111：</Col>
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
                    <Input onChange={(e) => this.inputChange('doctordepart',e)} value={this.state.doctordepart} />
                </Col>
            </Col>
            </Row>:" "}
            <Button
              className="button_search"
              type="primary"
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
