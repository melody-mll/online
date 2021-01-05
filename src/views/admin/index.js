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
        this.state={};
    }
    render(){
        return (
            <Layout className="layout-wrap">
              <Header className="layout-header"><LayoutHeader/></Header>   
            <Layout>     
              <Sider width="250px" collapsed={this.state.collapsed}><Aside/></Sider>             
              <Content className="layout-main">
                 <ContainMain/>
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        )
    }
}
export default Index;