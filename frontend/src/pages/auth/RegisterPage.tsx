import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post(`http://localhost:3001/users`, {
      email,
      password,
      role: "client"
    });
    alert("Đăng ký thành công!");
    navigate('/login');
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Đăng ký</button>
    </div>
  );
};

export default RegisterPage;
