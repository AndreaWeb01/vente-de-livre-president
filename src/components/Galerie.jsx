import { useState } from "react";
import PhotoCard from "./PhotoCard";
import Lightbox from "./Lightbox";

export default function Galerie({ photos = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openAt = (index) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <>
      <div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        aria-live="polite"
      >
        {photos.map((p, i) => (
          <PhotoCard key={p.id} photo={p} onClick={() => openAt(i)} />
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          photo={photos[activeIndex]}
          onClose={close}
          onPrev={prev}
          onNext={next}
          hasPrev={photos.length > 1}
          hasNext={photos.length > 1}
        />
      )}
    </>
  );
}
