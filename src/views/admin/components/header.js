import React,{Component,Fragment} from 'react';
import "./aside.css"
<<<<<<< HEAD
import { MenuFoldOutlined} from '@ant-design/icons';
=======
import {MenuFoldOutlined} from "@ant-design/icons";
>>>>>>> 8f81d8a1427c39e75c00cf78b5e68e601e05a473
class LayoutHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            collapsed:props.collapsed
        };
    }
    componentWillReceiveProps({collapsed}){
        this.setState({
            collapsed
        })
    }
    iconclick = ()=>{
        this.props.iconCollapsed();
    }
    render(){
        const {collapsed} = this.state;
        return (
            <Fragment>
<<<<<<< HEAD
                    <h1 className={collapsed ? "logoclose":"logo"}><span className={collapsed ? "blockclose" : "block" }></span></h1>               
                <div className={collapsed?"header-wrapclose":"header-wrap"}>
                    <span style={{fontSize:"24px"}} onClick={this.iconclick}><MenuFoldOutlined /></span>
=======
                <h1 className="logo"><span></span></h1>
                <div className="header-wrap">
                    <span style={{fontSize:"20px"}}><MenuFoldOutlined /></span>
>>>>>>> 8f81d8a1427c39e75c00cf78b5e68e601e05a473
                </div>
            </Fragment>
        )
    }
}
export default LayoutHeader;