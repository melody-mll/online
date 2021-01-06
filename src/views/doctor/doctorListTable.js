import React,{Fragment}  from 'react';
import { Table } from 'antd';
class DoctorListTable extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
 
  render(){ 
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },]
        const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },]
    return (   
        <Fragment>
        <Table
          size='middle'
          className={""}
        //   scroll={{ x: xTableWidth, y: this.props.scrollYSize }}
        //   expandedRowKeys={expandedRowKeys}
        //   onExpand={this.expandChangeListener}
        //   expandedRowRender={record => {
        //     return this.expandedTable(record);
        //   }}
          dataSource={data}
        //   pagination={pagination}
          columns={columns}/>
            
        </Fragment> 
)
  }
}


export default DoctorListTable;
