import React, { useState } from 'react';
// You need to install 'react-pdf' and 'pdfjs-dist' for this to work
import { Document, Page, pdfjs } from 'react-pdf';
import { FileText, CheckSquare } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dummyFiles = [
  'sample-1120.pdf',
  'ENT001_1120_NA_2024.pdf',
  'ENT001_4797_NA_2024.pdf',
  'ENT001_851_NA_2024.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120_NA_I.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120E_null.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120L_NA.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120E_NA.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120PC_A.pdf',
  'ENT001_ItemizedOtherIncomeSchedule_1120PC.pdf',
  'ENT002_1120_NA_2024.pdf',
  'ENT002_4797_NA_2024.pdf',
];

// Dummy PDF URL (replace with real PDF URLs or static files in public/)
const dummyPdfUrl = '/sample-1120.pdf';

export default function PdfFormView() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    setPageNumber(1);
  }

  function onDocumentLoadError(err) {
    setError('Failed to load PDF.');
    setLoading(false);
  }

  // Use the selected file for the PDF viewer
  const selectedFile = dummyFiles[selectedIdx];
  const pdfUrl = `/${selectedFile}`;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', background: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '30%', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '2rem 0.5rem', overflowY: 'auto' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, paddingLeft: 16 }}>PDF Files</div>
        {dummyFiles.map((file, idx) => (
          <div
            key={file}
            onClick={() => { setSelectedIdx(idx); setLoading(true); setError(null); setPageNumber(1); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
              borderRadius: 8,
              border: idx === selectedIdx ? '2px solid #2563eb' : '2px solid transparent',
              background: idx === selectedIdx ? '#eff6ff' : 'transparent',
              marginBottom: 6,
              cursor: 'pointer',
              transition: 'background 0.15s, border 0.15s',
            }}
          >
            <FileText color="#ef4444" size={22} />
            <input type="checkbox" style={{ accentColor: '#2563eb' }} checked={false} readOnly />
            <span style={{ fontWeight: 500, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{file}</span>
          </div>
        ))}
      </div>
      {/* PDF Viewer */}
      <div style={{ width: '70%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '2rem 0', position: 'relative' }}>
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, width: '100%', justifyContent: 'center' }}>
          <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f8fafc', cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 500, fontSize: 15 }}>Page {pageNumber}{numPages ? ` / ${numPages}` : ''}</span>
          <button onClick={() => setPageNumber(p => Math.min(numPages || 1, p + 1))} disabled={numPages ? pageNumber >= numPages : true} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f8fafc', cursor: numPages && pageNumber < numPages ? 'pointer' : 'not-allowed' }}>Next</button>
        </div>
        {/* PDF Content */}
        <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, position: 'relative' }}>
          {loading && !error && (
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <span style={{ color: '#2563eb', fontWeight: 600, fontSize: 18 }}>Loading PDF...</span>
            </div>
          )}
          {error && (
            <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 16 }}>{error}</div>
          )}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            error=""
            noData="No PDF file specified."
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>
      </div>
    </div>
  );
}
