import React, { useState, useEffect } from 'react';
import { HelpCircle, Play, X } from 'lucide-react';
import ProductWalkthrough from './ProductWalkthrough';

const WalkthroughTrigger = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false);

  useEffect(() => {
    // Check if user has seen walkthrough before
    const hasSeenBefore = localStorage.getItem('book-tax-walkthrough-seen');
    if (!hasSeenBefore) {
      setShowWelcome(true);
    }
    setHasSeenWalkthrough(!!hasSeenBefore);
  }, []);

  const startWalkthrough = () => {
    setShowWalkthrough(true);
    setShowWelcome(false);
  };

  const closeWalkthrough = () => {
    setShowWalkthrough(false);
  };

  const completeWalkthrough = () => {
    setShowWalkthrough(false);
    localStorage.setItem('book-tax-walkthrough-seen', 'true');
    setHasSeenWalkthrough(true);
  };

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('book-tax-walkthrough-seen', 'true');
    setHasSeenWalkthrough(true);
  };

  return (
    <>
      {/* Help Button - Always visible */}
      <button
        className="walkthrough-help-button"
        onClick={startWalkthrough}
        title="Start Product Walkthrough"
      >
        <HelpCircle size={20} />
      </button>

      {/* Welcome Modal for New Users */}
      {showWelcome && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <div className="welcome-header">
              <h2>Welcome to Book-Tax Dashboard!</h2>
              <button className="welcome-close" onClick={dismissWelcome}>
                <X size={20} />
              </button>
            </div>
            <div className="welcome-content">
              <div className="welcome-icon">
                <Play size={48} />
              </div>
              <h3>Take a Product Tour</h3>
              <p>
                Discover all the powerful features of the Book-Tax dashboard with our 
                comprehensive walkthrough. Learn how to navigate between different views, 
                manage your data, and leverage advanced analytics.
              </p>
              <ul className="feature-highlights">
                <li>📊 Interactive data tables and charts</li>
                <li>📝 Book and tax adjustments</li>
                <li>📈 Diagnostics and analytics</li>
                <li>📄 PDF document management</li>
                <li>🔍 Advanced search and filtering</li>
              </ul>
            </div>
            <div className="welcome-actions">
              <button className="welcome-button secondary" onClick={dismissWelcome}>
                Skip Tour
              </button>
              <button className="welcome-button primary" onClick={startWalkthrough}>
                <Play size={16} />
                Start Tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Walkthrough */}
      <ProductWalkthrough
        isActive={showWalkthrough}
        onClose={closeWalkthrough}
        onComplete={completeWalkthrough}
      />

      <style jsx>{`
        .walkthrough-help-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: all 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .walkthrough-help-button:hover {
          background: #0056b3;
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
        }

        .welcome-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease-out;
        }

        .welcome-modal {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0;
        }

        .welcome-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .welcome-close {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .welcome-close:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .welcome-content {
          padding: 24px;
          text-align: center;
        }

        .welcome-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007bff, #0056b3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .welcome-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .welcome-content p {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .feature-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          text-align: left;
        }

        .feature-highlights li {
          font-size: 14px;
          color: #374151;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .feature-highlights li:last-child {
          border-bottom: none;
        }

        .welcome-actions {
          display: flex;
          gap: 12px;
          padding: 0 24px 24px;
        }

        .welcome-button {
          flex: 1;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .welcome-button.secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .welcome-button.secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .welcome-button.primary {
          background: #007bff;
          color: white;
          border: 1px solid #007bff;
        }

        .welcome-button.primary:hover {
          background: #0056b3;
          border-color: #0056b3;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .walkthrough-help-button {
            bottom: 15px;
            left: 15px;
            width: 45px;
            height: 45px;
          }

          .welcome-modal {
            margin: 20px;
            width: calc(100% - 40px);
          }

          .welcome-actions {
            flex-direction: column;
          }

          .welcome-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default WalkthroughTrigger;
