import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AssistantProvider } from './contexts/AssistantContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AssistantSelection from './components/AssistantSelection';
import AssistantChat from './components/AssistantChat';
import Settings from './components/Settings';
import NotFound from './components/NotFound';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <AssistantProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Sidebar />
            <main>
              <Routes>
                <Route path="/" element={<AssistantSelection />} />
                <Route path="/chat/:assistantId" element={<AssistantChat />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AssistantProvider>
  );
};

export default App;