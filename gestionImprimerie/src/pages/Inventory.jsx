import { useEffect, useState } from 'react';
import API from '../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Inventory() {
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchMaterials();
    fetchProducts();
    fetchClients();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await API.get('/api/materials', config);
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/api/products', config);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await API.get('/api/clients', config);
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: ['Matières premières', 'Produits finis', 'Clients'],
    datasets: [
      {
        label: 'Nombre total',
        data: [materials.length, products.length, clients.length],
        backgroundColor: ['#17a2b8', '#28a745', '#ffc107']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Statistiques globales de l’inventaire'
      }
    }
  };

  return (
    <div>
      <h2 className="text-light mb-4">Inventaire</h2>

      {/* Graphique */}
      <div className="mb-5 bg-dark p-3 rounded">
        <h4 className="text-info">Statistiques</h4>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Tableau matières premières */}
      <div className="mb-5">
        <h4 className="text-info">Matières premières</h4>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Point de réapprovisionnement</th>
              <th>Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(mat => (
              <tr key={mat._id} className={mat.quantity < mat.reorderPoint ? 'table-danger' : ''}>
                <td>{mat.name}</td>
                <td>{mat.quantity}</td>
                <td>{mat.unit}</td>
                <td>{mat.reorderPoint}</td>
                <td>{new Date(mat.lastUpdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tableau produits finis */}
      <div className="mb-5">
        <h4 className="text-info">Produits finis</h4>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.quantity}</td>
                <td>{prod.category}</td>
                <td>{prod.price} FCFA</td>
                <td>{new Date(prod.lastUpdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tableau clients */}
      <div>
        <h4 className="text-info">Clients</h4>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(cli => (
              <tr key={cli._id}>
                <td>{cli.name}</td>
                <td>{cli.email}</td>
                <td>{cli.phone}</td>
                <td>{cli.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
