import React, {Fragment} from 'react';
import SearchBar from './searchBar';
import DoctorListTable from './doctorListTable';
class Doctor extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
    <Fragment>
        <SearchBar />
        <DoctorListTable />
    </Fragment>
)
  }
}


export default Doctor;
