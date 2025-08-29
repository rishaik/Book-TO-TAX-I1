import React, { useState, useEffect, useRef } from 'react';

const TooltipSystem = () => {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const tooltipRef = useRef(null);

  // Comprehensive tooltip content for all UI elements
  const tooltipContent = {
    // Header elements
    '.title': 'Book-Tax Dashboard - Your comprehensive solution for book-to-tax reconciliation and compliance management',
    '.year-select:first-of-type': 'Select Tax Year - Choose the tax year for data analysis (2021-2025)',
    '.year-select:last-of-type': 'Select Scenario - Choose data type: Actual (real data), Forecast (projections), or Budget (planned)',
    
    // Main navigation tabs
    '.nav-tabs button:nth-child(1)': 'Book Data - Access your core financial data including General Ledger and Trial Balance',
    '.nav-tabs button:nth-child(2)': 'Book Adjustments - Make automated or manual adjustments to book data for accuracy',
    '.nav-tabs button:nth-child(3)': 'Tax Adjustments - Apply tax-specific adjustments for compliance reporting',
    '.nav-tabs button:nth-child(4)': 'Diagnostics - Monitor workflow status, documentation, and filing deadlines',
    '.nav-tabs button:nth-child(5)': 'Detailed View - Advanced data analysis with enhanced filtering and grouping',
    '.nav-tabs button:nth-child(6)': 'Summary View - High-level summaries and trends with interactive charts',
    '.nav-tabs button:nth-child(7)': 'PDF/Form View - View and manage tax forms and supporting documents',
    
    // Sub navigation tabs
    '.sub-nav-tabs button:nth-child(1)': 'General Ledger - Detailed transaction-level data with full audit trail',
    '.sub-nav-tabs button:nth-child(2)': 'Trial Balance - Summarized account balances for period-end reporting',
    
    // Action bar elements
    '.search-container': 'Search Data - Find specific transactions, accounts, entities, or amounts quickly',
    '.search-input': 'Enter search terms to filter data across all columns and fields',
    '.add-button': 'Import/Add Data - Import new data files or add manual entries',
    
    // Table elements
    '.drag-row-groups': 'Row Grouping - Drag column headers here to group data by Legal Entity, Business Unit, Account Type, etc.',
    '.checkbox-column': 'Row Selection - Select individual rows for bulk operations, adjustments, or analysis',
    '.data-table th:nth-child(2)': 'Tax Year - The tax year associated with this transaction',
    '.data-table th:nth-child(3)': 'Scenario - Data type: Actual, Forecast, or Budget',
    '.data-table th:nth-child(4)': 'Legal Entity ID - Unique identifier for the legal entity',
    '.data-table th:nth-child(5)': 'Legal Entity Name - Full name of the legal entity',
    '.data-table th:nth-child(6)': 'Business Unit Code - Code identifying the business unit or division',
    '.data-table th:nth-child(7)': 'Business Unit Name - Full name of the business unit',
    '.data-table th:nth-child(8)': 'Ledger Code - Accounting ledger identifier',
    '.data-table th:nth-child(9)': 'Ledger Name - Full name of the accounting ledger',
    '.data-table th:nth-child(10)': 'Account Code - Chart of accounts code',
    '.data-table th:nth-child(11)': 'Account Description - Account type (Revenue, Expense, Asset, Liability, Equity)',
    '.data-table th:nth-child(12)': 'Amount - Transaction amount in local currency',
    '.data-table th:nth-child(13)': 'Jurisdiction - Tax jurisdiction for reporting purposes',
    '.data-table th:nth-child(14)': 'Currency - Currency code for the transaction amount',
    '.data-table th:nth-child(15)': 'Actions - Additional options: Edit, Delete, View Details, Export',
    
    // Footer elements
    '.footer': 'Data Summary - Shows total number of rows and summary statistics for current view',
    
    // Diagnostics elements
    '.diagnostics-tab-button:nth-child(1)': 'Workflow Status - Track process completion: Not Started, In Progress, Completed',
    '.diagnostics-tab-button:nth-child(2)': 'Documentation Status - Monitor document completeness: Missing, In Review, Completed',
    '.diagnostics-tab-button:nth-child(3)': 'ES Filing Status - Track estimated tax filing deadlines and compliance',
    
    // PDF viewer elements
    '.pdf-file-list': 'Document Library - Browse tax forms and supporting documents by entity and type',
    '.pdf-viewer': 'PDF Viewer - View documents with zoom, navigation, and annotation capabilities',
    '.pdf-controls': 'PDF Navigation - Navigate pages, zoom in/out, and control document display',
    
    // Summary view elements
    '.summary-chart': 'Financial Trends - Interactive charts showing year-over-year comparisons of key metrics',
    '.summary-table': 'Summary Data - Consolidated financial data with period comparisons',
    
    // General UI elements
    '.side-panel': 'Side Panel - Additional tools and detailed forms for data entry and analysis',
    'button': 'Interactive Button - Click to perform action or navigate to different view',
    'input': 'Input Field - Enter data or search criteria',
    'select': 'Dropdown Menu - Select from available options',
    'table': 'Data Table - Sortable and filterable data display with export capabilities'
  };

  useEffect(() => {
    const handleMouseEnter = (event) => {
      const element = event.target;
      let content = null;
      
      // Find matching tooltip content
      for (const [selector, tooltipText] of Object.entries(tooltipContent)) {
        if (element.matches(selector) || element.closest(selector)) {
          content = tooltipText;
          break;
        }
      }
      
      // Special handling for specific elements
      if (!content) {
        // Check for data attributes
        if (element.dataset.tooltip) {
          content = element.dataset.tooltip;
        }
        // Check for title attributes
        else if (element.title) {
          content = element.title;
          element.title = ''; // Remove default tooltip
        }
        // Check for aria-label
        else if (element.getAttribute('aria-label')) {
          content = element.getAttribute('aria-label');
        }
        // Generic button tooltip
        else if (element.tagName === 'BUTTON' && element.textContent.trim()) {
          content = `${element.textContent.trim()} - Click to ${element.textContent.toLowerCase()}`;
        }
      }
      
      if (content) {
        const rect = element.getBoundingClientRect();
        setTooltip({
          show: true,
          content,
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
      }
    };

    const handleMouseLeave = () => {
      setTooltip({ show: false, content: '', x: 0, y: 0 });
    };

    // Add event listeners to all interactive elements
    const elements = document.querySelectorAll(
      'button, input, select, .nav-tabs button, .sub-nav-tabs button, .search-container, .add-button, .drag-row-groups, th, .footer, .diagnostics-tab-button, .pdf-file-list, .pdf-viewer, .summary-chart, .summary-table, .checkbox-column, .year-select, .title'
    );

    elements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Position tooltip to avoid screen edges
  const getTooltipStyle = () => {
    if (!tooltip.show) return { display: 'none' };
    
    const tooltipWidth = 300;
    const tooltipHeight = 60;
    let x = tooltip.x - tooltipWidth / 2;
    let y = tooltip.y - tooltipHeight - 10;
    
    // Adjust for screen edges
    if (x < 10) x = 10;
    if (x + tooltipWidth > window.innerWidth - 10) x = window.innerWidth - tooltipWidth - 10;
    if (y < 10) y = tooltip.y + 30;
    
    return {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 10003
    };
  };

  return (
    <>
      {tooltip.show && (
        <div 
          ref={tooltipRef}
          className="tooltip-popup"
          style={getTooltipStyle()}
        >
          <div className="tooltip-content">
            {tooltip.content}
          </div>
          <div className="tooltip-arrow" />
        </div>
      )}
      
      <style jsx>{`
        .tooltip-popup {
          max-width: 300px;
          background: #1f2937;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          pointer-events: none;
          animation: tooltipFadeIn 0.2s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .tooltip-content {
          position: relative;
          z-index: 1;
        }
        
        .tooltip-arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1f2937;
        }
        
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Ensure tooltips work on mobile */
        @media (max-width: 768px) {
          .tooltip-popup {
            max-width: 250px;
            font-size: 12px;
            padding: 10px 12px;
          }
        }
      `}</style>
    </>
  );
};

export default TooltipSystem;
