import { Table, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    refetch();
  };

  return <Table columns={columns} dataSource={products} rowKey="id" />;
};

export default ProductsPage;
