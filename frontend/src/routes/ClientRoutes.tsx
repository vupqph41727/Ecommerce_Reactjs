import { Outlet, Link } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;