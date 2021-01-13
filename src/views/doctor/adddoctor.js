import React,{Fragment}  from 'react';
import { Table,Button,Modal,Row,Col, Input,Select} from 'antd';
class DoctorAdd extends React.Component{
  constructor(props){
    super(props);
    this.state={
        addvisible:this.props.addvisible,
    }
  }
  handleCancel = () => {
    this.setState({
        addvisible:false
    })
  };
  handleChangeSex = () =>{
      console.log(111);
  }
  render(){
    const { Option } = Select;
    return (
        <Fragment>
          <Modal title="添加医生" visible={this.state.addvisible} onCancel={this.handleCancel}>
            <div>
                <Row className="form_padding">
                    <Col span={6}>
                        <span className="form_title">
                            医生姓名：
                        </span>
                    </Col>
                    <Col span={18}>
                       <Input
                       value={22}
                       onChange={this.changeinput}
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
                    <Select defaultValue="男" style={{ width: 120 }} onChange={this.handleChangeSex}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                    </Select>
                    </Col>
                </Row>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            </div>
          </Modal>
        </Fragment>
      );
    };
  }
export default DoctorAdd;