
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const UsersPage = () => {
  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/users');
      return res.data;
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: User) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const showEditModal = (user?: User) => {
    setEditingUser(user || null);
    setIsModalVisible(true);
    if (user) form.setFieldsValue(user);
    else form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleFinish = async (values: Omit<User, 'id'>) => {
    if (editingUser) {
      await axios.put(`http://localhost:3001/users/${editingUser.id}`, values);
    } else {
      await axios.post(`http://localhost:3001/users`, values);
    }
    setIsModalVisible(false);
    setEditingUser(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    refetch();
  };

  return (
    <>
      <Button type="primary" onClick={() => showEditModal()}>Add User</Button>
      <Table columns={columns} dataSource={users} rowKey="id" style={{ marginTop: 16 }} />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}> 
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UsersPage;