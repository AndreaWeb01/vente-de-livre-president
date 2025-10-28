function Hero({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  scrollToId,
  image,
  textClassName,
  imageClassName, 
  divClassName,
  subClassName,  
  backgroundImage,
  backgroundClass,
  gradient = "from-orange-500 via-pink-500 to-purple-600",
}) {
  const handleScroll = () => {
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <section
      className={`relative w-full  flex items-center justify-between px-8 md:px-16 lg:px-14 text-white overflow-visible rounded-3xl ${backgroundClass}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {/* Overlay gradient */}
      <div
        className={`absolute inset-0 rounded-3xl ${
          gradient ? `bg-gradient-to-r ${gradient}` : ""
        }`}
      ></div>

      {/* Texte */}
      <div className={`relative w-[100%] lg:w-[65%] z-10 ${divClassName}`}>
        <h1 className={` ${textClassName}`}>{title}</h1>
        <p className={`mt-10 text-[16px] md:text-2xl text-gray-100 font-semibold  ${subClassName}`}>{subtitle}</p>

        {ctaText && (
          <button
            onClick={handleScroll}
            className=" bg-secondary text-white  px-5 py-2.5 rounded-[5px] font-semibold shadow-lg "
          >
            {ctaText}
          </button>
        )}
      </div>

      {/* Image décorative */}
      {image && (
        <div className={imageClassName || "absolute right-0 w-[45%] hidden lg:block z-20"}>
          <img
            src={image}
            alt="Hero illustration"
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

export default Hero;
