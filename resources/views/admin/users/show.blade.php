@extends('admin.layout')

@section('title', 'Détails de l\'Utilisateur')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $user->prenom }} {{ $user->nom }}</h1>
            <p class="text-xl text-gray-600">
                Détails de l'utilisateur
            </p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('admin.users.edit', $user) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
            </a>
            <a href="{{ route('admin.users.index') }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Retour
            </a>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Informations principales -->
    <div class="lg:col-span-2">
        <!-- Profil utilisateur -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex items-center mb-6">
                <div class="flex-shrink-0 h-20 w-20">
                    <div class="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-2xl font-medium text-gray-700">
                            {{ substr($user->prenom, 0, 1) }}{{ substr($user->nom, 0, 1) }}
                        </span>
                    </div>
                </div>
                <div class="ml-6">
                    <h2 class="text-2xl font-bold text-gray-900">{{ $user->prenom }} {{ $user->nom }}</h2>
                    <p class="text-lg text-gray-600">{{ $user->email }}</p>
                    <div class="flex items-center mt-2 space-x-4">
                        @if($user->hasRole('admin'))
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
                                </svg>
                                Administrateur
                            </span>
                        @elseif($user->hasRole('editor'))
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                </svg>
                                Éditeur
                            </span>
                        @else
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                Utilisateur
                            </span>
                        @endif

                        @if($user->email_verified_at)
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                Vérifié
                            </span>
                        @else
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                </svg>
                                Non vérifié
                            </span>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Commandes récentes -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h3>
            @if($user->commandes->count() > 0)
                <div class="space-y-3">
                    @foreach($user->commandes->take(5) as $commande)
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-medium text-gray-900">#{{ $commande->reference }}</span>
                                @if($commande->statut === 'payee')
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Payée
                                    </span>
                                @elseif($commande->statut === 'en_attente')
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        En attente
                                    </span>
                                @else
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Annulée
                                    </span>
                                @endif
                            </div>
                            <p class="text-sm text-gray-600">{{ $commande->achats->count() }} article(s) • {{ ucfirst($commande->mode_paiement) }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-gray-900">{{ number_format($commande->total, 0, ',', ' ') }} FCFA</p>
                            <p class="text-xs text-gray-500">{{ $commande->created_at->format('d/m/Y') }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
                @if($user->commandes->count() > 5)
                    <div class="mt-4 text-center">
                        <a href="{{ route('admin.commandes.index', ['search' => $user->email]) }}"
                           class="text-sm text-blue-600 hover:text-blue-800">
                            Voir toutes les commandes ({{ $user->commandes->count() }})
                        </a>
                    </div>
                @endif
            @else
                <p class="text-gray-500 text-center">Aucune commande</p>
            @endif
        </div>
    </div>

    <!-- Informations détaillées -->
    <div class="space-y-6">
        <!-- Informations personnelles -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">Prénom</dt>
                    <dd class="text-sm text-gray-900">{{ $user->prenom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Nom</dt>
                    <dd class="text-sm text-gray-900">{{ $user->nom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="text-sm text-gray-900">{{ $user->email }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd class="text-sm text-gray-900">{{ $user->telephone ?? 'Non renseigné' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Inscription</dt>
                    <dd class="text-sm text-gray-900">{{ $user->created_at->format('d/m/Y à H:i') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Dernière connexion</dt>
                    <dd class="text-sm text-gray-900">{{ $user->last_login_at ? $user->last_login_at->format('d/m/Y à H:i') : 'Jamais' }}</dd>
                </div>
            </dl>
        </div>

        <!-- Statistiques -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
            <dl class="space-y-3">
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Commandes totales</dt>
                    <dd class="text-sm text-gray-900">{{ $user->commandes->count() }}</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Montant total dépensé</dt>
                    <dd class="text-sm text-gray-900">{{ number_format($user->commandes->where('statut', 'payee')->sum('total'), 0, ',', ' ') }} FCFA</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Articles achetés</dt>
                    <dd class="text-sm text-gray-900">{{ $user->achats->count() }}</dd>
                </div>
            </dl>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div class="space-y-3">
                <a href="{{ route('admin.users.edit', $user) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Modifier l'utilisateur
                </a>

                <a href="{{ route('admin.commandes.index', ['search' => $user->email]) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                    Voir les commandes
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
