import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
    if (res.data.length) {
      login(res.data[0]);
      navigate(res.data[0].role === 'admin' ? '/admin/products' : '/');
    } else {
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default LoginPage;
