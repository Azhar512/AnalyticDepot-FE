import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import './Sidebar.css';

const Sidebar = ({ setChekScreen }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Icon color map for hover and special effects
  const iconColorMap = {
    "marketplace": "#10B981", // Bright green for special item
    "agents": "#3B82F6", // Blue
    "playground": "#8B5CF6", // Purple
    "flow-builder": "#F43F5E", // Rose
    "engineer": "#F59E0B", // Amber
    "byom": "#6366F1", // Indigo
    "byoi": "#7C3AED", // Violet
    "serverless": "#14B8A6", // TealF
    "cloud": "#EF4444", // Red
    "storage": "#6D28D9", // Purple
    "usage": "#0EA5E9", // Sky
    "api-keys": "#22C55E", // Green
    "docs": "#64748B", // Slate
    "discord": "#3B82F6", // Blue
    "profile": "#8B5CF6", // Purple
    "settings": "#F43F5E", // Rose
    "personal": "#10B981" // Green
  };

  const menuGroups = [
    {
      title: "",
      items: [
        {
          icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
          text: "Go to Agent Marketplace",
          value: "marketplace",
          special: true
        }
      ]
    },
    {
      title: "AnalyticDepot",
      items: [
        
        {
          icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",
          text: "Overview",
          value: "Dashboard"
        },
        {
          icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",
          text: "My Agents",
          value: "Integration"
        },
        {
          icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
          text: "Playground",
          value: "Analytics"
        },
        {
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          text: "Agents Flow Builder",
          value: "flow-builder",
          badge: "Beta"
        },
        {
          icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
          text: "AI Engineer",
          value: "engineer",
          badge: "Beta"
        }
      ]
    },
    {
      title: "Management",
      items: [
        {
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          text: "BYOM Management",
          value: "byom"
        },
        {
          icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
          text: "BYOI Management",
          value: "byoi"
        },
        {
          icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
          text: "Serverless Applications",
          value: "serverless"
        },
        {
          icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
          text: "Cloud Services",
          value: "cloud"
        }
      ]
    },
    {
      title: "",
      items: [
        {
          icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7",
          text: "Storage",
          value: "storage"
        },
        {
          icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
          text: "Usage",
          value: "Usage"
        },
        {
          icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
          text: "API Keys Management",
          value: "api-keys"
        }
      ]
    },
    {
      title: "",
      items: [
        {
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          text: "Documentation",
          value: "Sources"
        },
        {
          icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
          text: "Discord Community",
          value: "discord"
        }
      ]
    },
    {
      title: "",
      items: [
        {
          icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          text: "Profile",
          value: "profile"
        },
        {
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
          text: "Settings",
          value: "Settings"
        }
      ]
    },
   
  ];

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="sidebar-content">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="menu-group">
            {group.title && (
              <div className="menu-group-title">
                {isOpen && group.title}
              </div>
            )}
            {group.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`menu-item ${item.special ? 'special-item' : ''}`}
                onClick={() => setChekScreen(item.value)}
                style={{
                  '--hover-color': iconColorMap[item.value] || '#F3F4F6'
                }}
              >
                <svg
                  className="menu-item-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {isOpen && (
                  <div className="menu-item-content">
                    <span className="menu-item-text">{item.text}</span>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;