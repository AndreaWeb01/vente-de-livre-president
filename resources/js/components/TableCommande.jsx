import { Link } from "@inertiajs/react";
import Cadre from "./Cadre";
import Button from "./Button";

export default function TableCommande() {
  const commandes = [
    {
      id: 52214,
      date: "25/08/2025",
      etat: "En attente",
      produits: [
        { nom: "Livre version physique", quantite: 1, total: 15000 },
        { nom: "Livre version numerique", quantite: 0, total: 0 },
        { nom: "Formation", quantite: 0, total: 0 },
        
      ],
      livraison: 1500,
      moyenPaiement: "Mobile money"
    },
    {
      id: 52215,
      date: "25/08/2025",
      etat: "Terminé",
      produits: [
        { nom: "Livre version physique", quantite: 1, total: 15000 },
        { nom: "Livre version numerique", quantite: 0, total: 0 },
        { nom: "Formation", quantite: 0, total: 0 },
      ],
      livraison: 1500,
      moyenPaiement: "Livraison"

    },
    {
      id: 52216,
      date: "26/08/2025",
      etat: "En cours",
      produits: [
        { nom: "Livre version numerique", quantite: 0, total: 0 },
        { nom: "Livre version numerique", quantite: 0, total: 0 },
        { nom: "Formation", quantite: 1, total: 30000 },
        
      ],
     livraison: 1500,
     moyenPaiement: "Mobile money"
    },
  ];
    const calculerTotal = (produits, livraison) => {
        const sousTotal = produits.reduce((acc, produit) => acc + produit.total, 0);
        const totalAvecLivraison = sousTotal + livraison;
        return totalAvecLivraison.toLocaleString("fr-FR") + " Fcfa";
    };

  return (
    <>
      <Cadre>
        {/* ... (votre table pour écrans moyens et plus) */}
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
                  <td className="py-3 px-4 text-textColor text-center">n°{cmd.id}</td>
                  <td className="py-3 px-4 text-textColor text-center">{cmd.date}</td>
                  <td className="py-3 px-4 text-secondary font-medium text-center">{cmd.etat}</td>
                  <td className="py-3 px-4 text-primary font-semibold text-center">
                    {calculerTotal(cmd.produits, cmd.livraison)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      to={`/detail-commande/${cmd.id}`} 
                      state={{ commande: cmd }} // Passe l'objet commande via l'état du routeur
                    >
                      <Button label="voir" color="orange" ButtonClassName="text-white">Voir</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Version mobile (cartes) */}
        <div className="md:hidden space-y-4">
          {commandes.map((cmd) => (
            <div key={cmd.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">Commande :</span>
                <span className="text-textColor">n°{cmd.id}</span>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">Date :</span>
                <span>{cmd.date}</span>
              </div>
              <div className="flex gap-4 items-center mb-2">
                <span className="text-textColor font-semibold">État :</span>
                <span className="text-secondary">{cmd.etat}</span>
              </div>
              <div className="flex gap-4 items-center mb-3">
                <span className="text-textColor font-semibold">Total :</span>
                <span className="text-primary font-semibold">{calculerTotal(cmd.produits, cmd.livraison)}</span>
              </div>
              <Link to={`/detail-commande/${cmd.id}`} state={{ commande: cmd }}>
                <Button label="voir" color="orange" ButtonClassName="text-white">Voir</Button>
              </Link>
            </div>
          ))}
        </div>
      </Cadre>
    </>
  );
}
