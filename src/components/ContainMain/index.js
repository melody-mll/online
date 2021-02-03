import React from 'react';
import {Switch,Route, HashRouter} from 'react-router-dom';
import PatientList from "../../views/patient/index"
import Doctor from "../../views/doctor/index"
import DoctorSchedule from "../../views/doctorschedule/index"
import DepartList from "../../views/depart/index"
import ProjectList from "../../views/project/index"
import RegisterList from "../../views/registerinformation/index"


class ContainMain extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){ 
    return (     
      <Switch> 
        <Route component={PatientList}   path='/index/user/list' />
        {/* <Route exact path="/index/user/list" component={User}/> */}
        <Route path="/index/doctor/list" component={Doctor}/>
        <Route path="/index/doctorschedule/list" component={DoctorSchedule}/>
        <Route path="/index/depart/list" component={DepartList}/>
        <Route path="/index/project/list" component={ProjectList}/>
        <Route path="/index/registerinformation/list" component={RegisterList}/>
      </Switch>

    ); 
  }
}


export default ContainMain;
