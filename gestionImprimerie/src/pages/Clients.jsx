import { useEffect, useState } from 'react';
import API from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [editId, setEditId] = useState(null);
    const [editMode, setEditMode] = useState(false);
  

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
      console.log(err)
      toast.error('Erreur lors du chargement des clients.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/api/clients/${editId}`, formData, config);
        toast.success('Client modifié avec succès.');
      } else {
        await API.post('/api/clients', formData, config);
        toast.success('Client ajouté avec succès.');
      }
      setFormData({ name: '', email: '', phone: '', address: '' });
      setEditId(null);
      fetchClients();
    } catch (err) {
      console.log(err)
      toast.error("Échec de l'enregistrement.");
    }
  };

  const handleEdit = (cli) => {
    setFormData({ name: cli.name, email: cli.email, phone: cli.phone, address: cli.address });
    setEditId(cli._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await API.delete(`/api/clients/${id}`, config);
        toast.success('Client supprimé.');
        fetchClients();
      } catch (err) {
        console.log(err)
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '' });
    setEditMode(false);
    setEditId(null);
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
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="col-12 col-md-3">
            <button type="submit" className="btn btn-success w-100" >
              {editId ? 'Modifier' : 'Ajouter'}
            </button>
            {editMode && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Annuler</button>
              )}
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
              <th>Dernière mise à jour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(cli => (
              <tr key={cli._id}>
                <td>{cli.name}</td>
                <td>{cli.email}</td>
                <td>{cli.phone}</td>
                <td>{cli.address}</td>
                <td>{cli.lastUpdated ? new Date(cli.lastUpdated).toLocaleDateString() : 'N/A'}</td>
                <td>
                      <button onClick={() => handleEdit(cli)} className="btn btn-warning btn-sm me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => handleDelete(cli._id)} className="btn btn-danger btn-sm">
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
