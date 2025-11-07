import PaieLigne from "../components/PaieLigne"
import ProductCard from "../components/ProductCard"
import Layout from "../components/Layout"
import { Link, router, usePage } from "@inertiajs/react"


export default function PaieProduitNumerique({ panier, total, user }){
    const { props } = usePage();
    const success = props?.success;
    const error = props?.error;
    const info = props?.info;
    const handleUpdateQuantity = (id, newQuantity) => {
        router.put(`/public/panier/${id}`, { quantite: newQuantity });
    };

    const handleRemoveItem = (id) => {
        if (confirm('Voulez-vous retirer ce produit du panier ?')) {
            router.delete(`/public/panier/${id}`);
        }
    };

    return(
       <>
       <Layout>
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex flex-wrap gap-4">
                    <div className="w-[100%] md:w-[60%]">
                        <PaieLigne user={user} />
                    </div>
                    <div className="w-[100%] md:w-[38%]"> 
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {(success || error || info) && (
                                <div className="px-4 pt-4">
                                    {success && <div className="mb-3 text-green-700 bg-green-100 border border-green-200 rounded px-3 py-2 text-sm">{success}</div>}
                                    {error && <div className="mb-3 text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 text-sm">{error}</div>}
                                    {info && <div className="mb-3 text-blue-700 bg-blue-100 border border-blue-200 rounded px-3 py-2 text-sm">{info}</div>}
                                </div>
                            )}
                            <div className="px-4 py-3 border-b">
                                <h2 className="text-secondary text-[18px] font-semibold md:text-2xl">Votre panier</h2>
                            </div>

                            {panier && panier.length > 0 ? (
                                <>
                                    <div className="divide-y">                                   
                                        {panier.map((item) => (
                                            <div key={item.id} className="px-4 py-3">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="text-[15px] md:text-base font-semibold text-textColor">
                                                            {item.achetable?.titre || item.achetable?.nom}
                                                        </h3>
                                                        <p className="text-xs md:text-sm text-gray-500">
                                                            {item.achetable_type === 'App\\Models\\Livre' ? 'Livre' : 'Formation'}
                                                        </p>
                                                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                                                            Prix unitaire: {item.prix_unitaire} FCFA
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm md:text-base font-semibold text-primary">{item.prix_total} FCFA</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantite - 1))}
                                                            className="bg-secondary text-white w-8 h-8 rounded flex items-center justify-center hover:opacity-90 transition"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-sm">{item.quantite}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantite + 1)}
                                                            className="bg-secondary text-white w-8 h-8 rounded flex items-center justify-center hover:opacity-90 transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-3 border-t flex items-center justify-between">
                                        <span className="text-[15px] md:text-base font-semibold text-textColor">Total</span>
                                        <span className="text-[15px] md:text-base font-bold text-primary">{total} FCFA</span>
                                    </div>
                                    
                                </>
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-600">Votre panier est vide.</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
        </>
    )
}