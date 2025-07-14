import { Table, Button, Modal, Form, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

const CategoriesPage = () => {
  const { data: categories = [], refetch } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/categories');
      return res.data;
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Category) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const showEditModal = (category?: Category) => {
    setEditingCategory(category || null);
    setIsModalVisible(true);
    if (category) form.setFieldsValue(category);
    else form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleFinish = async (values: Omit<Category, 'id'>) => {
    if (editingCategory) {
      await axios.put(`http://localhost:3001/categories/${editingCategory.id}`, values);
    } else {
      await axios.post(`http://localhost:3001/categories`, values);
    }
    setIsModalVisible(false);
    setEditingCategory(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/categories/${id}`);
    refetch();
  };

  return (
    <>
      <Button type="primary" onClick={() => showEditModal()}>Add Category</Button>
      <Table columns={columns} dataSource={categories} rowKey="id" style={{ marginTop: 16 }} />

      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriesPage;