import React,{Fragment}  from 'react';
import moment from 'moment';
import { Button,Modal,Row,Col, Input,Select, message,DatePicker} from 'antd';
import {Savepatientlist,GetdepartList,GetprojectList} from '../../service/account'//导入接口
class PatientAdd extends React.Component{
  constructor(props){
    super(props);
    // this.state=store.getState();
    // const dateFormat = 'YYYY-MM-DD'; 
    // const clinicdate=this.props.clinicdate;
    // const clinicdates=moment(clinicdate).format(dateFormat);
    this.state={
      patientname:"",
      patientsex:"",
      patientid:"",
      patientage:"",
      patientphone:"",
      diseasename:"",
      diseasedetail:"",
      clinicdate:"",
      addvisible:this.props.addvisible
    }
    // this.state=store.getState();
//     store.subscribe(()=>{
//       this.setState(store.getState())
//   })
  }
  // componentWillMount() {
  //   GetdepartList().then(response=>{
  //     console.log(response.data.data,'1');
  //     const data=response.data.data;
  //     if(data){
  //       var departlist=[];
  //       for(var i=0,len=data.length;i<len;i++){
  //         var departdata=data[i];
  //         departlist.push(departdata.depart)
  //       }
  //     }
  //     this.setState({
  //       departlist:departlist
  //     })
  //     console.log('11111',this.state.departlist);
  //   }).catch(error=>{
  //     console.log(error);
  //     }) 

  //   GetprojectList().then(response=>{
  //     const data=response.data.data;
  //     if(data){
  //       var projectlist=[];
  //       for(var i=0,len=data.length;i<len;i++){
  //         var projectdata=data[i];
  //         projectlist.push(projectdata.projectname)
  //       }
  //     }
  //     this.setState({
  //       projectlist:projectlist
  //     })
  //     console.log('projectlist',this.state.projectlist);
  //     console.log(response.data.data,'1');
  //     // this.setState({
  //     //   doctorproject:response.data.data
  //     // })
  //   }).catch(error=>{
  //     console.log(error);
  //     })  

  // }
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
    const dateFormat = 'YYYY-MM-DD';
    const data=moment(dateString);
    this.setState({
      clinicdate:data
    });
    // this.setState({
    //   registerdate:this.state.registerdate.format(dateFormat)
    // })
    console.log(1);
  }
  handleCancel = () => {
    this.setState({   
        addvisible:!this.state.addvisible
    })
  };
  formSubmitEvent = () =>{
    if(!this.state.patientname){
      return message.warning("患者姓名不可为空！！！");
    }
    if(!/^[\u4e00-\u9fa5]{0,}$/g.test(this.state.patientname)){
      return message.warning("请输入正确的患者名称！！")
    }
    // if((this.state.patientname).match(/^[u4e00-u9fa5]{0,}$/g)){
    //   return message.warning("请输入正确的患者姓名！！！");
    // }
    // if(!/^[/u4e00-/u9fa5]$/g.test(this.state.patientname)){
    //   return message.warning("请输入正确的患者");
    // }
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
    const dateFormat = 'YYYY-MM-DD';
    const datefor=this.state.clinicdate;
    const payload = {
      patientname:this.state.patientname,
      patientsex:this.state.patientsex,
      patientid:this.state.patientid,
      patientage:this.state.patientage,
      patientphone:this.state.patientphone,
      diseasename:this.state.diseasename,
      diseasedetail:this.state.diseasedetail,
      clinicdate:moment(datefor).format(dateFormat),
    }
    console.log('88',payload);
    this.setState({
      addvisible:!this.state.addvisible
    })
    //编辑医生保存后，调用后端接口，把数据传给后端
    const requestData=payload;
    Savepatientlist(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
    }).catch(error=>{
        console.log(error)
    })

  }
  closeModalEvent = () =>{
    this.setState({
      addvisible:false
  })
  }
  render(){
    const { Option } = Select;
    const { TextArea } = Input;
    return (
        <Fragment>
          <Modal title="添加病人" visible={this.state.addvisible} onCancel={this.handleCancel} footer={null}>
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
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
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
                       
                    <DatePicker onChange={(date, dateString) =>
                      this.onChangedate(date, dateString)} 
                      value={this.state.clinicdate} 
                      allowClear={false}/>
                      {/* <span style={{lineHeight:"35px"}}>{this.state.clinicdate}</span> */}
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
export default PatientAdd;