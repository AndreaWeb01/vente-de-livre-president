// src/components/PdfReader.jsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =  "/pdf.worker.min.mjs";

export default function PdfReader({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("Erreur lors du chargement du PDF :", error);
  };

  return (
    <div
      className="flex flex-col items-center p-4 bg-gray-100 rounded-xl select-none"
      onContextMenu={(e) => e.preventDefault()} // bloque clic droit
      onKeyDown={(e) => {
        if ((e.ctrlKey && e.key === "s") || (e.ctrlKey && e.key === "p")) {
          e.preventDefault(); // bloque Ctrl+S et Ctrl+P
        }
      }}
      tabIndex={0}
    >
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      {numPages && (
        <div className="mt-4 flex items-center gap-3">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Précédent
          </button>
          <p>
            Page {pageNumber} / {numPages}
          </p>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
