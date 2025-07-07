'use client'
import React from 'react';
import Link from 'next/link'

const BizBooksDashboard = () => {
  // SVG Icons
  const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );

  const BellIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const ShoppingCartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );

  const PackageIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  );

  const TicketIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
      <path d="M13 5v2"/>
      <path d="M13 17v2"/>
      <path d="M13 11v2"/>
    </svg>
  );

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
        }

        .sidebar {
          width: 200px;
          background: #1a1a1a;
          color: white;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .logo {
          padding: 20px;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 1px;
          border-bottom: 1px solid #333;
        }

        .nav-menu {
          flex: 1;
          padding: 20px 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          color: #ccc;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .nav-item:hover {
          background: #2a2a2a;
          color: white;
        }

        .nav-item svg {
          margin-right: 12px;
          width: 16px;
          height: 16px;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: white;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 400px;
          margin: 0 40px;
        }

        .search-input {
          width: 100%;
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          background: #f8f9fa;
          font-size: 14px;
          color: #666;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          background: #e9ecef;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          border: none;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-button:hover {
          background: #e9ecef;
        }

        .icon-button svg {
          width: 18px;
          height: 18px;
          color: #666;
        }

        .content-area {
          flex: 1;
          background: #f5f5f5;
          padding: 30px;
        }

        .content-placeholder {
          background: white;
          border-radius: 8px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 180px;
          }
          
          .header {
            padding: 15px 20px;
          }
          
          .search-container {
            margin: 0 20px;
          }
          
          .content-area {
            padding: 20px;
          }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          BIZBOOKS
        </div>
        <nav className="nav-menu">
          <div className="nav-item">
            <ShoppingCartIcon />
            SALES ORDER
          </div>
          <div className="nav-item">
            <PackageIcon />
            PURCHASE ORDER
          </div>
          <div className="nav-item">
            <PackageIcon />
            ITEMS
          </div>
          <div className="nav-item">
            <CreditCardIcon />
            BANKING
          </div>
          <div className="nav-item">
            <ClockIcon />
            TIME TRACKING
          </div>
          <div className="nav-item">
            <TicketIcon />
            <Link href="/tickets">TICKETS</Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="search customers" 
              className="search-input"
            />
          </div>
          <div className="header-icons">
            <button className="icon-button">
              <BellIcon />
            </button>
            <button className="icon-button">
              <SettingsIcon />
            </button>
            <button className="icon-button">
              <UserIcon />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          <div className="content-placeholder">
            Content area - ready for your dashboard components
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizBooksDashboard;