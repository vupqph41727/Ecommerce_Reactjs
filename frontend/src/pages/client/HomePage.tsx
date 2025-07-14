import { Card, Row, Col } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/products');
      return res.data;
    },
  });

  return (
    <Row gutter={16}>
      {products.map((item: any) => (
        <Col span={6} key={item.id}>
          <Card title={<Link to={`/product/${item.id}`}>{item.name}</Link>}>
            {item.price} VNĐ
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;