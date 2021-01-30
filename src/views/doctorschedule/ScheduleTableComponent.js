import React, { Fragment } from 'react';
// import {Icon} from 'antd';
// import Icon from '@ant-design/icons';
// import { Icon } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import EditSchedule from "./editschedule";
import "./style.css"
class ScheduleTableComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scheduleDateHeader:this.props.scheduleDateHeader,
      doctorScheduleList:this.props.doctorScheduleList,
      editschedulevisible:false,
      docid:"",
      date:"",
      details:""
    };
  };

  // componentWillMount() {
  //   this.setState({
  //     scheduleDateHeader:this.state.scheduleDateHeader
  //   })
  // }
  getScheduleCells=(docid,infos)=>{
    if (!infos) return null;
    return infos.map((item,index)=>{
      if(item===null){
        return <div key={index} />;
      }else{
        const {details,date}=item;
        return (
          <Fragment>
            <div key={date} 
            className="scheduleCell" 
            onDoubleClick={() => this.editSchedule(docid, date, details)}>
            {this.getScheduleCellsDetail(details,docid)}
            </div>         
          </Fragment>
        )
      }
    })
    console.log(1);
  }
  getScheduleCellsDetail=(details,docid)=>{
    if(!details) return null;
    return details.map((item,index)=>{
      const {registrationFee,registrationNum} = item;
      return (
        <div key={docid} className="timeRow">
          <div>
          （{registrationNum}）
          ¥{registrationFee}
          </div>
        </div>
      )
    })
  }
  editSchedule=(docid, date, details)=>{
    this.setState({
      editschedulevisible:!this.state.editschedulevisible,
      docid:docid,
      date:date,
      details:details
    })
    console.log('123',docid,date,details);
  }
  // editDoctor=( docid, name, title )=>{
  //   console.log('1');
  // }
  
  render(){
    const row=this.props.doctorScheduleList.map((item, index) => {
      console.log('item',item);
      const {docid,infos,name}=item;
      
      return (
        <div className="scheduleRow">
        <div key={index} className="docCell">
            {/* {
              // <Icon
              //   type="form"
              //   style={{ color: '#188EF2', marginRight: '5px' }}
              //   // onClick={() => editDoctor({ docId, name, title })}
              // />
               <DeleteOutlined style={{marginRight: '5px'}}/>
            } */}
            <span>
            {/* <DeleteOutlined style={{marginLeft:'-100px'}} 
            onClick={() => this.editDoctor({ docid, name })}/> */}
              {name}
            </span>
          </div>
          {this.getScheduleCells(docid,infos)}
        </div>
      );
    });
    return (
      <Fragment>
        <div className="scheduleTable"> 
        <div className="docScheduleTitleRow">     
          <div>医生</div>
          {/* <div>{this.state.columns}</div> */}
          {this.props.scheduleDateHeader &&
            this.props.scheduleDateHeader.map((item, index) => {
              const { week, date } = item;
              return (
                <div key={date}>
                  <p>
                    {week.replace('星期', '周')}（{date.substring(5)}）
                  </p>
                </div>
              );
            })}
       </div>
       {this.props.doctorScheduleList.length ? (
          <div className="scheduleContent">{row}</div>
        ) : (
          <div className="noSchedule">暂无数据</div>
        )}
       </div> 
       {
         this.state.editschedulevisible &&
         <EditSchedule
         editschedulevisible={this.state.editschedulevisible}
         docid={this.state.docid}
         date={this.state.date}
         details={this.state.details}
         />
       }
      </Fragment>   
)
  }
}
export default ScheduleTableComponent;
