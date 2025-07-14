import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductsPage = () => {
  const { data: products = [], refetch } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/products');
      return res.data;
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const showEditModal = (product?: Product) => {
    setEditingProduct(product || null);
    setIsModalVisible(true);
    if (product) form.setFieldsValue(product);
    else form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleFinish = async (values: Omit<Product, 'id'>) => {
    if (editingProduct) {
      await axios.put(`http://localhost:3001/products/${editingProduct.id}`, values);
    } else {
      await axios.post(`http://localhost:3001/products`, values);
    }
    setIsModalVisible(false);
    setEditingProduct(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    refetch();
  };

  return (
    <>
      <Button type="primary" onClick={() => showEditModal()}>Add Product</Button>
      <Table columns={columns} dataSource={products} rowKey="id" style={{ marginTop: 16 }} />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}> 
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductsPage;