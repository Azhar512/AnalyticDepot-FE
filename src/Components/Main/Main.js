import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';  

import './Main.css';
const LoginSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Simulate basic authentication
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Basic password strength check for signup
    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Simulate authentication
    if (isLogin) {
      // Login logic
      if (email && password) {
        login({ email });
        navigate('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } else {
      // Signup logic
      if (email && password) {
        login({ email });
        navigate('/dashboard');
      } else {
        setError('Please provide valid signup details');
      }
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    alert(`${provider} login/signup - To be implemented`);
  };

  const toggleLoginSignup = () => {
    setIsLogin((prevState) => !prevState);
    setError('');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="logo">AnalyticsDepot</div>
          <h1 className="title">{isLogin ? 'Log in' : 'Sign up'}</h1>
        </div>
        <div className="card-content">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              <div className="input-icon">
                <Mail size={20} />
              </div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <div className="input-icon">
                <Lock size={20} />
              </div>
            </div>
            {isLogin ? (
              <button type="submit" className="button login-button">
                Log in
                <ArrowRight size={20} />
              </button>
            ) : (
              <button type="submit" className="button signup-button">
                Sign up
                <ArrowRight size={20} />
              </button>
            )}
            
            <div className="divider">
              <span>or</span>
            </div>
            <button 
              type="button" 
              className="button social-button"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle size={20} />
              {isLogin ? 'Login with Google' : 'Sign up with Google'}
            </button>
            <button 
              type="button" 
              className="button social-button mt-3"
              onClick={() => handleSocialLogin('Apple')}
            >
              <FaApple size={20} />
              {isLogin ? 'Login with Apple' : 'Sign up with Apple'}
            </button>
            
            <div className="text-center mt-6">
              <span className="text-gray-500">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button 
                type="button" 
                className="toggle-button"
                onClick={toggleLoginSignup}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;