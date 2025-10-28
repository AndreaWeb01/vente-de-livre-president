import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../components/Layout';

export default function CommandeShow({ commande }) {
    const getStatusBadge = (statut) => {
        const statusConfig = {
            'en_attente': { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
            'confirme': { color: 'bg-green-100 text-green-800', text: 'Confirmé' },
            'en_cours': { color: 'bg-blue-100 text-blue-800', text: 'En cours' },
            'livre': { color: 'bg-purple-100 text-purple-800', text: 'Livré' },
            'annule': { color: 'bg-red-100 text-red-800', text: 'Annulé' },
        };
        
        const config = statusConfig[statut] || { color: 'bg-gray-100 text-gray-800', text: statut };
        
        return (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <Layout>
            <Head title={`Commande ${commande.reference}`} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href="/public/commandes"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            ← Retour aux commandes
                        </Link>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Commande {commande.reference}
                                </h1>
                                {getStatusBadge(commande.statut)}
                            </div>
                        </div>
                        
                        <div className="px-6 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                        Informations de la commande
                                    </h2>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Référence</dt>
                                            <dd className="text-sm text-gray-900">{commande.reference}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Date de commande</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(commande.created_at).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Mode de paiement</dt>
                                            <dd className="text-sm text-gray-900 capitalize">{commande.mode_paiement}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Total</dt>
                                            <dd className="text-lg font-semibold text-gray-900">{commande.total} FCFA</dd>
                                        </div>
                                    </dl>
                                </div>
                                
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                        Informations de livraison
                                    </h2>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Nom</dt>
                                            <dd className="text-sm text-gray-900">
                                                {commande.user?.prenom} {commande.user?.nom}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="text-sm text-gray-900">{commande.user?.email}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                                            <dd className="text-sm text-gray-900">{commande.user?.telephone}</dd>
                                        </div>
                                        {commande.user?.adresse && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                                                <dd className="text-sm text-gray-900">{commande.user.adresse}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                            
                            {commande.notes && (
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                                        {commande.notes}
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Articles commandés
                                </h2>
                                
                                {commande.achats && commande.achats.length > 0 ? (
                                    <div className="space-y-4">
                                        {commande.achats.map((achat) => (
                                            <div key={achat.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {achat.achetable?.titre || achat.achetable?.nom}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {achat.achetable_type === 'App\\Models\\Livre' ? 'Livre' : 'Formation'}
                                                        </p>
                                                        {achat.achetable?.description && (
                                                            <p className="text-sm text-gray-500 mt-2">
                                                                {achat.achetable.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold text-gray-900">
                                                            {achat.prix} FCFA
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-900">Total:</span>
                                                <span className="text-xl font-bold text-gray-900">
                                                    {commande.total} FCFA
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Aucun article trouvé pour cette commande.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

