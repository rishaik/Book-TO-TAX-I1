import React, { useState } from 'react';
import { Search, Plus, Menu } from 'lucide-react';
import DiagnosticsCharts from './DiagnosticsCharts';
import SidePanel from './SidePanel';
import ManualBookAdjustmentTable from './ManualBookAdjustmentTable';
import DetailedViewTable from './DetailedViewTable';
import SummaryView from './SummaryView';
import PdfFormView from './PdfFormView';
import WalkthroughTrigger from './WalkthroughTrigger';
import TooltipSystem from './TooltipSystem';

export default function PillarTwoDashboard() {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [activeSubTab, setActiveSubTab] = useState('Trial Balance');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedScenario, setSelectedScenario] = useState('Actual');
  const [activeMainTab, setActiveMainTab] = useState('Book Data');
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const years = ['2021', '2022', '2023', '2024', '2025'];
  const scenarios = ['Actual', 'Forecast', 'Budget'];

  // Trial Balance data
  const trialBalanceData = [
    { id: 1, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE001', leName: 'Alpha Corp', buCode: 'BU01', buName: 'North Ops', ledgerCode: 'L001', ledgerName: 'Main Ledger', accountCode: 'AC100', accountDes: 'Revenue', amount: '1,200,000', jurisdiction: 'US', currency: 'USD', tags: 'Primary' },
    { id: 2, taxYear: '2023', scenario: 'Forecast', period: 'Q2', leid: 'LE002', leName: 'Beta LLC', buCode: 'BU02', buName: 'South Ops', ledgerCode: 'L002', ledgerName: 'Secondary Ledger', accountCode: 'AC200', accountDes: 'Expense', amount: '800,000', jurisdiction: 'CA', currency: 'CAD', tags: 'Secondary' },
    { id: 3, taxYear: '2022', scenario: 'Actual', period: 'Q3', leid: 'LE003', leName: 'Gamma Inc', buCode: 'BU03', buName: 'East Ops', ledgerCode: 'L003', ledgerName: 'East Ledger', accountCode: 'AC300', accountDes: 'Asset', amount: '2,500,000', jurisdiction: 'UK', currency: 'GBP', tags: 'Asset' },
    { id: 4, taxYear: '2022', scenario: 'Budget', period: 'Q4', leid: 'LE004', leName: 'Delta Ltd', buCode: 'BU04', buName: 'West Ops', ledgerCode: 'L004', ledgerName: 'West Ledger', accountCode: 'AC400', accountDes: 'Liability', amount: '1,000,000', jurisdiction: 'DE', currency: 'EUR', tags: 'Liability' },
    { id: 5, taxYear: '2023', scenario: 'Actual', period: 'Q2', leid: 'LE005', leName: 'Epsilon GmbH', buCode: 'BU05', buName: 'Central Ops', ledgerCode: 'L005', ledgerName: 'Central Ledger', accountCode: 'AC500', accountDes: 'Equity', amount: '3,000,000', jurisdiction: 'FR', currency: 'EUR', tags: 'Equity' },
    { id: 6, taxYear: '2021', scenario: 'Forecast', period: 'Q1', leid: 'LE006', leName: 'Zeta SA', buCode: 'BU06', buName: 'APAC Ops', ledgerCode: 'L006', ledgerName: 'APAC Ledger', accountCode: 'AC600', accountDes: 'Revenue', amount: '2,200,000', jurisdiction: 'IN', currency: 'INR', tags: 'Revenue' },
    { id: 7, taxYear: '2021', scenario: 'Budget', period: 'Q3', leid: 'LE007', leName: 'Eta PLC', buCode: 'BU07', buName: 'EMEA Ops', ledgerCode: 'L007', ledgerName: 'EMEA Ledger', accountCode: 'AC700', accountDes: 'Expense', amount: '1,800,000', jurisdiction: 'ZA', currency: 'ZAR', tags: 'Expense' },
    { id: 8, taxYear: '2022', scenario: 'Actual', period: 'Q4', leid: 'LE008', leName: 'Theta BV', buCode: 'BU08', buName: 'Benelux Ops', ledgerCode: 'L008', ledgerName: 'Benelux Ledger', accountCode: 'AC800', accountDes: 'Asset', amount: '2,700,000', jurisdiction: 'NL', currency: 'EUR', tags: 'Asset' },
    { id: 9, taxYear: '2023', scenario: 'Forecast', period: 'Q1', leid: 'LE009', leName: 'Iota SAS', buCode: 'BU09', buName: 'France Ops', ledgerCode: 'L009', ledgerName: 'France Ledger', accountCode: 'AC900', accountDes: 'Liability', amount: '900,000', jurisdiction: 'FR', currency: 'EUR', tags: 'Liability' },
    { id: 10, taxYear: '2021', scenario: 'Actual', period: 'Q2', leid: 'LE010', leName: 'Kappa Oy', buCode: 'BU10', buName: 'Nordic Ops', ledgerCode: 'L010', ledgerName: 'Nordic Ledger', accountCode: 'AC1000', accountDes: 'Equity', amount: '1,500,000', jurisdiction: 'FI', currency: 'EUR', tags: 'Equity' },
  ];

  // General Ledger data
  const generalLedgerData = [
    { id: 1, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE001', leName: 'Alpha Corp', buCode: 'BU01', buName: 'North Ops', ledgerCode: 'L001', ledgerName: 'Main Ledger', accountCode: 'AC100', accountDes: 'Revenue', amount: '500,000', jurisdiction: 'US', currency: 'USD', tags: 'GL Entry' },
    { id: 2, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE001', leName: 'Alpha Corp', buCode: 'BU01', buName: 'North Ops', ledgerCode: 'L001', ledgerName: 'Main Ledger', accountCode: 'AC200', accountDes: 'Expense', amount: '200,000', jurisdiction: 'US', currency: 'USD', tags: 'GL Entry' },
    { id: 3, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE002', leName: 'Beta LLC', buCode: 'BU02', buName: 'South Ops', ledgerCode: 'L002', ledgerName: 'Secondary Ledger', accountCode: 'AC300', accountDes: 'Asset', amount: '300,000', jurisdiction: 'CA', currency: 'CAD', tags: 'GL Entry' },
    { id: 4, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE002', leName: 'Beta LLC', buCode: 'BU02', buName: 'South Ops', ledgerCode: 'L002', ledgerName: 'Secondary Ledger', accountCode: 'AC400', accountDes: 'Liability', amount: '100,000', jurisdiction: 'CA', currency: 'CAD', tags: 'GL Entry' },
    { id: 5, taxYear: '2023', scenario: 'Actual', period: 'Q1', leid: 'LE003', leName: 'Gamma Inc', buCode: 'BU03', buName: 'East Ops', ledgerCode: 'L003', ledgerName: 'East Ledger', accountCode: 'AC500', accountDes: 'Equity', amount: '400,000', jurisdiction: 'UK', currency: 'GBP', tags: 'GL Entry' },
    // Additional rows
    { id: 6, taxYear: '2022', scenario: 'Forecast', period: 'Q2', leid: 'LE004', leName: 'Delta Ltd', buCode: 'BU04', buName: 'West Ops', ledgerCode: 'L004', ledgerName: 'West Ledger', accountCode: 'AC600', accountDes: 'Revenue', amount: '600,000', jurisdiction: 'DE', currency: 'EUR', tags: 'GL Entry' },
    { id: 7, taxYear: '2022', scenario: 'Budget', period: 'Q3', leid: 'LE005', leName: 'Epsilon GmbH', buCode: 'BU05', buName: 'Central Ops', ledgerCode: 'L005', ledgerName: 'Central Ledger', accountCode: 'AC700', accountDes: 'Expense', amount: '700,000', jurisdiction: 'FR', currency: 'EUR', tags: 'GL Entry' },
    { id: 8, taxYear: '2021', scenario: 'Actual', period: 'Q4', leid: 'LE006', leName: 'Zeta SA', buCode: 'BU06', buName: 'APAC Ops', ledgerCode: 'L006', ledgerName: 'APAC Ledger', accountCode: 'AC800', accountDes: 'Asset', amount: '800,000', jurisdiction: 'IN', currency: 'INR', tags: 'GL Entry' },
    { id: 9, taxYear: '2021', scenario: 'Forecast', period: 'Q1', leid: 'LE007', leName: 'Eta PLC', buCode: 'BU07', buName: 'EMEA Ops', ledgerCode: 'L007', ledgerName: 'EMEA Ledger', accountCode: 'AC900', accountDes: 'Liability', amount: '900,000', jurisdiction: 'ZA', currency: 'ZAR', tags: 'GL Entry' },
    { id: 10, taxYear: '2021', scenario: 'Budget', period: 'Q2', leid: 'LE008', leName: 'Theta BV', buCode: 'BU08', buName: 'Benelux Ops', ledgerCode: 'L008', ledgerName: 'Benelux Ledger', accountCode: 'AC1000', accountDes: 'Equity', amount: '1,000,000', jurisdiction: 'NL', currency: 'EUR', tags: 'GL Entry' },
  ];

  const data = activeSubTab === 'General Ledger' ? generalLedgerData : trialBalanceData;

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedRows(newSelected);
  };

  // Main Tabs
  const mainTabs = [
    'Book Data', 'Book Adjustments', 'Tax Adjustments', 'Diagnostics',
    'Detailed View', 'Summary View', 'PDF/Form View'
  ];
  // Sub Tabs
  let subTabs = ['General Ledger', 'Trial Balance'];
  if (activeMainTab === 'Tax Adjustments' || activeMainTab === 'Book Adjustments') {
    subTabs = ['Automated', 'Manual'];
  }

  // Determine if we are on Book Adjustments > Manual
  const isBookAdjustmentsManual = activeMainTab === 'Book Adjustments' && activeSubTab === 'Manual';

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1 className="title" data-intro="header-title">Book-Tax</h1>
        <div className="header-right">
          <select className="year-select mr-4" data-intro="year-select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
          <select className="year-select" data-intro="scenario-select" value={selectedScenario} onChange={e => setSelectedScenario(e.target.value)}>
            {scenarios.map(scenario => <option key={scenario} value={scenario}>{scenario}</option>)}
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs w-full flex justify-evenly border-b border-gray-200" data-intro="main-tabs">
        {mainTabs.map((tab, index) => (
          <button
            key={tab}
            className={`tab-button focus:outline-none transition-colors duration-150${activeMainTab === tab ? ' active' : ''}`}
            style={{ flex: 1, minWidth: 0 }}
            onClick={() => setActiveMainTab(tab)}
            type="button"
            data-intro={index === 0 ? 'book-data-tab' : index === 1 ? 'book-adjustments-tab' : index === 2 ? 'tax-adjustments-tab' : index === 3 ? 'diagnostics-tab' : index === 4 ? 'detailed-view-tab' : index === 5 ? 'summary-view-tab' : 'pdf-form-view-tab'}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub Navigation */}
      {activeMainTab !== 'Diagnostics' && activeMainTab !== 'Summary View' && (
        <div className="sub-nav-tabs flex flex-wrap md:flex-nowrap space-x-8 overflow-x-auto" data-intro="sub-tabs">
          {subTabs.map((subtab) => (
            <button
              key={subtab}
              className={`sub-tab-button min-w-[120px] flex-1 md:flex-none${activeSubTab === subtab ? ' active' : ''}`}
              onClick={() => setActiveSubTab(subtab)}
            >
              {subtab}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      {activeMainTab === 'Diagnostics' ? (
        <div className="charts-container w-full flex flex-row justify-between items-stretch gap-4 px-2 md:px-8 lg:px-16 xl:px-24">
          <DiagnosticsCharts />
        </div>
      ) : activeMainTab === 'Detailed View' ? (
        <>
          {/* Action Bar */}
          <div className="action-bar">
            <div className="search-add w-full flex justify-end">
              <div className="search-container" data-intro="search-bar">
                <Search className="search-icon" />
                <input type="text" placeholder="Search" className="search-input" />
              </div>
            </div>
          </div>
          {/* Drag Row Groups */}
          <div className="drag-row-groups">
            <Menu className="drag-icon" />
            Drag here to set row groups
          </div>
          {/* Table */}
          <DetailedViewTable />
        </>
      ) : activeMainTab === 'Summary View' ? (
        <SummaryView />
      ) : activeMainTab === 'PDF/Form View' ? (
        <PdfFormView />
      ) : (
        <>
          {/* Action Bar */}
          <div className="action-bar">
            <div className="search-add w-full flex justify-end">
              <div className="search-container" data-intro="search-bar">
                <Search className="search-icon" />
                <input type="text" placeholder="Search" className="search-input" />
              </div>
              {isBookAdjustmentsManual ? (
                <button className="add-button ml-4 flex items-center" data-intro="add-button" onClick={() => setSidePanelOpen(true)}>
                  <Plus className="add-icon" />
                </button>
              ) : (
                <button className="add-button ml-4" data-intro="import-button">Import</button>
              )}
            </div>
          </div>

          {/* Drag Row Groups */}
          <div className="drag-row-groups">
            <Menu className="drag-icon" />
            Drag here to set row groups
          </div>

          {/* Table */}
          <div className="table-container w-full overflow-x-auto">
            <table className="data-table min-w-[900px] w-full text-xs md:text-sm" data-intro="data-table">
              <thead>
                <tr>
                  <th rowSpan={2} className="checkbox-column" data-intro="row-selection"></th>
                  <th colSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #ececec' }}>Transaction Details</th>
                  <th colSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #ececec' }}>Legal Entity Details</th>
                  <th colSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #ececec' }}>Business Unit Details</th>
                  <th colSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #ececec' }}>Ledger Details</th>
                  <th colSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #ececec' }}>Account Details</th>
                  <th rowSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold' }}>Amount</th>
                  <th rowSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold' }}>Jurisdiction</th>
                  <th rowSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold' }}>Currency</th>
                  <th rowSpan={2} style={{ background: '#f3f4f6', textAlign: 'center', fontWeight: 'bold' }}>Tags</th>
                </tr>
                <tr>
                  <th style={{ borderRight: '1px solid #ececec' }}>Tax Year</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>Scenario</th>
                  {/* Removed Period column for Trial Balance */}
                  <th style={{ borderRight: '1px solid #ececec' }}>LEID</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>LE Name</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>BU Code</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>BU Name</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>Ledger Code</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>Ledger Name</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>Account Code</th>
                  <th style={{ borderRight: '1px solid #ececec' }}>Account Desc</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className={selectedRows.has(row.id) ? 'selected-row' : ''}>
                    <td className="checkbox-column">
                      <input
                        type="checkbox"
                        className="row-checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    <td>{row.taxYear}</td>
                    <td>{row.scenario}</td>
                    {/* Removed Period cell for Trial Balance */}
                    <td>{row.leid}</td>
                    <td>{row.leName}</td>
                    <td>{row.buCode}</td>
                    <td>{row.buName}</td>
                    <td>{row.ledgerCode}</td>
                    <td>{row.ledgerName}</td>
                    <td>{row.accountCode}</td>
                    <td>{row.accountDes}</td>
                    <td style={{ textAlign: 'right' }}>{row.amount}</td>
                    <td style={{ textAlign: 'center' }}>{row.jurisdiction}</td>
                    <td>{row.currency}</td>
                    <td style={{ textAlign: 'center' }}>
                      <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <circle cx="3" cy="3" r="2" fill="#222" />
                        <circle cx="9" cy="3" r="2" fill="#222" />
                        <circle cx="15" cy="3" r="2" fill="#222" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="footer" data-intro="footer-info">
            <span>Rows: {data.length}</span>
          </div>

          {/* Side Panel for Book Adjustments Manual */}
          {isBookAdjustmentsManual && (
            <SidePanel open={sidePanelOpen} onClose={() => setSidePanelOpen(false)}>
              <ManualBookAdjustmentTable />
            </SidePanel>
          )}
        </>
      )}
      
      {/* Walkthrough and Tooltip Systems */}
      <WalkthroughTrigger />
      <TooltipSystem />
    </div>
  );
}