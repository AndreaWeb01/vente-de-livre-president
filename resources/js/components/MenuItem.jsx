import { Link } from "@inertiajs/react";

export default function MenuItem({ icon, label, to, danger, active }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center w-full gap-3 px-4 py-4 text-left rounded-md transition-colors
          ${
            danger
              ? "text-red-500 font-medium"
              : active
              ? "bg-primary text-white font-semibold"
              : "hover:text-white hover:bg-primary"
          }`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </Link>
    </li>
  );
}
