import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://printpanel.onrender.com/api/auth/login', form);

      const {token, user}= response.data;
      login(token);
      localStorage.setItem('role', user.role);
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      setError('Identifiants invalides. Veuillez réessayer.');
    }

    toast.success('Connexion réussie');    
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-light" style={{ height: '100vh' }}>
      <div className="card login-card p-4 shadow" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#161b22', border: '1px solid #30363d' }}>
        <div className="text-center mb-4">
          <i className="bi bi-printer-fill display-4 text-primary"></i>
          <h2 className="mt-2">Connexion</h2>
        </div>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Se connecter</button>
        </form>

        <div className="mt-3 text-center">
          <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-primary fw-bold text-decoration-none">
              S'inscrire
            </Link>
          </span>
        </div>
        <div className="mt-3 text-center text-secondary" style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Printing Manager
        </div>
      </div>
    </div>
  );
}

export default Login;
