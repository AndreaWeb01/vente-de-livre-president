import { Link } from "@inertiajs/react";

export default function MenuItem({ icon, label, to, danger, active }) {
  return (
    <li>
      <Link
        href={to}
        className={`flex items-center w-full gap-5 px-4 py-4 text-left rounded-lg  transition-colors
          ${
            danger
              ? "text-red-500 font-medium border-red-200"
              : active
              ? "bg-primary text-white font-semibold border-primary"
              : "hover:text-white hover:bg-primary border-gray-200"
          }`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </Link>
    </li>
  );
}
