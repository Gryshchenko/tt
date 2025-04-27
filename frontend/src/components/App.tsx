import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import {
  GoldOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const App: React.FC<{children: ReactNode}> = ({children}) => {
  const navigator = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={['/']}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: 'Main',
              onClick: () => {
                navigator('/');
              }
            },
            {
              key: '/dashboard',
              icon: <GoldOutlined />,
              label: 'Dashboard',
              onClick: () => {
                navigator('/dashboard');
              }
            },
            {
              key: '/organization',
              icon: <GoldOutlined />,
              label: 'Organization',
              onClick: () => {
                navigator('/organization');
              }
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;