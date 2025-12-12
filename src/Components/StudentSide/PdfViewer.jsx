import React, { useState, useEffect } from 'react';
import './StudentRoom.css'; // Reusing existing CSS

const PdfViewer = ({ initialPdfUrl, error }) => {
    let pdfUrl = initialPdfUrl;

    return (
        <div className="room-pdf-section">
            <div className="pdf-viewer-container">
                <div className="pdf-display-area">
                   {error ? (
                        <div className="pdf-placeholder">
                            <p>{error}</p>
                        </div>
                    ) : (pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            className="pdf-frame"
                            title="Course PDF"
                        />
                    ) : (
                        <div className="pdf-placeholder">
                            <p>Loading PDF...</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
