import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';
import { NotificationsProvider } from './contexts/NotificationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <NotificationsProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              <App />
            </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </NotificationsProvider>
    </AuthProvider>
  </BrowserRouter>
);