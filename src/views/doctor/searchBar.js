import React,{Fragment} from 'react';
import { Modal,Icon, Row, Col, Button, Radio, Input, Cascader, Select } from 'antd';
import { DownOutlined, UpOutlined  } from "@ant-design/icons";
import "./style.css"
class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
        unfolded:false
    };
  }
  unfoldedChange= () =>{
      this.setState({
          unfolded:!this.state.unfolded
      })   
  }
  inputChange= () =>{
    console.log(111);
  }
  render(){
      const {unfolded}=this.state;
    return (
        <Fragment>
            <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>医生编号：</Col>
                <Col span={14} className='info_input'>
                    <Input onChange={this.inputChange} value={12} />
                </Col>
            </Col>
              <Col span={8}>
              <Col span={10} className='info_label'>医生姓名：</Col>
                <Col span={14} className='info_input'>
                    <Input value={12} />
                </Col>
              </Col>
              <Col span={8}>
              <Col span={10} className='info_label'>电话号码：</Col>
                <Col span={14} className='info_input'>
                    <Input value={12} />
                </Col>
              </Col>
            </Row>
            {unfolded?
            <Row>
            <Col span={8}>
                <Col span={10} className='info_label'>医生职称：</Col>
                <Col span={14} className='info_input'>
                    <Input value={12} />
                </Col>
            </Col>
            <Col span={8}>
              <Col span={10} className='info_label'>所在科室：</Col>
                <Col span={14} className='info_input'>
                    <Input value={12} />
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
