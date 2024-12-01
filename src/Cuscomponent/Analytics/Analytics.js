import React, { useState } from 'react';
import { Settings, Copy, Info, Bot, Search, Bell, Database, Grid, ChevronRight } from 'lucide-react';
import './Analytics.css';

const AnalyticsDashboard = () => {
  const [agents] = useState([
    { 
      id: 1, 
      name: 'Vision agent',
      category: 'General',
      rating: '0.0',
      by: 'Personal',
      type: 'chat'
    },
    { 
      id: 2, 
      name: 'Media Knowledge Agent',
      category: 'General',
      rating: '0.0',
      by: 'Personal',
      type: 'chat'
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGetCode = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      console.log('Making request with prompt:', prompt);
      
      const response = await fetch('http://localhost:5000/api/analytics/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));

      const text = await response.text();
      console.log('Raw response:', text);

      if (!response.ok) {
        throw new Error(`Server error: ${text}`);
      }

      let data;
      try {
        data = JSON.parse(text);
        setApiResponse(data);
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }

      if (!data.code) {
        throw new Error('No code received in response');
      }

      setGeneratedCode(data.code);
      
      // Safely update the content area
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        // Sanitize the code before inserting
        const sanitizedCode = data.code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
          
        contentArea.innerHTML = `<pre class="generated-code"><code>${sanitizedCode}</code></pre>`;
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="main-layout">
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="action-buttons">
            <div className="left-buttons">
              <button className="primary-button">+ Create new session</button>
              <button className="secondary-button">
                <Bot className="button-icon" /> Active Agents
              </button>
              <button className="secondary-button">
                <Settings className="button-icon" /> Manage Presets
              </button>
            </div>
          </div>

          <div className="content-area">
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
                {apiResponse && (
                  <pre className="error-details">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                )}
              </div>
            )}
            {generatedCode && !error && (
              <pre className="generated-code">
                <code>{generatedCode}</code>
              </pre>
            )}
          </div>
        </main>

        <div className={`sidebar-container ${!isSidebarOpen ? 'closed' : ''}`}>
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <ChevronRight />
          </button>
          
          <aside className="agents-panel">
            <div className="agents-header">
              <div className="tab-buttons">
                <button className="tab-button active">Chat Agents</button>
                <button className="tab-button">File Agents</button>
                <button className="add-button">+ Add</button>
              </div>
            </div>

            <div className="agents-list">
              {agents.map(agent => (
                <div key={agent.id} className="agent-card">
                  <div className="agent-header">
                    <input type="checkbox" />
                    <Bot className="agent-icon" />
                    <div className="agent-info">
                      <div className="agent-name">
                        {agent.name}
                        <span className="agent-type">{agent.type}</span>
                      </div>
                      <div className="agent-by">By: {agent.by}</div>
                    </div>
                  </div>
                  <div className="agent-footer">
                    <div className="agent-meta">
                      Category: {agent.category} | ⭐ {agent.rating}
                    </div>
                    <div className="agent-actions">
                      <button className="remove-button">Remove</button>
                      <Info className="action-icon" />
                      <Copy className="action-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="bottom-input">
        <div className="prompt-buttons">
          <button className="prompt-button">
            <Settings className="button-icon" /> Explore Test Prompts
          </button>
          <button className="prompt-button">
            Can I get information about this document?
          </button>
          <button className="prompt-button">
            Answer this question from my videos
          </button>
        </div>
        <div className="input-group">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for code generation..."
            className="main-input"
            disabled={loading}
          />
          <button 
            className="code-button" 
            onClick={handleGetCode}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get Code'}
          </button>
          <button className="run-button" disabled={loading || !generatedCode}>
            Run
          </button>
        </div>
        {error && (
          <div className="error-message bottom-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;