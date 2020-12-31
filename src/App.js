import React from 'react';
import {Switch,Route, HashRouter} from 'react-router-dom';
import Login from './views/Login';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
      <div>
      <HashRouter>
        <Switch>
          <Route component={Login}  exact path='/' />
        </Switch>
      </HashRouter>
      </div>
    );
  }
}


export default App;
