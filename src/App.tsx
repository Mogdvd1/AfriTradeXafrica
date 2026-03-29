import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
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
        </Routes>
      </Layout>
    </Router>
  );
}
