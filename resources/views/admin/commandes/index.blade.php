@extends('admin.layout')

@section('title', 'Gestion des Commandes')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestion des Commandes</h1>
            <p class="text-xl text-gray-600">
                Gérez toutes les commandes de votre plateforme
            </p>
        </div>
    </div>
</div>

<!-- Filtres -->
<div class="bg-white p-6 rounded-lg shadow mb-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
    <form method="GET" action="{{ route('admin.commandes.index') }}" class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="text"
                   name="search"
                   value="{{ request('search') }}"
                   placeholder="Rechercher par référence ou client..."
                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        </div>

        <select name="statut"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="">Tous les statuts</option>
            <option value="en_attente" {{ request('statut') === 'en_attente' ? 'selected' : '' }}>En attente</option>
            <option value="payee" {{ request('statut') === 'payee' ? 'selected' : '' }}>Payée</option>
            <option value="annulee" {{ request('statut') === 'annulee' ? 'selected' : '' }}>Annulée</option>
        </select>

        <select name="mode_paiement"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="">Tous les modes de paiement</option>
            <option value="mobile_money" {{ request('mode_paiement') === 'mobile_money' ? 'selected' : '' }}>Mobile Money</option>
            <option value="carte" {{ request('mode_paiement') === 'carte' ? 'selected' : '' }}>Carte</option>
            <option value="especes" {{ request('mode_paiement') === 'especes' ? 'selected' : '' }}>Espèces</option>
        </select>

        <div class="flex gap-2">
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Filtrer
            </button>
            <a href="{{ route('admin.commandes.index') }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Effacer
            </a>
        </div>
    </form>
</div>

<!-- Liste des commandes -->
<div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Toutes les commandes</h3>
    </div>

    @if($commandes->count() > 0)
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($commandes as $commande)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">#{{ $commande->reference }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $commande->user->prenom }} {{ $commande->user->nom }}</div>
                            <div class="text-sm text-gray-500">{{ $commande->user->email }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $commande->achats->count() }} article(s)</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ number_format($commande->total, 0, ',', ' ') }} FCFA</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($commande->statut === 'payee')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Payée
                                </span>
                            @elseif($commande->statut === 'en_attente')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                    </svg>
                                    En attente
                                </span>
                            @else
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                                    </svg>
                                    Annulée
                                </span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                                @switch($commande->mode_paiement)
                                    @case('mobile_money')
                                        📱 Mobile Money
                                        @break
                                    @case('carte')
                                        💳 Carte
                                        @break
                                    @case('especes')
                                        💵 Espèces
                                        @break
                                    @default
                                        {{ ucfirst($commande->mode_paiement) }}
                                @endswitch
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $commande->created_at->format('d/m/Y') }}</div>
                            <div class="text-sm text-gray-500">{{ $commande->created_at->format('H:i') }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="{{ route('admin.commandes.show', $commande) }}"
                               class="text-blue-600 hover:text-blue-900 mr-3">
                                Voir
                            </a>
                            @if($commande->statut === 'en_attente')
                                <form method="POST" action="{{ route('admin.commandes.update-status', $commande) }}" class="inline">
                                    @csrf
                                    @method('PUT')
                                    <input type="hidden" name="statut" value="payee">
                                    <button type="submit"
                                            class="text-green-600 hover:text-green-900 mr-3"
                                            onclick="return confirm('Marquer cette commande comme payée ?')">
                                        Valider
                                    </button>
                                </form>
                                <form method="POST" action="{{ route('admin.commandes.update-status', $commande) }}" class="inline">
                                    @csrf
                                    @method('PUT')
                                    <input type="hidden" name="statut" value="annulee">
                                    <button type="submit"
                                            class="text-red-600 hover:text-red-900"
                                            onclick="return confirm('Annuler cette commande ?')">
                                        Annuler
                                    </button>
                                </form>
                            @endif
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($commandes->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $commandes->links() }}
        </div>
        @endif
    @else
        <div class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune commande</h3>
            <p class="mt-1 text-sm text-gray-500">Aucune commande trouvée pour le moment.</p>
        </div>
    @endif
</div>
@endsection
