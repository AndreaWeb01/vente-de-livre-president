import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  { text: "Ce livre m’a vraiment aidé à comprendre mes droits.", name: "Jean K." },
  { text: "Enfin une ressource claire pour éviter les arnaques.", name: "Fatou B." },
  { text: "Un guide précieux pour toute personne voulant acheter un terrain.", name: "Ahmed T." },
  { text: "Je recommande vivement, c’est une référence dans le domaine.", name: "Marie L." },
  { text: "Très pratique et bien expliqué, merci beaucoup !", name: "Koffi D." },
];

export default function TestimonialCarousel({title}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Défilement automatique toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Récupère 3 témoignages : précédent, actuel (milieu), suivant
  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [testimonials[prev], testimonials[currentIndex], testimonials[next]];
  };

  const visible = getVisibleTestimonials();

  return (
    <section className="w-full max-w-7xl mx-auto py-16 md:py-24 text-center">
      <h4 className="text-3xl font-bold mb-10 md:mb-24 text-primary">{title}</h4>

      <div className="flex flex-wrap  items-center justify-center gap-6">
        {visible.map((t, idx) => (
          <TestimonialCard
            key={idx}
            text={t.text}
            name={t.name}
            isActive={idx === 1}
          />
        ))}
      </div>

      {/* Points de pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === idx ? "bg-secondary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
}
