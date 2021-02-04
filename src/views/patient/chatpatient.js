import React,{Fragment}  from 'react';
import moment from 'moment';
import "./style.css";
import {PictureTwoTone} from "@ant-design/icons";
import { Button,Modal,Row,Col, Input,Select, message,DatePicker} from 'antd';
import {Savepatientlist,GetdepartList,GetprojectList} from '../../service/account'//导入接口
class PatientChat extends React.Component{
  constructor(props){
    super(props);
    // this.state=store.getState();
    const dateFormat = 'YYYY-MM-DD'; 
    const clinicdate=this.props.clinicdate;
    const clinicdates=moment(clinicdate).format(dateFormat);
    this.state={
      patientname:this.props.patientname,
      patientsex:this.props.patientsex,
      patientid:this.props.patientid,
      patientage:this.props.patientage,
      patientphone:this.props.patientphone,
      diseasename:this.props.diseasename,
      diseasedetail:this.props.diseasedetail,
      clinicdate:clinicdates,
      chatvisible:this.props.chatvisible
    }
    // this.state=store.getState();
//     store.subscribe(()=>{
//       this.setState(store.getState())
//   })
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

    GetprojectList().then(response=>{
      const data=response.data.data;
      if(data){
        var projectlist=[];
        for(var i=0,len=data.length;i<len;i++){
          var projectdata=data[i];
          projectlist.push(projectdata.projectname)
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
        chatvisible:!this.state.chatvisible
    })
  };
  formSubmitEvent = () =>{
    // if(!this.state.doctorid){
    //   return message.warning("医生编号不可为空！！！");
    // }
    // if(!this.state.doctorname){
    //   return message.warning("医生姓名不可为空！！！");
    // }
    // if(!this.state.doctorsex){
    //   return message.warning("医生性别不可为空！！！");
    // }
    // if(!this.state.doctorage){
    //   return message.warning("医生年龄不可为空！！！");
    // }
    // if(this.state.doctorage>100||this.state.doctorage<18){
    //   return message.warning("请输入正确的医生年龄！！！");
    // }
    // if(!this.state.doctorphone){
    //   return message.warning("医生电话不可为空！！！");
    // }
    // if(!/^[1][3,4,5,7,8][0-9]{9}$/g.test(this.state.doctorphone)){
    //   return message.warning("请输入正确的手机号")
    // }
    // if(!this.state.doctorposition){
    //   return message.warning("医生职位不可为空！！！");
    // }
    // if(!this.state.doctordepart){
    //   return message.warning("医生科室不可为空！！！");
    // }
    // if(!this.state.doctorproject){
    //   return message.warning("医生所属项目不可为空！！！");
    // }
    const payload={
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
      chatvisible:!this.state.chatvisible
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
      chatvisible:false
  })
  }
  render(){
    const { Option } = Select;
    const { TextArea } = Input;
    return (
        <Fragment>
          <Modal title="详情" visible={this.state.chatvisible} width="1000px" onCancel={this.handleCancel} footer={null}>
            <div>
              <div className="detail_left">
            <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者姓名：
                        </span>
                    </Col>
                    <Col span={18}>
                       {/* <Input 
                       onChange={(e) => this.inputChange('patientname',e)} value={this.state.patientname}
                       
                       />  */}
                       <span style={{lineHeight:"30px"}}>{this.state.patientname}</span>
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
                       {/* <Select style={{ width: 355 }} onChange={(e) => this.selectChange('patientsex',e)}  value={this.state.patientsex}>
                        <Option value="man">男</Option>
                        <Option value="woman">女</Option>
                      </Select> */}
                      <span style={{lineHeight:"30px"}}>{this.state.patientsex}</span>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者证件号：
                        </span>
                    </Col>
                    <Col span={18}>
                    <span style={{lineHeight:"30px"}}>{this.state.patientid}</span>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者年龄：
                        </span>
                    </Col>
                    <Col span={18}>
                    <span style={{lineHeight:"30px"}}>{this.state.patientage}</span>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            患者电话：
                        </span>
                    </Col>
                    <Col span={18}>
                    <span style={{lineHeight:"30px"}}>{this.state.patientphone}</span>
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            疾病名称：
                        </span>
                    </Col>
                    <Col span={18}>
                    <span style={{lineHeight:"30px"}}>{this.state.diseasename}</span>
                       
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
                       <span style={{lineHeight:"30px"}}>{this.state.diseasedetail}</span>
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
                </div>
                <div className="chat_right"
                >
                  <div className="chat_right_chat"></div>
                  <div className="chat_right_send">
                  
                    <div className="send_information">
                      <div style={{marginLeft:"5px"}}><PictureTwoTone /></div>
                      <div style={{marginLeft:"5px"}}>请输入消息</div>
                    </div>
                    <div className="send_button">
                      <button>
                        发送
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="buttonmain" style={{clear:'both'}}>
                  {/* <Button
                    className="buttonsave_content"
                    type="primary"
                    onClick={this.formSubmitEvent}
                  >
                    <span style={{ letterSpacing: '2px' }}>保存</span>
                  </Button> */}
                  <Button
                    className="buttoncancel_content"
                    onClick={this.closeModalEvent}
                  >
                    <span style={{ letterSpacing: '2px' ,margin:"auto"}} >
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
export default PatientChat;