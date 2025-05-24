import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import API from '../api/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const isReadBy = userRole !== 'admin' && userRole !== 'manager';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/api/users', config);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des utilisateurs.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await API.put(`/api/users/${editUserId}`, formData, config);
        toast.success("Utilisateur modifié avec succès.");
      } else {
        await API.post('/api/users', formData, config);
        toast.success("Nouvel utilisateur ajouté.");
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’enregistrement.");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role
    });
    setEditMode(true);
    setEditUserId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression de cet utilisateur ?")) {
      try {
        await API.delete(`/api/users/${id}`, config);
        toast.success("Utilisateur supprimé.");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  const resetForm = () => {
    setFormData({ username: '', email: '', password: '', role: 'user' });
    setEditMode(false);
    setEditUserId(null);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h2 className="text-light mb-4">Utilisateurs</h2>

      {(userRole === 'admin' || userRole === 'manager') && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder={editMode ? "Laisser vide si inchangé" : "Mot de passe"}
                value={formData.password}
                onChange={handleChange}
                required={!editMode}
              />
            </div>
            <div className="col-md-2">
              <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>
            <div className="col-md-1 d-flex gap-1">
              <button type="submit" className="btn btn-success w-100" >
                {editMode ? 'Modifier' : 'Ajouter'}
              </button>
              {editMode && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Annuler</button>
              )}
            </div>
          </div>
        </form>
      )}

      <table className="table table-dark table-bordered align-middle">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Dernière connexion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge bg-${user.role === 'admin' ? 'danger' : user.role === 'manager' ? 'primary' : 'secondary'}`}>
                  {user.role}
                </span>
              </td>
              <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Jamais'}</td>
              <td>
              {!isReadBy && (
                    <>
                      <button onClick={() => handleEdit(user)} className="btn btn-warning btn-sm me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">
                        <i className="bi bi-trash"></i>
                      </button>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
