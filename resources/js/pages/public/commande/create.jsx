import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Layout from '../../../components/Layout';

export default function CommandeCreate({ panier, total }) {
    const [modePaiement, setModePaiement] = useState('mobile_money');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/public/commande', {
            mode_paiement: modePaiement,
            notes: notes,
        });
    };

    return (
        <Layout>
            <Head title="Finaliser la commande" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Résumé de la commande */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Résumé de la commande
                                </h2>
                            </div>
                            
                            <div className="px-6 py-4">
                                <div className="space-y-4">
                                    {panier.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {item.achetable?.titre || item.achetable?.nom}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Quantité: {item.quantite}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.prix_total} FCFA
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {total} FCFA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Formulaire de commande */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Informations de commande
                                </h2>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mode de paiement
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="mode_paiement"
                                                value="mobile_money"
                                                checked={modePaiement === 'mobile_money'}
                                                onChange={(e) => setModePaiement(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Mobile Money</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="mode_paiement"
                                                value="card"
                                                checked={modePaiement === 'card'}
                                                onChange={(e) => setModePaiement(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Carte bancaire</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="mode_paiement"
                                                value="cash"
                                                checked={modePaiement === 'cash'}
                                                onChange={(e) => setModePaiement(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Espèces</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                        Notes (optionnel)
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={4}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Ajoutez des instructions spéciales ou des commentaires..."
                                    />
                                </div>
                                
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.get('/public/panier')}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
                                    >
                                        Retour au panier
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
                                    >
                                        Confirmer la commande
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

