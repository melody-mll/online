import React,{Component,Fragment} from 'react';
import "./aside.css"
import { MenuFoldOutlined} from '@ant-design/icons';
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
                    <h1 className={collapsed ? "logoclose":"logo"}><span className={collapsed ? "blockclose" : "block" }></span></h1>               
                <div className={collapsed?"header-wrapclose":"header-wrap"}>
                    <span style={{fontSize:"24px"}} onClick={this.iconclick}><MenuFoldOutlined /></span>
                </div>
            </Fragment>
        )
    }
}
export default LayoutHeader;