import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select, message} from 'antd';
import {Saveprojectlist,GetdepartList} from '../../service/account'//导入接口
class ProjectAdd extends React.Component{
  constructor(props){
    super(props);    
    this.state={
        addvisible:this.props.addvisible,
        projectid:"",
        projectname:"",
        projectdep:"",
        departlist:[]
    }
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
  }

  handleCancel = () => {
    this.setState({  
        addvisible:!this.state.addvisible
    })
  };
  formSubmitEvent = () =>{
    if(!this.state.projectid){
      return message.warning("请输入项目编号！！")
    }
    if(!/^\d{9}$/g.test(this.state.projectid)){
      return message.warning("请输入9位数字的项目编号！！")
    }
    if(!this.state.projectname){
      return message.warning("请输入项目名称！！")
    }
    if(!/^[\u4e00-\u9fa5]{0,}$/g.test(this.state.projectname)){
      return message.warning("请输入正确的项目名称！！")
    }
    if(!this.state.projectdep){
      return message.warning("请选择项目所属科室！！")
    }
    const payload={
      projectid:this.state.projectid,
      projectname:this.state.projectname,
      projectdep:this.state.projectdep
    }
    this.setState({
      addvisible:!this.state.addvisible
    })
    //添加科室后，调用后端接口，把数据传给后端
    const requestData=payload;
    console.log('Saveprojectlist',requestData);
    Saveprojectlist(requestData).then(response=>{
      if(response.data.rescode == 1){
        message.success(response.data.message)
      }else{
        message.warning(response.data.message)
      }
      
     
    //   this.setState({
    //     list:response.data.data
    //   })
    }).catch(error=>{
        console.log(error)
    })
  }

  closeModalEvent = () =>{
    this.setState({
      addvisible:false
  })
  }
  inputChangeid=(e)=>{
      this.setState({
          projectid:e.target.value
      })
  }
  inputChange=(e)=>{
    this.setState({
          projectname:e.target.value
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
          <Modal title="添加项目" visible={this.state.addvisible} onCancel={this.handleCancel} footer={null}>
            <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            项目编号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChangeid(e)} value={this.state.projectid}
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
                       onChange={(e) => this.inputChange(e)} value={this.state.projectname}
                       placeholder="请输入项目名称"
                       /> 
                    </Col>
                </Row>
                <Row>
                    <Col span={6} className='form_title'>所属科室：</Col>
                    <Col span={18}>
                    <Select defaultValue="" style={{ width: 355 }} 
                    onChange={(e) => this.selectChangedep(e)} 
                    //  options={this.state.departlist.toString()}
                    value={this.state.projectdep}>
                      {this.state.departlist.map((value,  label) => (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                        ))}                  
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
export default ProjectAdd;