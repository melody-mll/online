import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select, message} from 'antd';
import moment from 'moment';
import {Saveregisterinformation} from '../../service/account'//导入接口
class RegisterInformationEdit extends React.Component{
  constructor(props){
    super(props);  
    const dateFormat = 'YYYY-MM-DD'; 
    const registerdate=this.props.registerdate;
    const registerdates=moment(registerdate).format(dateFormat);
    this.state={
        editvisible:this.props.editvisible,
        patientname:this.props.patientname,
        patientphone:this.props.patientphone,
        patientid:this.props.patientid,
        depname:this.props.depname,
        projectname:this.props.projectname,
        doctorname:this.props.doctorname,
        registerdate:registerdates,
        registerstatus:this.props.registerstatus
    }
  }

  handleCancel = () => {
    this.setState({  
      // patientname:"",
      // patientid:"",
      // registerdate:"",
      editvisible:!this.state.editvisible
    })
  };
  formSubmitEvent = () =>{
    console.log('thisthis',this.state);
    const payload=this.state;
    this.setState({
      editvisible:!this.state.editvisible
    })
    //进行编辑保存后，将信息进行保存更改
    const requestData=payload;
    console.log('Saveprojectlist',requestData);
    Saveregisterinformation(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
    //   this.setState({
    //     list:response.data.data
    //   })
    }).catch(error=>{
        console.log(error)
    })
  }

  closeModalEvent = () =>{
    this.setState({
      editvisible:false
  })
  }
  inputChangeid=(e)=>{
      this.setState({
          projectid:e.target.value
      })
  }
  inputChange=(e)=>{
    this.setState({
          registerstatus:e
    })
  }
  selectChangedep=(e)=>{
    this.setState({
      projectdep:e
    })
  }
  render(){
    const {Option} = Select;
    return (
        <Fragment>
          <Modal title="编辑" visible={this.state.editvisible} onCancel={this.handleCancel} footer={null}>
            <div>
            <Row className="form_padding">
                <Col span={6}>
                    <span className="form_title">
                        患者姓名：
                    </span>
                </Col>
                <Col span={18}>
                    {/* <Input
                    onChange={(e) => this.inputChangeid(e)} value={this.state.patientname}
                    // placeholder="请输入"
                    />  */}
                    <span style={{lineHeight:"30px"}}>{this.state.patientname}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6}>
                    <span className="form_title">
                        患者手机号：
                    </span>
                </Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.patientphone}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>患者证件号：</Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.patientid}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>预约科室：</Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.depname}</span> 
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>预约项目：</Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.projectname}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>预约医生：</Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.doctorname}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>预约日期：</Col>
                <Col span={18}>
                <span style={{lineHeight:"30px"}}>{this.state.registerdate}</span>
                </Col>
            </Row>
            <Row className="form_padding">
                <Col span={6} className='form_title'>预约状态：</Col>
                <Col span={18}>
                    <Select
                    onChange={(e) => this.inputChange(e)} value={this.state.registerstatus}
                    // placeholder="请输入项目名称"
                    
                    >
                    <Option value="registeredsuccess">预约成功</Option>
                    <Option value="already">已就诊</Option>
                    <Option value="timeout">已失效</Option>
                    </Select>
                </Col>
            </Row>

            <div className="buttonmain">
              <Button
                className="buttonsave_content"
                type="primary"
                onClick={this.formSubmitEvent}
              >
                <span style={{ letterSpacing: '2px' }}>保存</span>
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
    };
  }
export default RegisterInformationEdit;