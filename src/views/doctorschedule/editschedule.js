import React,{Fragment}  from 'react';
import { Modal,Input,Row,Col,Select } from 'antd';
import {GetdocScheduleList,SaveEditSchedule} from '../../service/account'//导入接口
class EditSchedule extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editschedulevisible:this.props.editschedulevisible,
      docid:this.props.docid,
      date:this.props.date,
      registrationFee:this.props.details[0].registrationFee,
      registrationNum:this.props.details[0].registrationNum
    }
  }


  handleOk=()=>{
    const requestData={
      docid:this.state.docid,
      date:this.state.date,
      registrationFee:this.state.registrationFee,
      registrationNum:this.state.registrationNum
    }
    SaveEditSchedule(requestData).then(response=>{   
      console.log(response.data.data);
    }).catch(error=>{
        console.log(error)
    })
    
    //点击保存后需要重新渲染页面

    // GetdocScheduleList(requestData).then(response=>{
    //   console.log(response.data.data,'1');
    //   this.setState({
    //     doctorScheduleList:response.data.data
    //   })
    // }).catch(error=>{
    //   console.log(error);
    //   }) 

      this.setState({
        editschedulevisible:!this.state.editschedulevisible
      })
  }
  handleCancel=()=>{
    this.setState({
      editschedulevisible:!this.state.editschedulevisible
      })
  }
  inputchangenum=(e)=>{
    this.setState({
      registrationNum:e.target.value
    })
  }
  inputchangefee=(e)=>{
    this.setState({
      registrationFee:e.target.value
    })
  }


  render(){
    console.log(this.props.details[0].registrationNum,'000');
    return (
        <Fragment>
              <Modal title="排班管理"
               visible={this.state.editschedulevisible} 
               onOk={this.handleOk} 
               onCancel={this.handleCancel}>
                <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            挂号数量：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={this.inputchangenum}
                       value={this.state.registrationNum}
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            挂号费用：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input 
                       onChange={this.inputchangefee}
                        value={this.state.registrationFee}
                       /> 
                    </Col>
                </Row>
                </div>
            </Modal>
        </Fragment>
    );
  }
}


export default EditSchedule;
