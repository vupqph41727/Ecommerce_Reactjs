import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClientLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | 
          {!user && <><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>}
          {user && (
            <>
              <span style={{ marginLeft: 10 }}>Xin chào {user.email}</span>
              <button onClick={logout} style={{ marginLeft: 10 }}>Đăng xuất</button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
