import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/layout.css';

function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#0d1117';
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 layout-container text-white">
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary px-3 shadow-sm layout-navbar">
        <button
          className="btn btn-outline-light d-lg-none me-2"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <i className="bi bi-list"></i>
        </button>
        <span className="navbar-brand h4 logo-glow">🖨️ PrintiPro</span>

        <div className="ms-auto d-flex align-items-center gap-3 d-none d-lg-flex">
          <span className="text-light">👋 Bienvenue, Admin</span>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger logout-hover">
            <i className="bi bi-box-arrow-right me-1"></i> Déconnexion
          </button>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        <aside className={`sidebar bg-dark p-3 ${showSidebar ? 'show' : ''}`}>
          <ul className="nav nav-pills flex-column gap-2">
            <li><NavLink to="/dashboard" className="nav-link custom-link"><i className="bi bi-speedometer2 me-2"></i>Dashboard</NavLink></li>
            <li><NavLink to="/materials" className="nav-link custom-link"><i className="bi bi-boxes me-2"></i>Matériaux</NavLink></li>
            <li><NavLink to="/products" className="nav-link custom-link"><i className="bi bi-box-seam me-2"></i>Produits</NavLink></li>
            <li><NavLink to="/clients" className="nav-link custom-link"><i className="bi bi-people me-2"></i>Clients</NavLink></li>
            <li><NavLink to="/users" className="nav-link custom-link"><i className="bi bi-person-badge me-2"></i>Utilisateurs</NavLink></li>
            <li><NavLink to="/inventory" className="nav-link custom-link"><i className="bi bi-clipboard-data me-2"></i>Inventaire</NavLink></li>
          </ul>

          <button 
            onClick={handleLogout} 
            className="btn btn-sm btn-outline-danger w-100 d-lg-none mt-auto">
            <i className="bi bi-box-arrow-right me-1"></i> Déconnexion
          </button>
        </aside>

        <main className="flex-grow-1 p-4 animated-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
