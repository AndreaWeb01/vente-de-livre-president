import { Link } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"
export default function BookSection({ image, title, description, buttons, className, subtitle, price, imageRight = true, livre }) {

  // Utiliser les données du livre si disponibles, sinon utiliser les props
  const displayTitle = livre?.titre || title;
  const displaySubtitle = livre?.auteur ? `Par ${livre.auteur.user?.prenom} ${livre.auteur.user?.nom}` : subtitle;
  const displayDescription = livre?.description || description;
  const displayPrice = livre?.prix ? `${livre.prix} FCFA` : price;
  const displayImage = image || livre?.photo;

  const content = (
    <div className="flex flex-col justify-center space-y-6">
      <h2 className={`mb-4 ${className}`}>{displayTitle}</h2>
      <p className="text-textColor font-semibold leading-relaxed">{displaySubtitle}</p>
      <p className="text-textColor text-base leading-relaxed">{displayDescription}</p>
      <p className="text-secondary font-bold leading-relaxed">{displayPrice}</p>
      <div className="flex gap-4 flex-wrap">
        {buttons?.map((btn, idx) => (
          <Link  
            key={idx}
            className={`${btn.color} text-white md:text-[18px] px-2 lg:px-4 py-2 font-[600] rounded-[5px] hover:opacity-90 transition`}
            href={btn.to}
          >
            {btn.text}
          </Link>
        ))}
      </div>
    </div>
  );

  const imageBlock = (
    <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
      <img src={displayImage} alt={displayTitle} className="w-full object-cover rounded-2xl" />
    </div>
  );

  return (
    <section className="mx-auto px-6 py-12  max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {imageRight ? (
        <>
          {content}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {content}
        </>
      )}
    </section>
  );
}
