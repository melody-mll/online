import React,{Component,Fragment} from 'react';
import "./aside.css"
import { MenuFoldOutlined} from '@ant-design/icons';
class LayoutHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            collapsed:props.collapsed,
            // usernow:this.props.usernow
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
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        // let zhou=new Date().getDay(); 这种方式也可以获取周几
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        const value=year+"-"+month+"-"+date;
        const day = new Date(Date.parse(value.replace(/-/g, '/')));
        const today = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        //    const newdate=new Date("month dd,yyyy hh:mm:ss");
        //    console.log(newdate);
       
        return (
            <Fragment>
                    <h1 className={collapsed ? "logoclose":"logo"}><span className={collapsed ? "blockclose" : "block" }></span></h1>               
                <div className={collapsed?"header-wrapclose":"header-wrap"}>
                    <span style={{fontSize:"24px"}} onClick={this.iconclick}><MenuFoldOutlined /></span>
                    {/* <span>{newdate}</span> */}
                    
                    <span className="header_date">{year+"-"+month+"-"+date+"  "}</span>
                    <span className="header_week">{today[day.getDay()]}</span>
                    {/* <span className="header_nowuser">当前用户：{this.state.usernow}</span> */}
                </div>
            </Fragment>
        )
    }
}
export default LayoutHeader;