  import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../components/Layout';

export default function CommandesIndex({ commandes }) {
    const items = Array.isArray(commandes) ? commandes : (commandes?.data || []);
    const totalCount = Array.isArray(commandes) ? commandes.length : (commandes?.total ?? items.length);
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
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <Layout>
            <Head title="Mes commandes" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Mes commandes</h1>
                        <Link
                            href="/livres"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
                        >
                            Nouvel achat
                        </Link>
                    </div>
                    
                    {items && items.length > 0 ? (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Historique des commandes ({totalCount})
                                </h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Référence
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Statut
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Mode de paiement
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items.map((commande) => (
                                            <tr key={commande.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {commande.reference}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(commande.created_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {commande.total} FCFA
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(commande.statut)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {commande.mode_paiement}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={`/public/commande/${commande.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Voir détails
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {commandes?.links && (
                                <div className="px-6 py-3 border-t bg-gray-50 flex flex-wrap gap-2">
                                    {commandes.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune commande</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Vous n'avez pas encore passé de commande.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/livres"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Commencer mes achats
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

