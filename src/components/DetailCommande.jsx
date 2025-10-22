import Cadre from "./Cadre";

export default function DetailCommande({ commande }) {
  if (!commande) {
    return <p>Détails de la commande non disponibles.</p>;
  }

  // Fonction pour formater le prix
  const formatPrix = (prix) => {
    // Vérifie si 'prix' est un nombre valide. Sinon, retourne un message d'erreur.
    if (typeof prix === 'number' && !isNaN(prix)) {
      return `${prix.toLocaleString("fr-FR")} Fcfa`;
    }
    return "0 FCFA"; // Ou toute autre chaîne de votre choix
  };
  
  // Calcule dynamiquement le sous-total
  const sousTotalCalcule = commande.produits.reduce(
    (acc, produit) => acc + produit.total,
    0
  );

  // Calcule dynamiquement le total final
  const totalCalcule = sousTotalCalcule + commande.livraison;

  return (
    <div>
      <Cadre>
        <div className="p-8 py-4">
          <h2 className="text-secondary font-semibold text-lg md:text-xl mb-6">
            Détail de la commande
          </h2>

          {/* Tableau principal */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm md:text-base border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 md:px-4 font-semibold text-textColor">
                    Produits commandés
                  </th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-center text-textColor">
                    Quantité
                  </th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-center text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {commande.produits.map((p, index) => (
                <tr key={index} className=" last:border-none">
                    <td className="py-3 px-2 md:px-4 text-textColor">{p.nom}</td>
                    <td className="py-3 px-2 md:px-4 text-textColor text-center">x{p.quantite}</td>
                    <td className="py-3 px-2 md:px-4 text-primary font-medium text-center">
                      {formatPrix(p.total)}
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sous-total, livraison, total */}
          <div className="mt-6 border-t pt-4 space-y-2 text-sm md:text-base">
            <div className="flex justify-between border-b py-2 pr-22">
              <span className="font-medium text-textColor ml-3">Sous-total</span>
              <span className="text-textColor">{formatPrix(sousTotalCalcule)}</span>
            </div>
            <div className="flex justify-between border-b py-2 pr-22">
              <span className="font-medium text-textColor ml-3">Livraison</span>
              <span className="text-textColor">{formatPrix(commande.livraison)}</span>
            </div>
            <div className="flex justify-between pr-22 border-b py-2">
              <span className="font-medium text-textColor ml-3">Total</span>
              <span className="text-primary font-semibold">
                {formatPrix(totalCalcule)}
              </span>
            </div>
          </div>

          {/* Moyen de paiement */}
          <div className="mt-6">
            <p className="font-semibold text-textColor ml-3">
              Moyen de paiement :{" "}
              <span className="font-normal">{commande.moyenPaiement}</span>
            </p>
          </div>
        </div>
      </Cadre>
    </div>
  );
}
