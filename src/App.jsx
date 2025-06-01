import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import NotificationCenter from './components/Notifications/NotificationCenter';

function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && (
        <nav className="bg-blue-600 text-white p-4">
          <div className="container flex justify-between">
            <div className="space-x-4 flex items-center">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/ships" className="hover:underline">Ships</Link>
              <Link to="/jobs" className="hover:underline">Jobs</Link>
            </div>
            <div>
              <span className="hidden sm:inline">{user.email} ({user.role})</span>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <LoginPage />} />
        <Route path="/ships" element={user ? <ShipsPage /> : <LoginPage />} />
        <Route path="/ships/:id" element={user ? <ShipDetailPage /> : <LoginPage />} />
        <Route path="/jobs" element={user ? <JobsPage /> : <LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <NotificationCenter />
    </div>
  );
}

export default App;