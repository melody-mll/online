import React, {Fragment} from 'react';
import SearchBar from './searchBar';
import Schedules from './schedules';
class DoctorSchedule extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
    <Fragment>
        <SearchBar />
        <Schedules />
    </Fragment>
)
  }
}


export default DoctorSchedule;
