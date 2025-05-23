import { useEffect, useState } from 'react';
import API from '../api/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bubble, Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, materials: 0, products: 0, users: 0 });
  const [bubbleData, setBubbleData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [previousStats, setPreviousStats] = useState({
    clients: 0,
    materials: 0,
    products: 0,
    users: 0,
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      try {
        const [clientsRes, materialsRes, productsRes, usersRes] = await Promise.all([
          API.get('/api/clients', config),
          API.get('/api/materials', config),
          API.get('/api/products', config),
          API.get('/api/users', config),
        ]);

        const clients = clientsRes.data;
        const materials = materialsRes.data;
        const products = productsRes.data;
        const users = usersRes.data;

        setStats({
          clients: clients.length,
          materials: materials.length,
          products: products.length,
          users: users.length,
        });

        setBubbleData({
          datasets: [
            {
              label: 'Statistiques générales',
              data: [
                { x: 1, y: clients.length, r: clients.length * 2 },
                { x: 2, y: materials.length, r: materials.length * 2 },
                { x: 3, y: products.length, r: products.length * 2 },
                { x: 4, y: users.length, r: users.length * 2 },
              ],
              backgroundColor: ['#0dcaf0', '#ffc107', '#198754', '#dc3545'],
              borderColor: '#ccc',
              borderWidth: 1,
            }
          ]
        });

        setPieData({
          labels: ['Clients', 'Produits', 'Matériaux'],
          datasets: [
            {
              label: 'Répartition',
              data: [clients.length, products.length, materials.length],
              backgroundColor: ['#0dcaf0', '#198754', '#ffc107'],
              borderColor: ['#0dcaf0', '#198754', '#ffc107'],
              borderWidth: 1,
            },
          ],
        });

        setPreviousStats({
          clients: clients.length - 3,
          materials: materials.length - 1,
          products: products.length - 2,
          users: users.length - 1,
        });


      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-light mb-4">Dashboard</h2>

      {/* Statistiques */}
      <div className="row g-4 mb-4">
        {[
          { label: 'Clients', icon: 'bi-people-fill', color: 'info', value: stats.clients },
          { label: 'Matériaux', icon: 'bi-box-seam', color: 'warning', value: stats.materials },
          { label: 'Produits', icon: 'bi-cube', color: 'success', value: stats.products },
          { label: 'Utilisateurs', icon: 'bi-person-gear', color: 'danger', value: stats.users }
        ].map((item, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card text-bg-dark border-${item.color} h-100 shadow`}>
              <div className="card-body">
                <h5 className="card-title">
                  <i className={`bi ${item.icon} me-2 text-${item.color}`}></i>{item.label}
                </h5>
                <p className="fs-3">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card text-bg-dark border-secondary shadow" style={{ height: '400px' }}>
            <div className="card-body">
              <h5 className="card-title">Graphiques</h5>
              <div style={{ height: '300px' }}>
                {bubbleData ? (
                  <Bubble
                    data={bubbleData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          ticks: {
                            callback: function (value) {
                              return ['Clients', 'Matériaux', 'Produits', 'Utilisateurs'][value - 1];
                            },
                            color: '#ffffff'
                          },
                          grid: {
                            color: '#333'
                          }
                        },
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: '#ffffff'
                          },
                          grid: {
                            color: '#333'
                          }
                        }
                      },
                      plugins: {
                        legend: { labels: { color: '#ffffff' } }
                      }
                    }}
                  />
                ) : <p>Chargement du graphique...</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-bg-dark border-secondary shadow" style={{ height: '400px' }}>
            <div className="card-body">
              <h5 className="card-title">Clients / Produits / Matériaux</h5>
              <div style={{ height: '300px' }}>
                {pieData ? <Pie data={pieData} options={{ maintainAspectRatio: false }} /> : <p>Chargement du graphique...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card text-bg-dark border-secondary shadow mb-4">
        <div className="card-body">
          <h5 className="card-title">Évolution ce mois</h5>
          <div className="row">
            {[
              { label: 'Clients', value: stats.clients, prev: previousStats.clients },
              { label: 'Matériaux', value: stats.materials, prev: previousStats.materials },
              { label: 'Produits', value: stats.products, prev: previousStats.products },
              { label: 'Utilisateurs', value: stats.users, prev: previousStats.users },
            ].map((item, i) => {
              const diff = item.value - item.prev;
              const percent = item.prev > 0 ? ((diff / item.prev) * 100).toFixed(1) : 100;
              const trendIcon = diff >= 0 ? 'bi-arrow-up-circle text-success' : 'bi-arrow-down-circle text-danger';

              return (
                <div key={i} className="col-md-3">
                  <div className="border rounded p-3 text-center">
                    <h6>{item.label}</h6>
                    <p className="mb-1 fs-4">{item.value}</p>
                    <p className="mb-0">
                      <i className={`bi ${trendIcon} me-1`}></i>
                      {diff >= 0 ? '+' : ''}{diff} ({percent}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
