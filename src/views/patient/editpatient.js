import React,{Fragment}  from 'react';
import moment from 'moment';
import { Button,Modal,Row,Col, Input,Select, message,DatePicker} from 'antd';
import {Updatepatientlist} from '../../service/account'//导入接口
class PatientEdit extends React.Component{
  constructor(props){
    super(props);
    // this.state=store.getState();
    const dateFormat = 'YYYY-MM-DD'; 
    const clinicdate=this.props.clinicdate;
    const clinicdates=moment(clinicdate).format(dateFormat);
    this.state={
      patientsqlid:this.props.patientsqlid,
      patientname:this.props.patientname,
      patientsex:this.props.patientsex,
      patientid:this.props.patientid,
      patientage:this.props.patientage,
      patientphone:this.props.patientphone,
      diseasename:this.props.diseasename,
      diseasedetail:this.props.diseasedetail,
      clinicdate:clinicdates,
      editvisible:this.props.editvisible
    }
  }
 
inputChange = (prop,e)=>{
    if(prop === 'patientname'){
        this.setState({
          patientname:e.target.value
        })
    }
    if(prop === 'patientsex'){
        this.setState({
          patientsex:e.target.value
        })
    }
    if(prop === 'patientid'){
        this.setState({
          patientid:e.target.value
        })
    }
    if(prop === 'patientage'){
        this.setState({
          patientage:e.target.value
        })
    }
    if(prop === 'patientphone'){
        this.setState({
          patientphone:e.target.value
        })
    }
    if(prop === 'diseasename'){
      this.setState({
        diseasename:e.target.value
      })
    }
    if(prop === 'diseasedetail'){
      this.setState({
        diseasedetail:e.target.value
      })
    } 
    if(prop === 'clinicdate'){
      this.setState({
        clinicdate:e.target.value
      })
    }   
}
  selectChange= (prop, e) =>{
    if(prop === 'patientsex'){
        this.setState({
          patientsex:e
        })
    } 
  }
  onChangedate=(date, dateString) => {
    // const dateFormat = 'YYYY-MM-DD';
    // const data=moment(dateString);
    // this.setState({
    //   clinicdate:data
    // });
    // this.setState({
    //   registerdate:this.state.registerdate.format(dateFormat)
    // })
    console.log(1);
  }
  handleCancel = () => {
    this.setState({   
        editvisible:!this.state.editvisible
    })
  };
  formSubmitEvent = () =>{
    if(!this.state.patientname){
      return message.warning("患者姓名不可为空！！！");
    }
    if(!/^[\u4e00-\u9fa5]{0,}$/g.test(this.state.patientname)){
      return message.warning("请输入正确的患者名称！！")
    }
    if(!this.state.patientsex){
      return message.warning("患者性别不可为空！！！");
    }
    if(!this.state.patientid){
      return message.warning("患者证件号不可为空！！！");
    }
    if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g.test(this.state.patientid)){
      return message.warning("请输入正确的证件号")
    }
    if(!this.state.patientage){
      return message.warning("患者年龄不可为空！！！");
    }
    if(!this.state.patientphone){
      return message.warning("患者电话不可为空！！！");
    }
    if(!/^[1][3,4,5,7,8][0-9]{9}$/g.test(this.state.patientphone)){
      return message.warning("请输入正确的手机号")
    }
    if(!this.state.diseasename){
      return message.warning("疾病名称不可为空！！！");
    }
    if(!this.state.diseasedetail){
      return message.warning("疾病详情不可为空！！！");
    }
    if(!this.state.clinicdate){
      return message.warning("就诊日期不可为空！！！");
    }
    const payload={
      patientsqlid:this.state.patientsqlid,
      patientname:this.state.patientname,
      patientsex:this.state.patientsex,
      patientid:this.state.patientid,
      patientage:this.state.patientage,
      patientphone:this.state.patientphone,
      diseasename:this.state.diseasename,
      diseasedetail:this.state.diseasedetail,
      clinicdate:this.state.clinicdate,
    }
    this.setState({
      editvisible:!this.state.editvisible
    })
    //编辑医生保存后，对患者信息进行更新
    const requestData=payload;
    Updatepatientlist(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
    }).catch(error=>{
        console.log(error)
    })

  }
  closeModalEvent = () =>{
    this.setState({
      editvisible:false
  })
  }
  render(){
    const { Option } = Select;
    const { TextArea } = Input;
    return (
        <Fragment>
          <Modal title="编辑病人" visible={this.state.editvisible} onCancel={this.handleCancel} footer={null}>
            <div>
            <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者姓名：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input 
                       onChange={(e) => this.inputChange('patientname',e)} value={this.state.patientname}
                       
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者性别：
                        </span>
                    </Col>
                    <Col span={18}>
                       {/* <Input
                       onChange={(e) => this.inputChange('patientsex',e)} value={this.state.patientsex}
                      
                       />  */}
                       <Select style={{ width: 355 }} onChange={(e) => this.selectChange('patientsex',e)}  value={this.state.patientsex}>
                        <Option value="man">男</Option>
                        <Option value="woman">女</Option>
                      </Select>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者证件号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange('patientid',e)} value={this.state.patientid}
                      
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者年龄：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange('patientage',e)} value={this.state.patientage}
                       
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者电话：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange('patientphone',e)} value={this.state.patientphone}
                       
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            疾病名称：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange('diseasename',e)} value={this.state.diseasename}
                       
                       /> 
                       
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            诊断详情：
                        </span>
                    </Col>
                    <Col span={18}>
                       {/* <Input
                       onChange={(e) => this.inputChange('diseasedetail',e)} value={this.state.diseasedetail}
                       
                       />  */}
                       <TextArea rows={4}  
                       onChange={(e) => this.inputChange('diseasedetail',e)} 
                       value={this.state.diseasedetail}/>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            就诊日期：
                        </span>
                    </Col>
                    <Col span={18}>
                       {/* <Input
                       onChange={(e) => this.inputChange('clinicdate',e)} value={this.state.clinicdate}
                       
                       />  */}
                       
                    {/* <DatePicker onChange={(date, dateString) =>
                      this.onChangedate(date, dateString)}  */}
                      {/* value={this.state.clinicdate} */}
                      {/* allowClear={false}/> */}
                      <span style={{lineHeight:"35px"}}>{this.state.clinicdate}</span>
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
                    onClick={this.closeModalEvent}
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
export default PatientEdit;