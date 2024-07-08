// zeus\src\components\shared\Navigation.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Assuming you have an authentication hook

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth(); // Assuming useAuth returns user info and a logout function

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/build" 
            className={location.pathname.startsWith('/build') ? 'active' : ''}
          >
            Build Assistant
          </Link>
        </li>
        <li>
          <Link 
            to="/assistants" 
            className={location.pathname.startsWith('/assistants') ? 'active' : ''}
          >
            My Assistants
          </Link>
        </li>
        <li>
          <Link 
            to="/analytics" 
            className={location.pathname.startsWith('/analytics') ? 'active' : ''}
          >
            Analytics
          </Link>
        </li>
      </ul>
      <div className="user-menu">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;