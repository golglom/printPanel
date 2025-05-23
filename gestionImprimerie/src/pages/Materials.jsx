import { useEffect, useState } from 'react';
import API from '../api/api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ name: '', quantity: '', supplier: '', cost: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await API.get('/api/materials', config);
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/api/materials/${editId}`, formData, config);
      } else {
        await API.post('/api/materials', formData, config);
      }
      setFormData({ name: '', quantity: '', supplier: '', cost: '' });
      setEditId(null);
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (material) => {
    setFormData(material);
    setEditId(material._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await API.delete(`/api/materials/${id}`, config);
        fetchMaterials();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-light mb-4">Matières Premières</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          {['name', 'quantity', 'supplier', 'cost'].map((field, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-3">
              <input
                type={field === 'quantity' || field === 'cost' ? 'number' : 'text'}
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
              <th>Quantité</th>
              <th>Fournisseur</th>
              <th>Coût</th>
              <th>Dernière mise à jour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(mat => (
              <tr key={mat._id}>
                <td>{mat.name}</td>
                <td>{mat.quantity}</td>
                <td>{mat.supplier || 'N/A'}</td>
                <td>{mat.cost ? `${mat.cost} FCFA` : 'N/A'}</td>
                <td>{mat.lastUpdated ? new Date(mat.lastUpdated).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(mat)} className="btn btn-warning btn-sm me-2">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button onClick={() => handleDelete(mat._id)} className="btn btn-danger btn-sm">
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

export default Materials;
