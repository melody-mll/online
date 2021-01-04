import React from 'react';
import {Switch,Route, HashRouter} from 'react-router-dom';
import Login from './views/Login';
import Index from './views/admin/index';

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
          <Route component={Index}  path='/index' />
        </Switch>
      </HashRouter>
      </div>
    );
  }
}


export default App;
