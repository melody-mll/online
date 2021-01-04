import React from 'react';
import {Switch,Route, HashRouter} from 'react-router-dom';
import User from "../../views/user/index"
import UserAdd from "../../views/user/add"


class ContainMain extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (     
      <Switch>
        <Route component={User}   path='/index/user/list' />
        {/* <Route exact path="/index/user/list" component={User}/> */}
        <Route path="/index/user/add" component={UserAdd}/>
      </Switch>

    );
  }
}


export default ContainMain;
