import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api/api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', quantity: '', price: '', category: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/api/products', config);
      setProducts(res.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des produits.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/api/products/${editId}`, formData, config);
        toast.success('Produit modifié avec succès');
      } else {
        await API.post('/api/products', formData, config);
        toast.success('Produit ajouté avec succès');
      }
      setFormData({ name: '', quantity: '', price: '', category: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await API.delete(`/api/products/${id}`, config);
        toast.success('Produit supprimé.');
        fetchProducts();
      } catch (err) {
        toast.error('Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-light mb-4">Produits finis</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          {['name', 'quantity', 'price', 'category'].map((field, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-3">
              <input
                type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
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
            <button type="submit" className="btn btn-success w-100" >
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
              <th>Prix</th>
              <th>Catégorie</th>
              <th>Dernière mise à jour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.quantity}</td>
                <td>{prod.price} FCFA</td>
                <td>{prod.category}</td>
                <td>{prod.lastUpdated ? new Date(prod.lastUpdated).toLocaleDateString() : 'N/A'}</td>
                <td>
                      <button onClick={() => handleEdit(prod)} className="btn btn-warning btn-sm me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => handleDelete(prod._id)} className="btn btn-danger btn-sm">
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

export default Products;
