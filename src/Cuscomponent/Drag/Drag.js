import React, { useState } from 'react';
import { Settings, Copy, Info, Plus, Bot } from 'lucide-react';
import './Drag.css';
const Documentation = () => {
  const [agents, setAgents] = useState([
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

  return (
    <div className="chat-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="button-group">
          <button className="button button-primary">+ Create new session</button>
          <button className="button button-secondary">Clear</button>
        </div>
        <div className="button-group">
          <button className="button button-icon">
            <Bot size={20} /> Active Agents
          </button>
          <button className="button button-icon">
            <Settings size={20} /> Manage Presets
          </button>
        </div>
      </div>

      {/* Agents Panel */}
      <div className="agents-panel">
        <div className="agents-header">
          <div className="button-group">
            <button className="button button-active">Chat Agents</button>
            <button className="button button-outline">File Agents</button>
          </div>
          <button className="button button-add">+ Add</button>
        </div>

        {/* Agent Cards */}
        {agents.map(agent => (
          <div key={agent.id} className="agent-card">
            <div className="agent-card-header">
              <div className="agent-info">
                <input type="checkbox" className="checkbox" />
                <Bot className="icon-emerald" size={20} />
                <div>
                  <div className="agent-name">
                    <span>{agent.name}</span>
                    <span className="badge">Chat</span>
                  </div>
                  <div className="agent-by">By: {agent.by}</div>
                </div>
              </div>
            </div>
            <div className="agent-card-footer">
              <div className="agent-meta">Category: {agent.category} | ⭐ {agent.rating}</div>
              <div className="agent-actions">
                <button className="button-remove">Remove</button>
                <Info size={16} className="icon" />
                <Copy size={16} className="icon" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="input-area">
        <div className="prompt-buttons">
          <button className="button button-prompt">
            <Settings size={16} /> Explore Test Prompts
          </button>
          <button className="button button-prompt">
            Can I get information about this document?
          </button>
          <button className="button button-prompt">
            Answer this question from my videos
          </button>
        </div>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Type or paste a YouTube, document, audio, or video link here..."
            className="main-input"
          />
          <button className="button button-code">Get Code</button>
          <button className="button button-run">Run</button>
        </div>
      </div>
    </div>
  );
};


export default Documentation;