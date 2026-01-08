import { Link, router } from "@inertiajs/react"
import { useTranslation } from "react-i18next";


function addToCart(url, payload) {
  router.post(url, payload)
}

export default function BookSection({ image, title, description, buttons, className, subtitle, price, imageRight = true, livre }) {
  const { t } = useTranslation();
  // Utiliser les données du livre si disponibles, sinon utiliser les props
  const displayTitle = livre?.titre || title;
  const displaySubtitle = livre?.auteur ? t("books.byAuthor", { firstName: livre.auteur.user?.prenom, lastName: livre.auteur.user?.nom }) : subtitle;
  const displayDescription = livre?.description || description;
  const displayPrice = livre?.prix ? t("books.price", { price: livre.prix }) : price;
  const displayImage = image || (livre?.photo ? `/storage/${livre.photo}` : undefined);

  const content = (
    <div className="flex flex-col justify-center space-y-6">
      <h2 className={`mb-4 ${className}`}>{displayTitle}</h2>
      {displaySubtitle && <p className="text-textColor font-semibold leading-relaxed">{displaySubtitle}</p>}
      {displayDescription && <p className="text-textColor text-base leading-relaxed">{displayDescription}</p>}
      {displayPrice && <p className="text-secondary font-bold leading-relaxed">{displayPrice}</p>}
      <div className="flex gap-4 flex-wrap">
        {buttons?.map((btn, idx) => (
          btn?.method === 'post' ? (
            <button
              key={idx}
              type="button"
              className={`${btn.color} text-white md:text-[18px] px-2 lg:px-4 py-2 font-[600] rounded-[5px] hover:opacity-90 transition`}
              onClick={() => addToCart(btn.to, { quantite: btn.quantite ?? 1 })}
            >
              {btn.text}
            </button>
          ) : (
            <Link  
              key={idx}
              className={`${btn.color} text-white md:text-[18px] px-2 lg:px-4 py-2 font-[600] rounded-[5px] hover:opacity-90 transition`}
              href={(btn.to)}
            >
              {btn.text}
            </Link>
          )
        ))}
      </div>
    </div>
  );

  const imageBlock = displayImage ? (
    <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
      <img src={displayImage} alt={displayTitle} className="w-full object-cover rounded-2xl" />
    </div>
  ) : null;

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
