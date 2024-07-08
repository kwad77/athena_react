// zeus\src\components\Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BuilderService } from '../services/BuilderService';
import { AnalyticsService } from '../services/AnalyticsService';
import AssistantCard from './shared/AssistantCard';
import { Assistant } from '../types/builder';

const Dashboard: React.FC = () => {
  const [recentAssistants, setRecentAssistants] = useState<Assistant[]>([]);
  const [assistantCount, setAssistantCount] = useState<number>(0);
  const [totalInteractions, setTotalInteractions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const assistants = await BuilderService.getRecentAssistants(5);
        const count = await BuilderService.getAssistantCount();
        const interactions = await AnalyticsService.getTotalInteractions();

        setRecentAssistants(assistants);
        setAssistantCount(count);
        setTotalInteractions(interactions);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Assistants</h2>
          <p>{assistantCount}</p>
        </div>
        <div className="summary-card">
          <h2>Total Interactions</h2>
          <p>{totalInteractions}</p>
        </div>
      </div>

      <div className="recent-assistants">
        <h2>Recent Assistants</h2>
        {recentAssistants.length > 0 ? (
          recentAssistants.map((assistant) => (
            <AssistantCard 
              key={assistant.id} 
              assistant={assistant}
              onEdit={(assistant) => {/* Handle edit */}}
              onDelete={(id) => {/* Handle delete */}}
            />
          ))
        ) : (
          <p>No assistants created yet.</p>
        )}
        <Link to="/assistants" className="view-all-link">View All Assistants</Link>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <Link to="/build" className="action-button">Create New Assistant</Link>
        <Link to="/analytics" className="action-button">View Detailed Analytics</Link>
      </div>
    </div>
  );
};

export default Dashboard;