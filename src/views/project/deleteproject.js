import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select, message,Popconfirm} from 'antd';
import {Deleteprojectlist} from '../../service/account'//导入接口
class ProjectDelete extends React.Component{
  constructor(props){
    super(props);    
    this.state={
        deletevisible:this.props.deletevisible,
        projectid:this.props.projectid,
        projectname:this.props.projectname,
        projectdep:this.props.projectdep,
    }
  }
  handleCancel = () => {
    this.setState({  
      deletevisible:!this.state.deletevisible
    })
  };
  confirm = () =>{
    const payload={
      projectid:this.props.projectid,
      projectname:this.props.projectname,
      projectdep:this.props.projectdep,
    }
    this.setState({
      deletevisible:!this.state.deletevisible
    })
    const requestData=payload;
    Deleteprojectlist(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
    //   this.setState({
    //     list:response.data.data
    //   })
    }).catch(error=>{
        console.log(error)
    })
  }
  cancel = () =>{
    console.log("cancel");
  }
  // formSubmitEvent = () =>{
  //   const payload={
  //     projectid:this.props.projectid,
  //     projectname:this.props.projectname,
  //     projectdep:this.props.projectdep,
  //   }
  //   this.setState({
  //     deletevisible:!this.state.deletevisible
  //   })
  //   const requestData=payload;
  //   Deleteprojectlist(requestData).then(response=>{
  //     message.success(response.data.message)
  //     console.log(response.data.data);
  //   //   this.setState({
  //   //     list:response.data.data
  //   //   })
  //   }).catch(error=>{
  //       console.log(error)
  //   })
  //   console.log(payload);
  // }

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
          <Modal title="删除项目" visible={this.state.deletevisible} onCancel={this.handleCancel} footer={null}>
            <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            项目编号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChangeid(e)} disabled={true} value={this.state.projectid}
                       placeholder="请输入项目编号"
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            项目名称：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange(e)} disabled={true} value={this.state.projectname}
                       placeholder="请输入项目名称"
                       /> 
                    </Col>
                </Row>
                <Row>
                    <Col span={6} className='form_title'>所属科室：</Col>
                    <Col span={18}>
                    <Select defaultValue="" style={{ width: 355 }} 
                    onChange={(e) => this.selectChangedep(e)} 
                    disabled={true}
                    //  options={this.state.departlist.toString()}
                    value={this.state.projectdep}>                  
                    </Select>
                    </Col>
                </Row>

                <div className="buttonmain">
                  {/* <Button
                    className="buttonsave_content"
                    type="danger"
                    onClick={this.formSubmitEvent}
                  >
                    <span style={{ letterSpacing: '2px' }}>删除</span>
                  </Button> */}
                  <Popconfirm
                  title="是否删除这项数据?"
                  onConfirm={this.confirm}
                  onCancel={this.cancel}
                  okText="是"
                  cancelText="否"
                >
                  <Button
                    className="buttonsave_content"
                    type="danger"
                    // onClick={this.formDeleteEvent}
                  >
                    <span style={{ letterSpacing: '2px' }}>删除</span>
                  </Button>
                  </Popconfirm>
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
export default ProjectDelete;