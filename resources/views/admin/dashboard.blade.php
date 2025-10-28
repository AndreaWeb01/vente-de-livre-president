@extends('admin.layout')

@section('title', 'Dashboard Administrateur')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
    <p class="text-xl text-gray-600">
        Vue d'overview de votre plateforme de vente de livres et formations
    </p>
</div>

<!-- Statistiques principales -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-blue-600">Utilisateurs</p>
                <p class="text-3xl font-bold text-blue-900">{{ $stats['totalUsers'] }}</p>
            </div>
            <svg class="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
        </div>
    </div>

    <div class="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-green-600">Formations</p>
                <p class="text-3xl font-bold text-green-900">{{ $stats['totalFormations'] }}</p>
            </div>
            <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
        </div>
    </div>

    <div class="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-orange-600">Livres</p>
                <p class="text-3xl font-bold text-orange-900">{{ $stats['totalLivres'] }}</p>
            </div>
            <svg class="h-12 w-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
        </div>
    </div>

    <div class="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-purple-600">Commandes</p>
                <p class="text-3xl font-bold text-purple-900">{{ $stats['totalOrders'] }}</p>
            </div>
            <svg class="h-12 w-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
        </div>
    </div>
</div>

<!-- Revenus et graphiques -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <!-- Revenus -->
    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenus</h3>
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total des revenus</span>
                <span class="text-2xl font-bold text-green-600">
                    {{ number_format($stats['totalRevenue'], 0, ',', ' ') }} FCFA
                </span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Ce mois-ci</span>
                <span class="text-xl font-semibold text-blue-600">
                    {{ number_format($stats['monthlyRevenue'], 0, ',', ' ') }} FCFA
                </span>
            </div>
        </div>
    </div>

    <!-- Commandes par statut -->
    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Commandes par statut</h3>
        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600">Payées</span>
                </div>
                <span class="font-semibold text-green-600">{{ $stats['ordersByStatus']['payee'] }}</span>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600">En attente</span>
                </div>
                <span class="font-semibold text-yellow-600">{{ $stats['ordersByStatus']['en_attente'] }}</span>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm text-gray-600">Annulées</span>
                </div>
                <span class="font-semibold text-red-600">{{ $stats['ordersByStatus']['annulee'] }}</span>
            </div>
        </div>
    </div>
</div>

<!-- Contenu principal -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Commandes récentes -->
    <div class="lg:col-span-2">
        <div class="p-6 bg-white rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Commandes récentes</h3>
                <a href="{{ route('admin.commandes.index') }}" class="text-sm text-blue-600 hover:text-blue-800">
                    Voir toutes
                </a>
            </div>
            <div class="space-y-3">
                @forelse($stats['recentOrders'] as $order)
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="font-medium text-gray-900">#{{ $order['reference'] }}</span>
                            @if($order['statut'] === 'payee')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Payée
                                </span>
                            @elseif($order['statut'] === 'en_attente')
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    En attente
                                </span>
                            @else
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Annulée
                                </span>
                            @endif
                        </div>
                        <p class="text-sm text-gray-600">{{ $order['user_name'] }}</p>
                        <p class="text-xs text-gray-500">
                            {{ $order['items_count'] }} article(s) • {{ $order['mode_paiement'] }}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-900">{{ number_format($order['total'], 0, ',', ' ') }} FCFA</p>
                        <p class="text-xs text-gray-500">{{ $order['created_at'] }}</p>
                    </div>
                </div>
                @empty
                <p class="text-gray-500 text-center">Aucune commande récente</p>
                @endforelse
            </div>
        </div>
    </div>

    <!-- Formations et livres récents -->
    <div class="space-y-6">
        <!-- Formations récentes -->
        <div class="p-6 bg-white rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Formations récentes</h3>
                <a href="{{ route('admin.formations.index') }}" class="text-sm text-blue-600 hover:text-blue-800">
                    Voir toutes
                </a>
            </div>
            <div class="space-y-3">
                @forelse($stats['recentFormations'] as $formation)
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900 line-clamp-1">{{ $formation['titre'] }}</p>
                        <p class="text-sm text-gray-600">{{ $formation['formateur'] }}</p>
                        <p class="text-xs text-gray-500">{{ $formation['created_at'] }}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-900">{{ number_format($formation['prix'], 0, ',', ' ') }} FCFA</p>
                        @if($formation['est_actif'])
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Actif
                            </span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Inactif
                            </span>
                        @endif
                    </div>
                </div>
                @empty
                <p class="text-gray-500 text-center">Aucune formation récente</p>
                @endforelse
            </div>
        </div>

        <!-- Livres récents -->
        <div class="p-6 bg-white rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Livres récents</h3>
                <a href="{{ route('admin.livres.index') }}" class="text-sm text-blue-600 hover:text-blue-800">
                    Voir tous
                </a>
            </div>
            <div class="space-y-3">
                @forelse($stats['recentLivres'] as $livre)
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900 line-clamp-1">{{ $livre['titre'] }}</p>
                        <p class="text-sm text-gray-600">{{ $livre['auteur'] }}</p>
                        <p class="text-xs text-gray-500">{{ $livre['created_at'] }}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-900">{{ number_format($livre['prix'], 0, ',', ' ') }} FCFA</p>
                        <p class="text-xs text-gray-500">Stock: {{ $livre['stock'] }}</p>
                    </div>
                </div>
                @empty
                <p class="text-gray-500 text-center">Aucun livre récent</p>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection
