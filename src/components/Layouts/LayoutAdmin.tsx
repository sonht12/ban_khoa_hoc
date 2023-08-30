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
  getItem('Khóa học', '2','/admin/products', <AiOutlineDesktop />),
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
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="pt-14"
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-b-lg h-24">
          <div className="flex items-center mx-auto">
            <AiOutlineDesktop className="text-6xl mr-4 mt-2" />
            <span className="text-5xl font-semibold ">Quản Lý Khóa Học</span>
          </div>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Content className="px-8 py-6 bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
