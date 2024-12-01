import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Settings.css';

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyEmail: '',
    accountPassword: '',
    companyName: '',
    currentRole: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleDiscard = () => {
    setFormData({
      fullName: '',
      companyEmail: '',
      accountPassword: '',
      companyName: '',
      currentRole: '',
    });
  };

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Personal Settings</h1>
          <p className="hero-description">
            Manage your personal information and account settings to customize your experience.
          </p>
        </div>
      </header>

      <main className="main-content">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input type="search" placeholder="Search settings..." className="search-input" />
          </div>
          <button className="button-primary">Get Started</button>
        </div>

        {/* Settings Card */}
        <div className="settings-card">
          <h2 className="settings-title">Personal Information</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Email</label>
                  <input
                    name="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Password</label>
                  <input
                    name="accountPassword"
                    type="password"
                    value={formData.accountPassword}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Role</label>
                  <input
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" onClick={handleDiscard} className="button-secondary">
                Discard Changes
              </button>
              <button type="submit" className="button-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PersonalInfoForm;