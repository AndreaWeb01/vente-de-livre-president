import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import Sidebar from "../../components/Sidebar";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Layout from "../../components/Layout";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


export default function ReadBook() {
  const { props } = usePage();
  const livre = props?.livre || null;
  const pdfPath = props?.pdf_url || (livre ? `/storage/${livre.livrepdf}` : null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [errorMsg, setErrorMsg] = useState("");

  const fileSpec = useMemo(() => {
    if (!pdfPath) return null;
    return pdfPath.startsWith("http")
      ? { url: pdfPath }
      : { url: `${window.location.origin}${pdfPath}` };
  }, [pdfPath]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleClipboard = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleKeyDown = useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && ["c", "x", "v", "s", "p"].includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("copy", handleClipboard);
    document.addEventListener("cut", handleClipboard);
    document.addEventListener("paste", handleClipboard);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("copy", handleClipboard);
      document.removeEventListener("cut", handleClipboard);
      document.removeEventListener("paste", handleClipboard);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClipboard, handleKeyDown]);

  return (
    <Layout>
    <section className="p-4 mt-5 md:mt-5" onContextMenu={handleContextMenu}>
      <div className="flex gap-4 items-start" onContextMenu={handleContextMenu}>
        <Sidebar />
        <div className="lg:h-screen flex-1 w-full" onContextMenu={handleContextMenu}>
          {livre ? (
            <div className="w-full select-none" onContextMenu={handleContextMenu}>
              {/* Barre de navigation */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="text-sm text-gray-700">
                  Page {pageNumber} {numPages ? `sur ${numPages}` : ""}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() =>
                      setPageNumber((p) =>
                        numPages ? Math.min(numPages, p + 1) : p + 1
                      )
                    }
                    disabled={numPages ? pageNumber >= numPages : false}
                  >
                    Suivant
                  </button>
                  <div className="w-px h-6 bg-gray-300" />
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      setScale((s) =>
                        Math.max(0.5, parseFloat((s - 0.1).toFixed(2)))
                      )
                    }
                  >
                    -
                  </button>
                  <span className="text-sm w-10 text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      setScale((s) =>
                        Math.min(3, parseFloat((s + 0.1).toFixed(2)))
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Affichage du PDF */}
              <div className="w-full flex justify-center">
                <Document
                  file={fileSpec}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(err) => setErrorMsg(err.message)}
                  loading={<div className="text-gray-500">Chargement…</div>}
                  error={<div className="text-red-600">Erreur de chargement du PDF.</div>}
                  
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderAnnotationLayer
                    renderTextLayer
                    className="shadow rounded"
                  />
                </Document>
              </div>

              {errorMsg && (
                <div className="text-red-600 text-sm mt-3 text-center">{errorMsg}</div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-600">Aucun livre à afficher.</div>
          )}
        </div>
      </div>
    </section>
    </Layout>
  );
}
