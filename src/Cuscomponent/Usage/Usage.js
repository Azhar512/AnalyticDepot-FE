import React, { useState } from 'react';
import './Usage.css';
function App() {
  const [activeTab, setActiveTab] = useState('Images');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="header">
        <button className="active-button">Activity</button>
        <button>Cost</button>
        <div className="models-dropdown">
          <select>
            <option value="Models">Models</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="navigation">
          <button className="navigation-button"></button>
          <span>November</span>
          <button className="navigation-button"></button>
        </div>
      </div>
      <div className="content">
        <div className="tab-container">
          <button
            className={`tab ${activeTab === 'Images' ? 'active' : ''}`}
            onClick={() => handleTabChange('Images')}
          >
            Images
          </button>
          <button
            className={`tab ${activeTab === 'Video' ? 'active' : ''}`}
            onClick={() => handleTabChange('Video')}
          >
            Video
          </button>
        </div>
        <div className="chart-container">
          {activeTab === 'Images' && (
            <>
              <div className="chart">
                <div className="chart-title">API Requests</div>
                <div className="chart-graph">
                  {/* Implement chart logic for API Requests */}
                </div>
              </div>
              <div className="chart">
                <div className="chart-title">Size (MBS)</div>
                <div className="chart-graph">
                  {/* Implement chart logic for Size (MBS) */}
                </div>
              </div>
            </>
          )}
          {activeTab === 'Video' && (
            <>
              <div className="chart">
                <div className="chart-title">API Requests</div>
                <div className="chart-graph">
                  {/* Implement chart logic for API Requests */}
                </div> </div>
              <div className="chart">
                <div className="chart-title">Size (MBS)</div>
                <div className="chart-graph">
                  {/* Implement chart logic for Size (MBS) */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;