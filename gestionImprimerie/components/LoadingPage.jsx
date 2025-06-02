import 'bootstrap/dist/css/bootstrap.min.css';
import { Printer } from 'react-bootstrap-icons';
import './styles/LoadingPage.css';

function LoadingPage() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <Printer className="loading-icon mb-4" size={64} />
      <h4>Chargement des données...</h4>
    </div>
  );
}

export default LoadingPage;
