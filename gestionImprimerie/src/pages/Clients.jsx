import { useEffect, useState } from 'react';
import API from '../api/api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get('/api/clients', config);
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/api/clients/${editId}`, formData, config);
      } else {
        await API.post('/api/clients', formData, config);
      }
      setFormData({ name: '', email: '', phone: '', address: '' });
      setEditId(null);
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditId(client._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await API.delete(`/api/clients/${id}`, config);
        fetchClients();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-light mb-4">Clients</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          {['name', 'email', 'phone', 'address'].map((field, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-3">
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                className="form-control"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="col-12 col-md-3">
            <button type="submit" className="btn btn-success w-100">
              {editId ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Date ajout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>{client.lastUpdated ? new Date(client.lastUpdated).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(client)} className="btn btn-warning btn-sm me-2">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button onClick={() => handleDelete(client._id)} className="btn btn-danger btn-sm">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Clients;
