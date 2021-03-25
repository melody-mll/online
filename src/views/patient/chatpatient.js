import React,{Fragment}  from 'react';
import moment from 'moment';
import styles from "./style.css";
import Chat from './chat';
import WebsocketHeartbeat from 'websocket-heartbeat-miniprogram';
import {PictureTwoTone} from "@ant-design/icons";
import { Button,Modal,Row,Col, Input,Select, message,DatePicker} from 'antd';
import {Savepatientlist,GetdepartList,GetprojectList,Getchatrecord} from '../../service/account'//导入接口

const myIcon = require('../../images/player-self.png');
const otherSideIcon = require('../../images/player-other.png');

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
      chatvisible:this.props.chatvisible,
      list:[],
      text:''
    }
    // this.state=store.getState();
//     store.subscribe(()=>{
//       this.setState(store.getState())
//   })
  }
  componentWillMount() {
    this.createWebSocketTask();
    // GetdepartList().then(response=>{
    //   console.log(response.data.data,'1');
    //   const data=response.data.data;
    //   if(data){
    //     var departlist=[];
    //     for(var i=0,len=data.length;i<len;i++){
    //       var departdata=data[i];
    //       departlist.push(departdata.depart)
    //     }
    //   }
    //   this.setState({
    //     departlist:departlist
    //   })
    //   console.log('11111',this.state.departlist);
    // }).catch(error=>{
    //   console.log(error);
    //   }) 

    // GetprojectList().then(response=>{
    //   const data=response.data.data;
    //   if(data){
    //     var projectlist=[];
    //     for(var i=0,len=data.length;i<len;i++){
    //       var projectdata=data[i];
    //       projectlist.push(projectdata.projectname)
    //     }
    //   }
    //   this.setState({
    //     projectlist:projectlist
    //   })
    //   console.log('projectlist',this.state.projectlist);
    //   console.log(response.data.data,'1');
    //   // this.setState({
    //   //   doctorproject:response.data.data
    //   // })
    // }).catch(error=>{
    //   console.log(error);
    // })  
    Getchatrecord().then(response=>{
      const data=response.data.data;
      this.setState({
        list:data
      })
    }).catch(error=>{
      console.log(error);
    }) 

  }
  createWebSocketTask = () => {
    console.log('createWebSocketTask');
  }
  renderMessage = (item) => {
    const isDoctor = item.sendUserType === 2;//表示发送方是医生
    return isDoctor ? (
      <div id={item.id} key={item.id} className="doctors">
        {this.renderMessageContent(item)}
        <img className={styles.avatar} src='https://ae01.alicdn.com/kf/U72877ec302e740359cbb76f4c8d3fbd6q.jpg'  alt="头像" />
      </div>
    ) : (
      // <div id={item.id} key={item.id} className={classnames(styles.item, styles.other)}>
      <div id={item.id} key={item.id} className="users">
        <img className={styles.avatar} src='https://ae01.alicdn.com/kf/U572870ed31ef4b67b0998f75f9c1f38c5.jpg' alt="头像" />
        {this.renderMessageContent(item)}
      </div>
    );
  }
  renderMessageContent = (item) => {
    return (
      // <div className={classnames(styles.msg, styles.text)}>
      <div className="msg">
        {item.content.split('\n').map((text, index) => {
          return (
            <div key={index} className="content">
              {text}
            </div>
          );
        })}
        <div className={"arrow"} />
      </div>
    );
  }
  handleChange = (e) =>{
    this.setState({
      text:e.target.value
    })
  }
  // handleClick = () =>{
  //   console.log('111');
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
showError = (t, c) => {
  Modal.error({
    zIndex: '99999',
    title: t,
    content: c,
    okText: '确定'
  });
};
  handleClick = () =>{
    const param = {msg:this.state.text, type: 'text'}
    //将对话信息进行发送
    //if(this.send(param)){//将数据发送到后端
      this.addNewMsg(param);
    //} 
    this.setState({
      text:''
    })
    console.log('11132');
  }
  send = ({ msg, type })=> {
    if (this.socket.isConnected()) {
      this.socket.send(this.createMsgObj({ msg, type }));
      return true;
    } else {
      this.showError('对话连接已断开，请关闭对话框重试');
      return false;
    }
  }
  addNewMsg({ msgObj, msg, type, fromServer }) {
   // const isBottom = this.listContent.clientHeight - this.list.scrollTop - this.listContainerHeight < 20;
    const newMsgObj = msgObj || this.createMsgObj({ msg, type, complete: true });
    // 可能存在 addNewMsg 被短时间内多次调用的情况（比如同时上传多个文件时）
    // 为避免 this.state.list 最新值无法获取，采用以下方式更新数据
    this.state.list.push(newMsgObj);
    // this.state.list = insertTimeTagToList(this.state.list);
    // this.setState({}, () => {
    //   if (fromServer) {
    //     if (isBottom) {
    //       this.list.scrollTop = this.listContent.clientHeight;
    //     }
    //   } else {
    //     this.list.scrollTop = this.listContent.clientHeight;
    //   }
    //   this.lastListContentHeight = this.listContent.clientHeight;
    //   this.lastScrollTop = this.list.scrollTop;
    // });
  }
  createMsgObj({ msg, type, complete = false } = {}){
    // const { msgCenterState } = this.props;
    // const caseInfo = msgCenterState.caseInfo;
    // const msgType = MsgFormat.contentType[type] || MsgFormat.contentType.text;
    let msgObj = {
      // msgId: createId(), // 信息 Id，后端生成，前端不用传
      relationId: "51087806809767936", // 小程序用户消息和业务系统消息关联id，例：诊疗系统的病例id
      sysType: 2, // 对接业务系统: 1-诊疗咨询（treat）
      sendUserId: "61280", // 发送人 id
      sendUserType: 2, // 发送人类型: 1-小程序用户；2-业务系统用户(诊疗端医生)
      contentType: 1, // 消息内容类型: 1-文本；2-图片
      content: msg // 消息内容
      // createDate: dayjs().format('YYYY年MM月DD日 HH:mm'), // 生成时间，后端生成，前端不用传
    };
    // 返回完整数据，用于前端展示
    if (complete) {
      msgObj.msgId = "51087806809767936";
      msgObj.createDate = "2021-02-10";
    }
    return msgObj;
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
                  <div className="chat_right_chat">
                  {this.state.list.map(item => {
                    if (item.contentType === 'time') {
                      return (
                        <div id={item.id} key={item.id} className={styles.dateLabel}>
                          {item.createDate}
                          {/* {dayjs(item.createDate).format('YYYY年MM月DD日 HH:mm')} */}
                        </div>
                      );
                    }
                    return this.renderMessage(item);
                  })}
                  </div>
                  <div className="chat_right_send">                 
                    <textarea
                      placeholder='请输入消息'
                      value={this.state.text}
                      onChange={(e)=>this.handleChange(e)}
                    ></textarea>
                      {/* <div style={{marginLeft:"5px"}}><PictureTwoTone /></div> */}
                      {/* <div style={{marginLeft:"5px"}}>请输入消息</div> */}
                    <div className="send_button">
                      <button onClick={this.handleClick}>
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