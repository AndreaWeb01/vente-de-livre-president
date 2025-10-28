import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../components/Layout';

export default function CommandeSuccess({ commande }) {
    return (
        <Layout>
            <Head title="Commande confirmée" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-8">
                            {/* Icône de succès */}
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                Commande confirmée !
                            </h1>
                            
                            <p className="text-gray-600 mb-6">
                                Votre commande a été enregistrée avec succès. Vous recevrez un email de confirmation sous peu.
                            </p>
                            
                            {commande && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                        Détails de la commande
                                    </h2>
                                    <div className="text-left space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Référence:</span> {commande.reference}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Total:</span> {commande.total} FCFA
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Statut:</span> 
                                            <span className="ml-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                                En attente
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Mode de paiement:</span> {commande.mode_paiement}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Date:</span> {new Date(commande.created_at).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <Link
                                    href="/public/commandes"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Voir mes commandes
                                </Link>
                                
                                <div className="text-sm text-gray-500">
                                    <Link href="/livres" className="text-blue-600 hover:text-blue-500">
                                        Continuer mes achats
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

