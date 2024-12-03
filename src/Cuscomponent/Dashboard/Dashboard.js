import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  PieChart, 
  TrendingUp, 
  Clock, 
  Download,
  Users,
  Activity,
  Server,
  Cpu,
  Database
} from 'lucide-react';
import socket from '../../services/socket';
import './Dashboard.css';

const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState('');
  const [storageData, setStorageData] = useState({
    used: 43,
    total: 100,
    files: [
      { type: 'Document', count: 42, size: '2.3GB', icon: 'file-text', color: '#0ea5e9' },
      { type: 'Image', count: 128, size: '5.7GB', icon: 'image', color: '#10b981' },
      { type: 'Video', count: 12, size: '15.2GB', icon: 'video', color: '#f43f5e' },
      { type: 'Other', count: 8, size: '1.1GB', icon: 'folder', color: '#8b5cf6' }
    ]
  });

  const [activityData, setActivityData] = useState([]);
  const [tokenStats, setTokenStats] = useState({
    today: 4256,
    yesterday: 3987,
    avgPerDay: 4100
  });

  const [performanceStats, setPerformanceStats] = useState({
    apiRequests: {
      total: 1278,
      success: 1245,
      failed: 33
    },
    userEngagement: {
      activeUsers: 524,
      newUsers: 68,
      retention: 78.5
    },
    systemHealth: {
      cpuUsage: 35,
      memoryUsage: 62,
      networkLatency: 45
    }
  });

  // Generate more realistic time series data
  const generateTimeData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      calls: Math.max(0, Math.sin(i / 4) * 2 + Math.random() * 1.5)
    }));
  };

  const generateMonthlyData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      tokens: Math.max(3500, Math.min(5500, 4500 + Math.random() * 1000))
    }));
  };

  useEffect(() => {
    // Subscribe to real-time updates
    socket.subscribeToUpdates({
      onInitialData: (data) => {
        setStorageData(data.storage);
        setPerformanceStats(data.performance);
        setTokenStats(data.tokens);
      },
      onSystemHealthUpdate: (health) => {
        setPerformanceStats(prev => ({
          ...prev,
          systemHealth: health
        }));
      },
      onTokenUpdate: (tokens) => {
        setTokenStats(tokens);
      },
      onActivityUpdate: (activity) => {
        setActivityData(activity);
      },
      onApiStatsUpdate: (apiStats) => {
        setPerformanceStats(prev => ({
          ...prev,
          apiRequests: apiStats
        }));
      },
      onUserEngagementUpdate: (engagement) => {
        setPerformanceStats(prev => ({
          ...prev,
          userEngagement: engagement
        }));
      },
      onStorageUpdate: (storage) => {
        setStorageData(storage);
      }
    });

    setActivityData(generateTimeData());
    
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const [monthlyTokenData, setMonthlyTokenData] = useState(generateMonthlyData());

  // Event tracking handlers
  const handleApiRequest = (success) => {
    socket.trackApiRequest(success);
  };

  const handleNewUser = () => {
    socket.trackNewUser();
  };

  const handleFileUpload = (fileType, size) => {
    socket.trackFileUpload(fileType, size);
  };

  const calculateStoragePercentage = () => {
    return Math.round((storageData.used / storageData.total) * 100);
  };

  const calculateTokenGrowth = () => {
    return Math.round(((tokenStats.today - tokenStats.yesterday) / tokenStats.yesterday) * 100);
  };

  const calculateSuccessRate = (total, success) => {
    return Math.round((success / total) * 100);
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <header className="main-header">
          <div className="header-container">
            <h1>Overview</h1>
            <button className="pro-plan-btn">Upgrade Plan</button>
          </div>
        </header>

        <main className="content-area">
          {/* Usage Grid Section */}
          <section className="usage-grid">
            {/* Credits/Storage Card */}
            <div className="usage-card">
              <div className="card-header">
                <div className="title-navigation">
                  <ChevronLeft className="nav-arrow" />
                  <h2>Credits & Storage</h2>
                  <ChevronRight className="nav-arrow" />
                </div>
                <div className="header-controls">
                  <BarChart3 className="icon-muted" />
                </div>
              </div>
              
              <div className="storage-display">
                <div className="storage-circle">
                  <svg viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="circle-bg"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="circle-progress"
                      strokeDasharray={`${calculateStoragePercentage()}, 100`}
                    />
                  </svg>
                  <div className="storage-info">
                    <div className="storage-amount">{calculateStoragePercentage()}%</div>
                    <div className="storage-label">Credits Used</div>
                  </div>
                </div>
                <button className="view-btn">View Details</button>
              </div>
            </div>

            {/* Token Generation Card */}
            <div className="usage-card token-card">
              <h2>Tokens Generated (Today) - UTC</h2>
              <div className="token-stats">
                <div className="token-stat-item">
                  <TrendingUp className="stat-icon" />
                  <div>
                    <span className="stat-value">{tokenStats.today}</span>
                    <span className="stat-label">Today's Tokens</span>
                  </div>
                </div>
                <div className="token-stat-growth">
                  <span className={`growth-indicator ${calculateTokenGrowth() >= 0 ? 'positive' : 'negative'}`}>
                    {calculateTokenGrowth()}%
                  </span>
                  <span>vs Yesterday</span>
                </div>
              </div>
              <div className="graph-container">
                <div className="y-axis-labels">
                  {[3, 2, 1, 0].map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                <svg className="activity-graph">
                  <g className="grid-lines">
                    {[0, 1, 2, 3].map((value, i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={20 + (i * 50)}
                        x2="100%"
                        y2={20 + (i * 50)}
                        className="grid-line"
                      />
                    ))}
                  </g>
                  <g transform="translate(40,10)">
                    {activityData.map((data, i) => (
                      <rect
                        key={i}
                        x={`${i * (100 / 24)}%`}
                        y={100 - (data.calls * 100)}
                        width={`${100 / 24 - 1}%`}
                        height={data.calls * 100}
                        className="activity-bar"
                      />
                    ))}
                  </g>
                  <g className="time-labels">
                    {[1, 5, 9, 13, 17, 21].map((hour) => (
                      <text
                        key={hour}
                        x={40 + ((hour) * (100 / 24))}
                        y="190"
                        className="time-label"
                      >
                        {hour}
                      </text>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </section>

          {/* Performance Insights Section */}
          <section className="performance-insights">
            <div className="performance-grid">
              {/* API Performance Card */}
              <div className="performance-card">
                <div className="card-header">
                  <h2><Server className="card-icon" /> API Performance</h2>
                </div>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Requests</span>
                    <span className="stat-value">{performanceStats.apiRequests.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Success Rate</span>
                    <span className="stat-value">
                      {calculateSuccessRate(
                        performanceStats.apiRequests.total, 
                        performanceStats.apiRequests.success
                      )}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Failed Requests</span>
                    <span className="stat-value error">{performanceStats.apiRequests.failed}</span>
                  </div>
                </div>
              </div>

              {/* User Engagement Card */}
              <div className="performance-card">
                <div className="card-header">
                  <h2><Users className="card-icon" /> User Engagement</h2>
                </div>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="stat-label">Active Users</span>
                    <span className="stat-value">{performanceStats.userEngagement.activeUsers}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">New Users</span>
                    <span className="stat-value positive">+{performanceStats.userEngagement.newUsers}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Retention Rate</span>
                    <span className="stat-value">{performanceStats.userEngagement.retention}%</span>
                  </div>
                </div>
              </div>

              {/* System Health Card */}
              <div className="performance-card">
                <div className="card-header">
                  <h2><Cpu className="card-icon" /> System Health</h2>
                </div>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="stat-label">CPU Usage</span>
                    <span className="stat-value">{performanceStats.systemHealth.cpuUsage}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Memory Usage</span>
                    <span className="stat-value">{performanceStats.systemHealth.memoryUsage}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Network Latency</span>
                    <span className="stat-value">{performanceStats.systemHealth.networkLatency}ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Token Generation Graph */}
            <div className="monthly-token-graph">
              <div className="card-header">
                <h2>Monthly Token Generation</h2>
              </div>
              <svg className="token-line-graph">
                <g transform="translate(40,20)">
                  {monthlyTokenData.map((data, i) => (
                    <rect
                      key={i}
                      x={`${i * (100 / 12)}%`}
                      y={100 - (data.tokens / 55)}
                      width={`${100 / 12 - 1}%`}
                      height={(data.tokens / 55)}
                      fill="var(--color-accent)"
                      opacity="0.7"
                    />
                  ))}
                </g>
                <g className="month-labels">
                  {monthlyTokenData.map((data, i) => (
                    <text
                      key={i}
                      x={40 + (i * (100 / 12))}
                      y="120"
                      className="time-label"
                    >
                      {data.month}
                    </text>
                  ))}
                </g>
              </svg>
            </div>
          </section>

          {/* Media Storage Section */}
          <section className="storage-section">
            <div className="section-header">
              <h2>Media Storage Breakdown</h2>
              <button className="view-btn">Manage Files</button>
            </div>
            <div className="storage-breakdown">
              <div className="table-container">
                <table className="storage-table">
                  <thead>
                    <tr>
                      <th>File Type</th>
                      <th>Number of Files</th>
                      <th>Total Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storageData.files.map((file, index) => (
                      <tr key={index} className="file-row">
                        <td>
                          <div className="file-type">
                            <div className="file-icon" style={{backgroundColor: file.color}}></div>
                            {file.type}
                          </div>
                        </td>
                        <td>{file.count}</td>
                        <td>{file.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="storage-pie-chart">
                <h3>Storage Distribution</h3>
                <svg viewBox="0 0 200 200">
                  {storageData.files.map((file, index) => {
                    const total = storageData.files.reduce((sum, f) => sum + parseFloat(f.size), 0);
                    const percentage = (parseFloat(file.size) / total) * 100;
                    return (
                      <path 
                        key={index}
                        d="M100,100 L100,20 A80,80 0 0,1 180,100 Z"
                        fill={file.color}
                        transform={`rotate(${index * 90}, 100, 100)`}
                        opacity="0.8"
                      />
                    );
                  })}
                </svg>
                <div className="pie-legend">
                  {storageData.files.map((file, index) => (
                    <div key={index} className="legend-item">
                      <span className="legend-dot" style={{backgroundColor: file.color}}></span>
                      <span>{file.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;