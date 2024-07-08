// zeus\src\App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BuilderProvider } from './contexts/BuilderContext';
import theme from './theme'; // Assuming you have a theme file
import Navigation from './components/shared/Navigation';
import Dashboard from './components/Dashboard';
import AssistantBuilder from './components/admin/AssistantBuilder';
import AssistantList from './components/AssistantList';
import Analytics from './components/Analytics';
import Login from './components/auth/Login';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BuilderProvider>
        <Router>
          <div className="app-container">
            <Navigation />
            <main className="main-content">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/build" component={AssistantBuilder} />
                <Route path="/assistants" component={AssistantList} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/login" component={Login} />
                {/* Add more routes as needed */}
              </Switch>
            </main>
          </div>
        </Router>
      </BuilderProvider>
    </ThemeProvider>
  );
};

export default App;