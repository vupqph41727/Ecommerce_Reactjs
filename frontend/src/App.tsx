
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './routes/AdminRoutes';
import ProductsPage from './pages/admin/ProductsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import BrandsPage from './pages/admin/Brand';
import UsersPage from './pages/admin/UsersPage';
import ClientLayout from './routes/ClientRoutes';
import HomePage from './pages/client/HomePage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './component/PrivateRoute';

function App() {
 

  return (
    <>
     <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={
  <PrivateRoute role="admin">
    <AdminLayout />
  </PrivateRoute>
}>
  <Route path="products" element={<ProductsPage />} />
  <Route path="categories" element={<CategoriesPage />} />
  <Route path="brands" element={<BrandsPage />} />
  <Route path="users" element={<UsersPage />} />
</Route>

        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
