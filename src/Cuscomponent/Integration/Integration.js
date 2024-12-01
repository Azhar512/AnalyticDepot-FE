import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './IntegrationPage.css';

const IntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const agents = [
    {
      logo: '🤖',
      name: 'Vision agent',
      lastModified: '11/12/2024 : 03:22 PM',
      agent_id: 'agent-1712327325',
      type: 'Chat / Vision',
      category: 'General',
      status: 'Public',
      action: ['View', 'Unsubscribe']
    },
    {
      logo: '💻',
      name: 'Media Knowledge Agent',
      lastModified: '11/12/2024 : 03:22 PM',
      agent_id: 'agent-1713962163',
      type: 'Chat / Media Knowledge',
      category: 'General',
      status: 'Public',
      action: ['View', 'Unsubscribe']
    },
    {
      logo: '🎥',
      name: 'Video Agent',
      lastModified: '11/12/2024 : 03:22 PM',
      agent_id: 'agent-1713967141',
      type: 'File / Video',
      category: 'General',
      status: 'Public',
      action: ['View', 'Unsubscribe']
    },
    {
      logo: '▶️',
      name: 'Youtube Agent',
      lastModified: '11/12/2024 : 03:22 PM',
      agent_id: 'agent-1713961903',
      type: 'File / Youtube',
      category: 'General',
      status: 'Public',
      action: ['View', 'Unsubscribe']
    },
    {
      logo: '🎵',
      name: 'Audio Agent',
      lastModified: '11/12/2024 : 03:22 PM',
      agent_id: 'agent-1713958830',
      type: 'File / Audio',
      category: 'Data & Analytics',
      status: 'Public',
      action: ['View', 'Unsubscribe']
    }
  ];

  return (
    <div className="agent-container">
      <h1 className="page-title">
        Manage agents to access knowledge bases and facilitate AnalyticsDepot model interaction with external services.
      </h1>
      
      <div className="header-section">
        <div className="tab-group">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Agents
          </button>
          <button 
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat Agents
          </button>
          <button 
            className={`tab-button ${activeTab === 'file' ? 'active' : ''}`}
            onClick={() => setActiveTab('file')}
          >
            File Agents
          </button>
        </div>
        
        <div className="search-section">
          <span className="total-agents">Total agents: {agents.length}</span>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <Search className="search-icon" />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="agents-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Agent ID</th>
              <th>Type</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr key={index}>
                <td>
                  <div className="agent-info">
                    <span className="agent-logo">{agent.logo}</span>
                    <div className="agent-details">
                      <span className="agent-name">{agent.name}</span>
                      <span className="last-modified">Last modified on:</span>
                      <span className="last-modified">{agent.lastModified}</span>
                    </div>
                  </div>
                </td>
                <td>{agent.name}</td>
                <td>
                  <div className="agent-id">
                    <svg className="copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {agent.agent_id}
                  </div>
                </td>
                <td>{agent.type}</td>
                <td>{agent.category}</td>
                <td>
                  <span className="status-badge">
                    {agent.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="unsubscribe-button">Unsubscribe</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntegrationPage;