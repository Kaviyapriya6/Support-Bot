'use client'
import React from 'react';

const TicketingSystem = () => {
  // SVG Icons
  const CallIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );

  const BookmarkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  );

  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );

  const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  );

  const CommentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <div className="ticketing-container">
      <style jsx>{`
        .ticketing-container {
          background: #000;
          color: white;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #333;
        }

        .header-title {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .header-icon.add-btn {
          background: linear-gradient(135deg, #00d4ff, #00b8e6);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }

        .header-icon.add-btn:hover {
          background: linear-gradient(135deg, #00b8e6, #009cc7);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
        }

        .header-icon.settings-btn {
          background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .header-icon.settings-btn:hover {
          background: linear-gradient(135deg, #ee5a5a, #dd4848);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .header-icon.search-btn {
          background: linear-gradient(135deg, #4ecdc4, #44b5ac);
          color: white;
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        .header-icon.search-btn:hover {
          background: linear-gradient(135deg, #44b5ac, #3a9d95);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
        }

        .header-icon.profile-btn {
          background: linear-gradient(135deg, #ffd93d, #ffcc02);
          color: #333;
          box-shadow: 0 4px 15px rgba(255, 217, 61, 0.3);
        }

        .header-icon.profile-btn:hover {
          background: linear-gradient(135deg, #ffcc02, #e6b800);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 217, 61, 0.4);
        }

        .header-icon svg {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        .content {
          background: white;
          color: #000;
          min-height: calc(100vh - 60px);
        }

        .section-header {
          background: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .ticket-list {
          padding: 0;
        }

        .ticket-item {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
          transition: background-color 0.2s ease;
        }

        .ticket-item:hover {
          background: #f8f9fa;
        }

        .ticket-icon {
          width: 40px;
          height: 40px;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          flex-shrink: 0;
        }

        .ticket-icon svg {
          color: #666;
        }

        .ticket-content {
          flex: 1;
          min-width: 0;
        }

        .ticket-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .ticket-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .ticket-meta span {
          display: flex;
          align-items: center;
        }

        .meta-separator {
          width: 2px;
          height: 2px;
          background: #ccc;
          border-radius: 50%;
        }

        .ticket-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 20px;
        }

        .action-button {
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: #f0f0f0;
        }

        .action-button svg {
          color: #666;
        }

        .status-dropdown {
          position: relative;
        }

        .status-button {
          background: #6c757d;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s ease;
        }

        .status-button:hover {
          background: #5a6268;
        }

        .status-button::after {
          content: '▼';
          font-size: 10px;
        }

        .secondary-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 10px;
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 15px;
          }

          .header-icons {
            gap: 8px;
          }

          .header-icon {
            width: 38px;
            height: 38px;
          }

          .ticket-item {
            padding: 15px;
          }

          .ticket-actions {
            flex-direction: column;
            gap: 4px;
          }

          .secondary-actions {
            flex-direction: column;
            gap: 4px;
            margin-left: 5px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-title">TICKETING SYSTEM</div>
        <div className="header-icons">
          <div className="header-icon add-btn">
            <PlusIcon />
          </div>
          <div className="header-icon settings-btn">
            <SettingsIcon />
          </div>
          <div className="header-icon search-btn">
            <SearchIcon />
          </div>
          <div className="header-icon profile-btn">
            <ProfileIcon />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="section-header">
          <h2 className="section-title">ALL TICKETS</h2>
        </div>

        <div className="ticket-list">
          {/* First Ticket */}
          <div className="ticket-item">
            <div className="ticket-icon">
              <CallIcon />
            </div>
            <div className="ticket-content">
              <h3 className="ticket-title">Sfsd</h3>
              <p className="ticket-meta">
                <span>#101</span>
                <div className="meta-separator"></div>
                <span>Ramani</span>
                <div className="meta-separator"></div>
                <span>Zoho</span>
                <div className="meta-separator"></div>
                <span>⏰ 22 hours ago</span>
                <div className="meta-separator"></div>
                <span>30 Aug 2025</span>
              </p>
            </div>
            <div className="ticket-actions">
              <button className="action-button">
                <ShareIcon />
              </button>
              <button className="action-button">
                <BookmarkIcon />
              </button>
              <button className="action-button">
                <EditIcon />
              </button>
              <button className="action-button">
                <DeleteIcon />
              </button>
            </div>
            <div className="status-dropdown">
              <button className="status-button">open</button>
            </div>
            <div className="secondary-actions">
              <button className="action-button">
                <CommentIcon />
              </button>
              <button className="action-button">
                <UserIcon />
              </button>
            </div>
          </div>

          {/* Second Ticket */}
          <div className="ticket-item">
            <div className="ticket-icon">
              <MailIcon />
            </div>
            <div className="ticket-content">
              <h3 className="ticket-title">Here is your first Ticket</h3>
              <p className="ticket-meta">
                <span>#101</span>
                <div className="meta-separator"></div>
                <span>Ramani</span>
                <div className="meta-separator"></div>
                <span>Zoho</span>
                <div className="meta-separator"></div>
                <span>22 hours ago</span>
                <div className="meta-separator"></div>
                <span>30 Aug 2025</span>
              </p>
            </div>
            <div className="ticket-actions">
              <button className="action-button">
                <ShareIcon />
              </button>
              <button className="action-button">
                <BookmarkIcon />
              </button>
              <button className="action-button">
                <EditIcon />
              </button>
              <button className="action-button">
                <DeleteIcon />
              </button>
            </div>
            <div className="status-dropdown">
              <button className="status-button">open</button>
            </div>
            <div className="secondary-actions">
              <button className="action-button">
                <CommentIcon />
              </button>
              <button className="action-button">
                <UserIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketingSystem;