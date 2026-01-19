
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Platform from './pages/Platform';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import Governance from './pages/Governance';
import ROI from './pages/ROI';
import Demo from './pages/Demo';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:agentSlug" element={<AgentDetail />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/roi" element={<ROI />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;