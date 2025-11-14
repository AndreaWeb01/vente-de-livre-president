import Layout from "../../../components/Layout";
import { useForm, Link } from "@inertiajs/react";

const METHOD_OPTIONS = [
  { value: "orange_ci", label: "Orange Money" },
  { value: "mtn_ci", label: "MTN Mobile Money" },
  { value: "wave_ci", label: "Wave" },
  { value: "moov_ci", label: "Moov Money" },
];

export default function CreateCommande({ panier, total, user }) {
  const defaultMobileMethod = METHOD_OPTIONS[0]?.value || "orange_ci";

  const { data, setData, post, processing, errors } = useForm({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    adresse: user?.adresse || "",
    ville: user?.ville || "",
    quartier: user?.quartier || "",
    mode_paiement: "mobile_money",
    moneroo_method: defaultMobileMethod,
    notes: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/public/commande", {
      preserveScroll: true,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Finaliser la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={submit} className="lg:col-span-2 bg-white p-6 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  value={data.nom}
                  onChange={(e) => setData("nom", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  value={data.prenom}
                  onChange={(e) => setData("prenom", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.prenom && <p className="text-red-600 text-sm mt-1">{errors.prenom}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="text"
                  value={data.telephone}
                  onChange={(e) => setData("telephone", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.telephone && <p className="text-red-600 text-sm mt-1">{errors.telephone}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input
                  type="text"
                  value={data.adresse}
                  onChange={(e) => setData("adresse", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.adresse && <p className="text-red-600 text-sm mt-1">{errors.adresse}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ville</label>
                <input
                  type="text"
                  value={data.ville}
                  onChange={(e) => setData("ville", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.ville && <p className="text-red-600 text-sm mt-1">{errors.ville}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quartier</label>
                <input
                  type="text"
                  value={data.quartier}
                  onChange={(e) => setData("quartier", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.quartier && <p className="text-red-600 text-sm mt-1">{errors.quartier}</p>}
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Paiement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mode de paiement</label>
                <select
                  value={data.mode_paiement}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => ({
                      ...prev,
                      mode_paiement: value,
                      moneroo_method: value === "mobile_money" ? prev.moneroo_method || defaultMobileMethod : null,
                    }));
                  }}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="mobile_money">Mobile Money</option>
                  <option value="card">Carte</option>
                  <option value="cash">Espèces</option>
                </select>
                {errors.mode_paiement && <p className="text-red-600 text-sm mt-1">{errors.mode_paiement}</p>}
              </div>
              {data.mode_paiement === "mobile_money" && (
                <div className="md:col-span-2">
                  <p className="block text-sm font-medium mb-2">Sélectionnez l’opérateur Mobile Money</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {METHOD_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:border-secondary ${
                          data.moneroo_method === option.value ? "border-secondary bg-secondary/10" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="moneroo_method"
                          value={option.value}
                          checked={data.moneroo_method === option.value}
                          onChange={(e) => setData("moneroo_method", e.target.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.moneroo_method && <p className="text-red-600 text-sm mt-2">{errors.moneroo_method}</p>}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={data.notes}
                  onChange={(e) => setData("notes", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="Informations complémentaires pour la livraison..."
                />
                {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes}</p>}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="submit"
                disabled={processing}
                className="bg-secondary text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-60"
              >
                Commander
              </button>
              <Link href="/public/panier" className="text-primary underline">Retour au panier</Link>
            </div>
          </form>

          <aside className="bg-white p-6 rounded-md shadow">
            <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
            <div className="space-y-3">
              {panier?.map((item) => (
                <div key={`${item.achetable_type}-${item.achetable_id}`} className="flex justify-between text-sm">
                  <span>
                    {item.achetable?.titre || item.achetable?.name || 'Produit'} x {item.quantite}
                  </span>
                  <span>{item.prix_total} FCFA</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>{total} FCFA</span>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

