import React,{Component} from 'react';
import {Layout} from 'antd';
import "./index.css";
import Aside from "./components/aside"
import LayoutHeader from "./components/header"
import ContainMain from "../../components/ContainMain/index"
//import AsideMenu from "../../components/asideMenu/index"
const {Sider,Header,Content,Footer} =Layout;

class Index extends Component{
    constructor(props){
        super(props);
        this.state={
          collapsed:false
        };
    }
    iconCollapsed = () =>{
      this.setState({
        collapsed:!this.state.collapsed
      })
    }
    render(){
        return (
            <Layout className="layout-wrap">
              <Header className="layout-header" ><LayoutHeader iconCollapsed={this.iconCollapsed} collapsed={this.state.collapsed}/></Header>   
            <Layout>     
              <Sider width="250px" collapsed={this.state.collapsed}><Aside/></Sider>             
              <Content className="layout-main">
                 <ContainMain/>
              </Content>
            </Layout>
          </Layout>
        )
    }
}
export default Index;