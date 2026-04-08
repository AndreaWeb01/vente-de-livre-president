@extends('admin.layout')

@section('title', 'Détails de la Commande Invité')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Commande Invité #{{ $commande->reference }}</h1>
            <p class="text-xl text-gray-600">
                Détails de la commande passée par un visiteur
            </p>
        </div>
        <div class="flex space-x-3">
            @if($commande->statut === 'en_attente')
                <form method="POST" action="{{ route('admin.commandes-invites.update-status', $commande->id) }}" class="inline">
                    @csrf
                    @method('PUT')
                    <input type="hidden" name="statut" value="payee">
                    <button type="submit"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onclick="return confirm('Marquer cette commande comme payée ?')">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Valider la commande
                    </button>
                </form>
            @endif
            <a href="{{ route('admin.commandes-invites.index') }}"
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
        <!-- Statut de la commande -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">Statut de la commande (INVITÉ)</h3>
                    <p class="text-sm text-gray-600 mt-1">Commande passée le {{ $commande->created_at->format('d/m/Y à H:i') }}</p>
                </div>
                <div>
                    @if($commande->statut === 'payee')
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Payée
                        </span>
                    @elseif($commande->statut === 'en_attente')
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            En attente
                        </span>
                    @else
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Annulée
                        </span>
                    @endif
                </div>
            </div>
        </div>

        <!-- Articles commandés -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Articles commandés</h3>
            <div class="space-y-4">
                @foreach($commande->achats as $achat)
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-4">
                        @if($achat->achetable_type === 'App\Models\Livre')
                            @if($achat->achetable->photo)
                            <img src="{{ str_starts_with($achat->achetable->photo, 'http') ? $achat->achetable->photo : asset('storage/' . $achat->achetable->photo) }}"
                                 alt="{{ $achat->achetable->titre }}"
                                 class="h-16 w-12 object-cover rounded">
                            @endif
                            <div>
                                <h4 class="font-medium text-gray-900">{{ $achat->achetable->titre }}</h4>
                                <p class="text-sm text-gray-600">Livre physique</p>
                            </div>
                        @else
                           <div>
                                <h4 class="font-medium text-gray-900">Produit numérique</h4>
                                <p class="text-sm text-gray-600">{{ $achat->achetable->titre ?? 'N/A' }}</p>
                            </div>
                        @endif
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-semibold text-gray-900">{{ number_format($achat->prix, 0, ',', ' ') }} FCFA</div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Informations détaillées -->
    <div class="space-y-6">
        <!-- Informations client (Invité) -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Client (Visiteur)</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->prenom }} {{ $commande->nom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->email }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->telephone }}</dd>
                </div>
            </dl>
        </div>

        <!-- Informations de livraison -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Livraison</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">Pays / Ville</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->pays }} / {{ $commande->ville }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Quartier / Adresse</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->quartier }} - {{ $commande->adresse }}</dd>
                </div>
            </dl>
        </div>

        <!-- Résumé financier -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Résumé financier</h3>
            <dl class="space-y-3">
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Total payé</dt>
                    <dd class="text-sm font-semibold text-gray-900">{{ number_format($commande->total, 0, ',', ' ') }} FCFA</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Mode</dt>
                    <dd class="text-sm text-gray-900">
                        @switch($commande->mode_paiement)
                            @case('mobile_money')
                                📱 Mobile Money
                                @break
                            @case('card')
                            @case('carte_credit')
                                💳 Carte
                                @break
                            @case('cash')
                            @case('espece')
                                💵 Espèces
                                @break
                            @default
                                {{ ucfirst($commande->mode_paiement) }}
                        @endswitch
                    </dd>
                </div>
            </dl>
            @if($commande->notes)
            <div class="mt-4 pt-4 border-t border-gray-100">
                <dt class="text-sm font-medium text-gray-500 mb-1">Notes client</dt>
                <dd class="text-sm text-gray-700 italic">"{{ $commande->notes }}"</dd>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
