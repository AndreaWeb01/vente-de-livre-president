import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../../components/Layout';

export default function PanierIndex({ panier, total }) {
    const handleUpdateQuantity = (id, newQuantity) => {
        router.put(`/public/panier/${id}`, { quantite: newQuantity });
    };

    const handleRemoveItem = (id) => {
        router.delete(`/public/panier/${id}`);
    };

    const handleClearCart = () => {
        router.delete('/public/panier');
    };

    const handleCheckout = () => {
        router.get('/public/commande/create');
    };

    return (
        <Layout>
            <Head title="Mon Panier" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>
                    
                    {panier && panier.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Articles ({panier.length})
                                    </h2>
                                    <button
                                        onClick={handleClearCart}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Vider le panier
                                    </button>
                                </div>
                            </div>
                            
                            <div className="divide-y divide-gray-200">
                                {panier.map((item) => (
                                    <div key={item.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {item.achetable?.titre || item.achetable?.nom}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {item.achetable_type === 'App\\Models\\Livre' ? 'Livre' : 'Formation'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Prix unitaire: {item.prix_unitaire} FCFA
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantite - 1))}
                                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantite}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantite + 1)}
                                                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        {item.prix_total} FCFA
                                                    </p>
                                                </div>
                                                
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50 border-t">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-semibold text-gray-900">
                                        Total: {total} FCFA
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition duration-150 ease-in-out"
                                    >
                                        Finaliser la commande
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Panier vide</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Commencez par ajouter des articles à votre panier.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/livres"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Voir les livres
                                </Link>
                                <Link
                                    href="/formations"
                                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Voir les formations
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
