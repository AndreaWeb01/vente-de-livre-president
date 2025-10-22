export default function SocialIcons({ icon: Icon, link, color = "bg-secondary" }) {
  const classes = `w-8 h-8 flex items-center justify-center rounded-full shadow-2xl transition ${color} group-hover:bg-white group-hover:text-secondary`;
  const iconClasses = "text-[16px] text-white group-hover:text-orange-500";
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <Icon className={iconClasses}/>
      </a>
    );
  }

  return (
    <div className={classes}>
      <Icon className={iconClasses}/>
    </div>
  );
}


