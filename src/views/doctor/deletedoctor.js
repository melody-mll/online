import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select,} from 'antd';
import {Deletedoctorlist} from '../../service/account'//导入接口
import store from "../../store";
class DoctorDelete extends React.Component{
  constructor(props){
    super(props);
    this.state={
        doctorid:this.props.doctorid,
        doctorname:this.props.doctorname,
        doctorsex:this.props.doctorsex,
        doctorage:this.props.doctorage,
        doctorphone:this.props.doctorphone,
        doctorposition:this.props.doctorposition,
        doctordepart:this.props.doctordepart,
        doctorproject:this.props.doctorproject,
        deletevisible:this.props.deletevisible,
        edittype:this.props.edittype
    }
  }
  handleCancel = () => {
    this.setState({   
        deletevisible:!this.state.deletevisible
    })
  };
  formDeleteEvent = () =>{
    const payload={
      doctorid:this.state.doctorid,
      doctorname:this.state.doctorname,
      doctorsex:this.state.doctorsex,
      doctorage:this.state.doctorage,
      doctorphone:this.state.doctorphone,
      doctorposition:this.state.doctorposition,
      doctordepart:this.state.doctordepart,
      doctorproject:this.state.doctorproject
    }
    const requestData = payload;
    this.setState({
      deletevisible:!this.state.deletevisible
    })
    Deletedoctorlist(requestData).then(response=>{
      console.log(response.data.data);
    }).catch(error=>{
        console.log(error)
    })
    console.log(payload);
  }
  closeModalEvent = () =>{
    this.setState({
      editvisible:false
  })
  };
  render(){
    const { Option } = Select;
    return (
        <Fragment>
          <Modal title="删除医生" visible={this.state.deletevisible} onCancel={this.handleCancel} footer={null}>
            <div>
            <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生编号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true} value={this.state.doctorid}
                       placeholder="请输入医生编号"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生姓名：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true} value={this.state.doctorname}
                       placeholder="请输入医生姓名"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生性别：
                        </span>
                    </Col>
                    <Col span={18}>
                    <Select defaultValue="man" disabled={true} style={{ width: 355 }} value={this.state.doctorsex}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                    </Select>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生年龄：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true}
                       value={this.state.doctorage}
                       placeholder="请输入医生年龄"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            电话号码：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true}
                       value={this.state.doctorphone}
                       placeholder="请输入医生电话号码"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生职位：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true}
                       value={this.state.doctorposition}
                       placeholder="请输入医生职位"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生科室：
                        </span>
                    </Col>
                    <Col span={18}>
                    <Select defaultValue="" style={{ width: 355 }} disabled={true} value={this.state.doctordepart}>
                    <Option value="man">骨科</Option>
                    <Option value="woman">儿科</Option>
                    </Select>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生项目：
                        </span>
                    </Col>
                    <Col span={18}>
                    <Select defaultValue="" style={{ width: 355 }} disabled={true} value={this.state.doctorproject}>
                    <Option value="man">111</Option>
                    <Option value="woman">222</Option>
                    </Select>
                    </Col>
                </Row>
                
                <div className="buttonmain">
                  <Button
                    className="buttonsave_content"
                    type="danger"
                    onClick={this.formDeleteEvent}
                  >
                    <span style={{ letterSpacing: '2px' }}>删除</span>
                  </Button>
                  <Button
                    className="buttoncancel_content"
                    onClick={this.handleCancel}
                  >
                    <span style={{ letterSpacing: '2px' }}>
                      取消
                    </span>
                  </Button>
                </div>
            </div>
          </Modal>
        </Fragment>
      );
    }
  }
export default DoctorDelete;