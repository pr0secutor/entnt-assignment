import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function NotFoundPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to={user ? '/' : '/login'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to {user ? 'Dashboard' : 'Login'}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;