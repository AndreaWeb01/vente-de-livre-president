export default function BookSection({ image, title, description, buttons, className, subtitle, price, imageRight = true }) {

  const content = (
    <div className="flex flex-col justify-center space-y-6">
      <h2 className={`mb-4 ${className}`}>{title}</h2>
      <p className="text-textColor font-semibold leading-relaxed">{subtitle}</p>
      <p className="text-textColor text-base leading-relaxed">{description}</p>
      <p className="text-secondary font-bold leading-relaxed">{price}</p>
      <div className="flex gap-4 flex-wrap">
        {buttons?.map((btn, idx) => (
          <button
            key={idx}
            className={`${btn.color} text-white md:text-[18px] px-2 lg:px-4 py-2 font-[600] rounded-[5px] hover:opacity-90 transition`}
            onClick={btn.onClick}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );

  const imageBlock = (
    <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
      <img src={image} alt={title} className="w-full object-cover rounded-2xl" />
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
