import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList = () => {
  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => axios.get('http://localhost:3001/products').then(res => res.data),
  });

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price} VNĐ`,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products || []}
      rowKey="id"
    />
  );
};

export default ProductList;
