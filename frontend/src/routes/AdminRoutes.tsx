import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['products']}>
          <Menu.Item key="products"><Link to="products">Products</Link></Menu.Item>
          <Menu.Item key="categories"><Link to="categories">Categories</Link></Menu.Item>
          <Menu.Item key="brands"><Link to="brands">Brands</Link></Menu.Item>
          <Menu.Item key="users"><Link to="users">Users</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;