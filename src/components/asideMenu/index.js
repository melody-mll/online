import React,{Component,Fragment} from 'react';
import { Menu } from 'antd';
import {Link} from "react-router-dom";
import { UserOutlined} from '@ant-design/icons';
import Router from "../../router/index"
const { SubMenu } = Menu;
class AsideMenu extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    //主菜单渲染
    renderMenu=({key,title})=>{
        return (
        <Menu.Item key={key}>
            <Link to={key}><span>{title}</span></Link>
        </Menu.Item>) 
    }
    //联级菜单渲染
    renderSubMenu=({title,key,child}) => {
        console.log('2121',title,key,child);
        return (
            <SubMenu key={key} icon={<UserOutlined/>} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length >0 ? this.renderSubMenu(item) : this.renderMenu(item)
                    })
                }
            </SubMenu>
        )
    }
    render(){
        return (
            <Fragment>
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/index/user/list']}
                defaultOpenKeys={['/index/user']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstitem =>{
                            return firstitem.child && firstitem.child.length > 0 ? this.renderSubMenu(firstitem) : this.renderMenu(firstitem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}
export default AsideMenu;