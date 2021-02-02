import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select, message} from 'antd';
import {Savedepartlist} from '../../service/account'//导入接口
class DepartDelete extends React.Component{
  constructor(props){
    super(props);    
    this.state={
        deletevisible:this.props.deletevisible,
        depart:this.props.depart,
        departid:this.props.departid
    }
  }
  handleCancel = () => {
    this.setState({  
      deletevisible:!this.state.deletevisible
    })
  };
  formSubmitEvent = () =>{
    const payload={
        depart:this.state.depart,
        departid:this.state.departid
    }
    this.setState({
      deletevisible:!this.state.deletevisible
    })
    //添加科室后，调用后端接口，把数据传给后端
    const requestData=payload;
    Savedepartlist(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
    //   this.setState({
    //     list:response.data.data
    //   })
    }).catch(error=>{
        console.log(error)
    })
    console.log(payload);
  }

  closeModalEvent = () =>{
    this.setState({
      deletevisible:false
  })
  }
  inputChangeid=(e)=>{
      this.setState({
          departid:e.target.value
      })
  }
  inputChange=(e)=>{
    this.setState({
        depart:e.target.value
    })
  }
  render(){
    return (
        <Fragment>
          <Modal title="删除科室" visible={this.state.deletevisible} onCancel={this.handleCancel} footer={null}>
            <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            科室编号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChangeid(e)} value={this.state.departid}
                       placeholder="请输入科室编号"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            科室名称：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange(e)} value={this.state.depart}
                       placeholder="请输入科室名称"
                       /> 
                    </Col>
                </Row>

                <div className="buttonmain">
                  <Button
                    className="buttonsave_content"
                    type="danger"
                    onClick={this.formSubmitEvent}
                  >
                    <span style={{ letterSpacing: '2px' }}>删除</span>
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
export default DepartDelete;