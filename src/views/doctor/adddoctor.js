import React,{Fragment}  from 'react';
import { Button,Modal,Row,Col, Input,Select, message} from 'antd';
import store from "../../store";
import {Savedoctorlist,GetdepartList,GetprojectList} from '../../service/account'//导入接口
class DoctorAdd extends React.Component{
  constructor(props){
    super(props);    
    this.state={
        addvisible:this.props.addvisible,
        departlist:[],
        projectlist:[]
        // list:this.props.list
    }
    store.subscribe(()=>{
      this.setState(store.getState())
  })
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
  inputChange= (prop, e) =>{
    const action={
      type:"update-doctorlist",
      payload: {
        [prop]: e.target.value
      }
    };
    store.dispatch(action);
}
  selectChange= (prop, e) =>{
    const action={
      type:"update-doctorlist",
      payload: {
        [prop]: e
      }
    };
    store.dispatch(action);
  }
  handleCancel = () => {
    this.setState({  
        addvisible:!this.state.addvisible
    })
  };
  formSubmitEvent = () =>{
    if(!this.state.doctorlist.doctorid){
      return message.warning("医生编号不可为空！！！");
    }
    if(!this.state.doctorlist.doctorname){
      return message.warning("医生姓名不可为空！！！");
    }
    if(!this.state.doctorlist.doctorsex){
      return message.warning("医生性别不可为空！！！");
    }
    if(!this.state.doctorlist.doctorage){
      return message.warning("医生年龄不可为空！！！");
    }
    if(this.state.doctorlist.doctorage>100||this.state.doctorlist.doctorage<18){
      return message.warning("请输入正确的医生年龄！！！");
    }
    if(!this.state.doctorlist.doctorphone){
      return message.warning("医生电话不可为空！！！");
    }
    if(!/^[1][3,4,5,7,8][0-9]{9}$/g.test(this.state.doctorlist.doctorphone)){
      return message.warning("请输入正确的手机号")
    }
    if(!this.state.doctorlist.doctorposition){
      return message.warning("医生职位不可为空！！！");
    }
    if(!this.state.doctorlist.doctordepart){
      return message.warning("医生科室不可为空！！！");
    }
    if(!this.state.doctorlist.doctorproject){
      return message.warning("医生所属项目不可为空！！！");
    }
    const payload={
      doctorid:this.state.doctorlist.doctorid,
      doctorname:this.state.doctorlist.doctorname,
      doctorsex:this.state.doctorlist.doctorsex,
      doctorage:this.state.doctorlist.doctorage,
      doctorphone:this.state.doctorlist.doctorphone,
      doctorposition:this.state.doctorlist.doctorposition,
      doctordepart:this.state.doctorlist.doctordepart,
      doctorproject:this.state.doctorlist.doctorproject
    }
    this.setState({
      addvisible:!this.state.addvisible
    })
    //添加医生后，调用后端接口，把数据传给后端
    const requestData=payload;
    Savedoctorlist(requestData).then(response=>{
      message.success(response.data.message)
      console.log(response.data.data);
      this.setState({
        list:response.data.data
      })
    }).catch(error=>{
        console.log(error)
    })

  // Getdoctorlist(list).then(response=>{
  //   const list=response.data.data;
  //   this.setState({
  //     list
  //   })
  // }).catch(error=>{
  // })

    console.log(payload);
  }
  closeModalEvent = () =>{
    this.setState({
      addvisible:false
  })
  }
  render(){
    const { Option } = Select;
    return (
        <Fragment>
          <Modal title="添加医生" visible={this.state.addvisible} onCancel={this.handleCancel} footer={null}>
            <div>
            <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生编号：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       onChange={(e) => this.inputChange('doctorid',e)} value={this.state.doctorid}
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
                       <Input
                       onChange={(e) => this.inputChange('doctorname',e)} value={this.state.doctorname}
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
                    <Select defaultValue="man" style={{ width: 355 }} onChange={(e) => this.selectChange('doctorsex',e)}  value={this.state.doctorsex}>
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
                       <Input
                       onChange={(e) => this.inputChange('doctorage',e)} value={this.state.doctorage}
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
                       <Input
                       onChange={(e) => this.inputChange('doctorphone',e)} value={this.state.doctorphone}
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
                       <Input
                       onChange={(e) => this.inputChange('doctorposition',e)} value={this.state.doctorposition}
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
                    {/* <Select defaultValue="" style={{ width: 355 }}  onChange={(e) => this.selectChange('doctordepart',e)} value={this.state.doctordepart}>
                    <Option value="man">骨科</Option>
                    <Option value="woman">儿科</Option>
                    </Select> */}
                    <Select defaultValue="" style={{ width: 355 }} 
                    onChange={(e) => this.selectChange('doctordepart',e)}
                    value={this.state.doctordepart}>
                      {this.state.departlist.map((value,  label) => (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                        ))}      
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
                    {/* <Select defaultValue="" style={{ width: 355 }} onChange={(e) => this.selectChange('doctorproject',e)} value={this.state.doctorproject}>
                    <Option value="man">111</Option>
                    <Option value="woman">222</Option>
                    </Select> */}
                    <Select defaultValue="" style={{ width: 355 }} 
                    onChange={(e) => this.selectChange('doctorproject',e)}
                    value={this.state.doctorproject}>
                      {this.state.projectlist.map((value,  label) => (
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
export default DoctorAdd;