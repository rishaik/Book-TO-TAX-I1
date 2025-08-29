import React from 'react';

export default function SidePanel({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="sidepanel-overlay">
      <div className="sidepanel" style={{ width: '50vw', minWidth: 380, maxWidth: 900 }}>
        <button className="sidepanel-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="4" x2="12" y2="12"/>
            <line x1="12" y1="4" x2="4" y2="12"/>
          </svg>
        </button>
        <div className="sidepanel-content" style={{ marginTop: 56 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
