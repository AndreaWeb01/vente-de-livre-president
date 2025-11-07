import { Link } from '@inertiajs/react';


const colorClasses = {
  green: "bg-primary hover:bg-primary",
  orange: "bg-secondary hover:bg-secondary",
  amber: "bg-amber-500 hover:bg-amber-600",
  white: "bg-white border-1 border-textColor text-textColor"
};

function Button({ label, color = "green",methode, href, to, onClick, ButtonClassName}) {
 
  const baseClasses =
    `md:text-[18px] px-2 sm:px-3 py-2 rounded font-[600] transition duration-200 ${ButtonClassName}`;
  const colorClass = colorClasses[color] || colorClasses.green;
  const classes = `${baseClasses} ${colorClass}`;


  if (to) {
    return (
      <Link 
        className={classes}
        href={to}
        method={methode}
        >
        {label}
      </Link>
    );
  }

  
  if (href) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }


  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
}

export default Button;
