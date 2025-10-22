const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

export default function PhotoCard({ photo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-lg overflow-hidden group focus:outline-none focus:ring-4 focus:ring-indigo-200"
      aria-label={`${photo.title} — ${formatDate(photo.date)}`}
    >
        <img
        src={photo.src}
        alt={photo.alt || photo.title}
        loading="lazy"
        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />

        
        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3">
        <div className="text-md font-semibold line-clamp-1">{photo.title}</div>
        <div className="text-sm opacity-80">{formatDate(photo.date)}</div>
        </div>
    </button>
  );
}
