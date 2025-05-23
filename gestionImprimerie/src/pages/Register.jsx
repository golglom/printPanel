import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/auth/register', form);
      localStorage.setItem('isRegistered', 'true');
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Ce nom d'utilisateur ou cet email est déjà utilisé.");
      } else {
        setError(err.response?.data?.message || 'Erreur inattendue');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-light" style={{ height: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#161b22', border: '1px solid #30363d' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill display-4 text-primary"></i>
          <h2 className="mt-2">Créer un compte</h2>
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
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              id="email"
              name="email"
              value={form.email}
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
          <button type="submit" className="btn btn-primary w-100 mt-2">S'inscrire</button>
        </form>

        <div className="mt-3 text-center">
          <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-primary fw-bold text-decoration-none">
              Se connecter
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

export default Register;
