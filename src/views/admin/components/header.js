import React,{Component,Fragment} from 'react';
import "./aside.css"
class LayoutHeader extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <Fragment>
                <h1 className="logo"><span></span></h1>
            </Fragment>
        )
    }
}
export default LayoutHeader;