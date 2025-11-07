import { Link, usePage } from "@inertiajs/react";
import Cadre from "./Cadre";
import Button from "./Button";


export default function TableCommande({ commandes: commandesProp }) {
  const { props } = usePage();
  const pagination = commandesProp || props?.commandes || [];
  const commandes = Array.isArray(pagination?.data) ? pagination.data : (Array.isArray(pagination) ? pagination : []);

  const formatTotal = (cmd) => {
    const total = cmd?.total ?? cmd?.prix_total ?? 0;
    return Number(total).toLocaleString("fr-FR") + " Fcfa";
  };

  const formatDate = (cmd) => {
    const dateStr = cmd?.created_at || cmd?.date;
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? String(dateStr) : d.toLocaleDateString("fr-FR");
  };

  const statut = (cmd) => cmd?.statut || cmd?.etat || "-";

  return (
    <>
      <Cadre>
        {/* Table desktop */}
        <div className="hidden md:block overflow-x-auto p-4 py-4">
          <table className="min-w-full text-left text-sm md:text-base border-collapse">
            <thead>
              <tr className="border-b border-b-border-gray-300">
                <th className="py-3 px-4 font-semibold text-textColor text-center">Commande</th>
                <th className="py-3 px-4 font-semibold text-textColor text-center">Date</th>
                <th className="py-3 px-4 font-semibold text-textColor text-center">État</th>
                <th className="py-3 px-4 font-semibold text-textColor text-center">Total</th>
                <th className="py-3 px-4 font-semibold text-textColor text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd) => (
                <tr key={cmd.id} className="border-b last:border-none hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-textColor text-center">{cmd.reference}</td>
                  <td className="py-3 px-4 text-textColor text-center">{formatDate(cmd)}</td>
                  <td className="py-3 px-4 text-secondary font-medium text-center">{statut(cmd)}</td>
                  <td className="py-3 px-4 text-primary font-semibold text-center">
                    {formatTotal(cmd)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      href={`/public/commande/${cmd.id}`}
                    >
                      <Button label="voir" color="orange" ButtonClassName="text-white">Voir</Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {commandes.length === 0 && (
                <tr>
                  <td className="py-3 px-4 text-center text-sm text-gray-600" colSpan={5}>Aucune commande.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Version mobile (cartes) */}
        <div className="md:hidden space-y-4">
          {commandes.map((cmd) => (
            <div key={cmd.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">Commande :</span>
                <span className="text-textColor">{cmd.reference}</span>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">Date :</span>
                <span>{formatDate(cmd)}</span>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">État :</span>
                <span className="text-secondary">{statut(cmd)}</span>
              </div>
              <div className="flex gap-4 items-center mb-3">
                <span className="text-textColor font-semibold">Total :</span>
                <span className="text-primary font-semibold">{formatTotal(cmd)}</span>
              </div>
              <Link href={`/public/commande/${cmd.id}`}>
                <Button label="voir" color="orange" ButtonClassName="text-white">Voir</Button>
              </Link>
            </div>
          ))}
          {commandes.length === 0 && (
            <div className="text-sm text-gray-600">Aucune commande.</div>
          )}
        </div>
      </Cadre>
    </>
  );
}
