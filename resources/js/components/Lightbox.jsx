import React, { useEffect } from "react";

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

export default function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <div>
            <div className="font-semibold">{photo.titre || photo.title}</div>
            <div className="text-sm text-gray-500">{formatDate(photo.date)}</div>
            
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
              aria-label="Image suivante"
            >
              →
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded hover:bg-gray-100"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 flex justify-center items-center">
          <img
            src={photo.src}
            alt={photo.alt || photo.titre || photo.title}
            className="max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
