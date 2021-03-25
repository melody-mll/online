import React,{Fragment}  from 'react';
import { Modal,Input,Row,Col,Select,message } from 'antd';
import {GetScheduleDoctor,SaveScheduleDoctor} from '../../service/account'//导入接口
class AdddoctorForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
        adddocvisible:this.props.adddocvisible,
        doctorname:"",
        docid:"",
        date:"",
        week:"",
        registrationFee:0,
        registrationNum:0,
        doctorschedulelist:[],
        doctoridschedulelist:[]
    }
  }
  componentWillMount() {   
    const requestData={
        doctordepart:this.props.doctordepart,
        doctorproject:this.props.doctorproject
      }
      GetScheduleDoctor(requestData).then(response=>{
        const data=response.data.data;
        if(data){
          var doctorschedulelist=[];
          var doctoridschedulelist=[];
          for(var i=0,len=data.length;i<len;i++){
            var doctorscheduledata=data[i];
            doctorschedulelist.push(doctorscheduledata.doctorname);
            doctoridschedulelist.push(doctorscheduledata.doctorid);

          }
        }
        this.setState({
            doctorschedulelist:doctorschedulelist,
            doctoridschedulelist:doctoridschedulelist
          })
          console.log(this.state.doctorschedulelist,'dada')
      }).catch(error=>{
        console.log(error);
        })  
  }

  handleOk=()=>{
    const payload={
      doctordepart:this.props.doctordepart,
      doctorproject:this.props.doctorproject,
      name:this.state.doctorname,
      docid:this.state.docid
    }
    console.log('mll',payload);
    const requestData=payload;
    SaveScheduleDoctor(requestData).then(response=>{
      if(response.data.rescode == 1){
        message.success(response.data.message)
      }else{
        message.warning(response.data.message)
      }
      
      console.log(response.data.data);

    }).catch(error=>{
        console.log(error)
    })
      this.setState({
        adddocvisible:!this.state.adddocvisible
      })
   
  }
  handleCancel=()=>{
    this.setState({
        adddocvisible:!this.state.adddocvisible
      })
  }
  selectChange=(e)=>{
      this.setState({
          doctorname:e,      
      })
      this.state.doctorschedulelist.map((item,index)=>{
        if(item==e){
          this.setState({
            docid:this.state.doctoridschedulelist[index]
          })
        }
      })
  }

  render(){
      const { Option } = Select;
    return (
        <Fragment>
              <Modal title="添加医生" visible={this.state.adddocvisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生科室：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true} value={this.props.doctordepart}
                       /> 
                    </Col>
                </Row>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生项目：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input disabled={true} value={this.props.doctorproject}
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
                    <Select defaultValue="" style={{ width: 355 }} 
                        onChange={(e) => this.selectChange(e)} 
                        //  options={this.state.departlist.toString()}
                        value={this.state.doctorname}>
                            {this.state.doctorschedulelist.map((value,  label) => (
                              
                            <Option key={value} value={value}>
                            {value}
                            </Option>
                            ))}
                    </Select>
                    </Col>
                </Row>
                </div>
            </Modal>
        </Fragment>
    );
  }
}


export default AdddoctorForm;
