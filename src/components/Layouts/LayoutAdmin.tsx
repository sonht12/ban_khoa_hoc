import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AiOutlineDesktop,
    AiFillFile,
    AiOutlinePieChart,
    AiOutlineTeam,
    AiOutlineUser,
    AiFillFolder
} from 'react-icons/ai';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  link?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link to={link}>{label}</Link> : label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Thông kê', '1','/admin/dashboard', <AiOutlinePieChart />,),
  getItem('Sản phẩm', '2','/admin/products', <AiOutlineDesktop />),
  getItem('category', '3','/admin/categorys', <AiFillFolder />),
  getItem('User', 'sub1', '#',<AiOutlineUser />, [
    getItem('Tom', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6'),
  ]),
  getItem('Team', 'sub2','#', <AiOutlineTeam />, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  getItem('Files', '9','#', <AiFillFile />),
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='pt-14'>
        <div className="demo-logo-vertical " />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>

       <Menu theme="dark" mode="horizontal"/>
       
      </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;