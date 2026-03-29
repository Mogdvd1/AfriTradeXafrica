import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Platform from './pages/Platform';
import CapacityBuilding from './pages/CapacityBuilding';
import EthicalSourcing from './pages/EthicalSourcing';
import ESG from './pages/ESG';
import Partners from './pages/Partners';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/capacity" element={<CapacityBuilding />} />
        <Route path="/sourcing" element={<EthicalSourcing />} />
        <Route path="/esg" element={<ESG />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
