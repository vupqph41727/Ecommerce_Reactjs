import { Table, Button, Modal, Form, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Brand {
  id: number;
  name: string;
}

const BrandsPage = () => {
  const { data: brands = [], refetch } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/brands');
      return res.data;
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Brand) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const showEditModal = (brand?: Brand) => {
    setEditingBrand(brand || null);
    setIsModalVisible(true);
    if (brand) form.setFieldsValue(brand);
    else form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingBrand(null);
  };

  const handleFinish = async (values: Omit<Brand, 'id'>) => {
    if (editingBrand) {
      await axios.put(`http://localhost:3001/brands/${editingBrand.id}`, values);
    } else {
      await axios.post(`http://localhost:3001/brands`, values);
    }
    setIsModalVisible(false);
    setEditingBrand(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/brands/${id}`);
    refetch();
  };

  return (
    <>
      <Button type="primary" onClick={() => showEditModal()}>Add Brand</Button>
      <Table columns={columns} dataSource={brands} rowKey="id" style={{ marginTop: 16 }} />

      <Modal
        title={editingBrand ? 'Edit Brand' : 'Add Brand'}
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

export default BrandsPage;
