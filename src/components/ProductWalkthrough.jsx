import React, { useEffect } from 'react';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import '../styles/walkthrough.css';

const ProductWalkthrough = ({ isActive, onClose }) => {
  useEffect(() => {
    if (isActive) {
      // Configure Intro.js
      const intro = introJs();
      
      intro.setOptions({
        nextLabel: 'Next →',
        prevLabel: '← Back',
        skipLabel: 'Skip Tour',
        doneLabel: 'Finish',
        showProgress: true,
        showBullets: false,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        scrollToElement: true,
        scrollPadding: 30,
        disableInteraction: false,
        tooltipClass: 'custom-tooltip',
        highlightClass: 'custom-highlight',
        steps: [
          {
            element: '[data-intro="header-title"]',
            intro: '<h4>Welcome to Book-Tax Dashboard</h4><p>This is your comprehensive book-to-tax reconciliation platform. Let\'s explore all the features together!</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="year-select"]',
            intro: '<h4>Year Selection</h4><p>Select the tax year you want to work with. Available years range from 2021 to 2025.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="scenario-select"]',
            intro: '<h4>Scenario Selection</h4><p>Choose between Actual, Forecast, or Budget scenarios to analyze different financial projections.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="main-tabs"]',
            intro: '<h4>Main Navigation</h4><p>These are the main sections of the application. Each tab provides different views and functionalities.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="book-data-tab"]',
            intro: '<h4>Book Data</h4><p>View and manage your book data including General Ledger and Trial Balance information.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="sub-tabs"]',
            intro: '<h4>Sub Navigation</h4><p>Switch between General Ledger and Trial Balance views to see different data perspectives.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="search-bar"]',
            intro: '<h4>Search Functionality</h4><p>Use this search bar to quickly find specific records in your data tables.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="import-button"]',
            intro: '<h4>Import Data</h4><p>Import new data files to update your book records and trial balance information.</p>',
            position: 'left'
          },
          {
            element: '[data-intro="add-button"]',
            intro: '<h4>Add New Records</h4><p>Manually add new entries to your book data when needed.</p>',
            position: 'left'
          },
          {
            element: '[data-intro="data-table"]',
            intro: '<h4>Data Table</h4><p>This interactive table displays your financial data. You can select rows, sort columns, and group data.</p>',
            position: 'top'
          },
          {
            element: '[data-intro="row-selection"]',
            intro: '<h4>Row Selection</h4><p>Use checkboxes to select specific rows for bulk operations or detailed analysis.</p>',
            position: 'right'
          },
          {
            element: '[data-intro="book-adjustments-tab"]',
            intro: '<h4>Book Adjustments</h4><p>Make automated or manual adjustments to your book entries.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="tax-adjustments-tab"]',
            intro: '<h4>Tax Adjustments</h4><p>Handle tax-specific adjustments with automated and manual options.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="diagnostics-tab"]',
            intro: '<h4>Diagnostics</h4><p>View comprehensive analytics and status reports for your tax processes.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="detailed-view-tab"]',
            intro: '<h4>Detailed View</h4><p>Access advanced data tables with enhanced filtering and analysis capabilities.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="summary-view-tab"]',
            intro: '<h4>Summary View</h4><p>Get high-level insights with summary charts and aggregated data tables.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="pdf-form-view-tab"]',
            intro: '<h4>PDF/Form View</h4><p>View and manage PDF documents and forms related to your tax filings.</p>',
            position: 'bottom'
          },
          {
            element: '[data-intro="footer-info"]',
            intro: '<h4>Data Information</h4><p>The footer shows important information like total number of rows in your current view.</p>',
            position: 'top'
          },
          {
            intro: '<h4>🎉 Tour Complete!</h4><p>You\'ve successfully completed the Book-Tax dashboard tour. You can restart this tour anytime by clicking the help button.</p>'
          }
        ]
      });

      // Start the tour
      intro.start();

      // Handle tour completion
      intro.oncomplete(() => {
        onClose();
      });

      // Handle tour exit
      intro.onexit(() => {
        onClose();
      });

      // Cleanup function
      return () => {
        intro.exit();
      };
    }
  }, [isActive, onClose]);

  // This component doesn't render anything visible
  // Intro.js handles all the UI
  return null;
};

export default ProductWalkthrough;
