import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      return res.data;
    },
  });

  return product ? (
    <div>
      <h2>{product.name}</h2>
      <p>Giá: {product.price} VNĐ</p>
      <p>{product.description}</p>
    </div>
  ) : <p>Waiting please, We are having issue</p>;
};

export default ProductDetailPage;
