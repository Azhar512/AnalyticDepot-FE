import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './Components/Main/ProtectedRoute.js';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar.js';
import Allscreen from './Components/Allscreen/Allscreen.js';
import Header from './Components/Header/Header.js';
function Layout() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  
  return (
    <div className="app-container">
      <Sidebar setChekScreen={setCurrentScreen} />
      <div className="main-content">
        <Allscreen CheckScreenAlls={currentScreen} />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Main />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout />
                
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;