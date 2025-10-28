@extends('admin.layout')

@section('title', 'Détails de la Commande')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Commande #{{ $commande->reference }}</h1>
            <p class="text-xl text-gray-600">
                Détails de la commande
            </p>
        </div>
        <div class="flex space-x-3">
            @if($commande->statut === 'en_attente')
                <form method="POST" action="{{ route('admin.commandes.update-status', $commande) }}" class="inline">
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
                <form method="POST" action="{{ route('admin.commandes.update-status', $commande) }}" class="inline">
                    @csrf
                    @method('PUT')
                    <input type="hidden" name="statut" value="annulee">
                    <button type="submit"
                            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onclick="return confirm('Annuler cette commande ?')">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Annuler la commande
                    </button>
                </form>
            @endif
            <a href="{{ route('admin.commandes.index') }}"
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
                    <h3 class="text-lg font-semibold text-gray-900">Statut de la commande</h3>
                    <p class="text-sm text-gray-600 mt-1">Commande passée le {{ $commande->created_at->format('d/m/Y à H:i') }}</p>
                </div>
                <div>
                    @if($commande->statut === 'payee')
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Payée
                        </span>
                    @elseif($commande->statut === 'en_attente')
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                            </svg>
                            En attente
                        </span>
                    @else
                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
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
                            @else
                            <div class="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            @endif
                            <div>
                                <h4 class="font-medium text-gray-900">{{ $achat->achetable->titre }}</h4>
                                <p class="text-sm text-gray-600">Livre • {{ $achat->achetable->auteur->user->prenom }} {{ $achat->achetable->auteur->user->nom }}</p>
                            </div>
                        @else
                            @if($achat->achetable->image)
                            <img src="{{ str_starts_with($achat->achetable->image, 'http') ? $achat->achetable->image : asset('storage/' . $achat->achetable->image) }}"
                                 alt="{{ $achat->achetable->titre }}"
                                 class="h-16 w-12 object-cover rounded">
                            @else
                            <div class="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            @endif
                            <div>
                                <h4 class="font-medium text-gray-900">{{ $achat->achetable->titre }}</h4>
                                <p class="text-sm text-gray-600">Formation • {{ $achat->achetable->formateur }}</p>
                            </div>
                        @endif
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-900">Quantité: {{ $achat->quantite }}</div>
                        <div class="text-sm font-medium text-gray-900">{{ number_format($achat->prix_unitaire, 0, ',', ' ') }} FCFA</div>
                        <div class="text-sm font-semibold text-gray-900">{{ number_format($achat->prix_total, 0, ',', ' ') }} FCFA</div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Informations détaillées -->
    <div class="space-y-6">
        <!-- Informations client -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations client</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->user->prenom }} {{ $commande->user->nom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->user->email }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->user->telephone ?? 'Non renseigné' }}</dd>
                </div>
            </dl>
        </div>

        <!-- Informations de livraison -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations de livraison</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">Adresse</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->adresse ?? 'Non renseignée' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Ville</dt>
                    <dd class="text-sm text-gray-900">{{ $commande->ville ?? 'Non renseignée' }}</dd>
                </div>
            </dl>
        </div>

        <!-- Résumé de la commande -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h3>
            <dl class="space-y-3">
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Sous-total</dt>
                    <dd class="text-sm text-gray-900">{{ number_format($commande->total, 0, ',', ' ') }} FCFA</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Mode de paiement</dt>
                    <dd class="text-sm text-gray-900">
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
                    </dd>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between">
                        <dt class="text-base font-medium text-gray-900">Total</dt>
                        <dd class="text-base font-semibold text-gray-900">{{ number_format($commande->total, 0, ',', ' ') }} FCFA</dd>
                    </div>
                </div>
            </dl>
        </div>

        <!-- Notes -->
        @if($commande->notes)
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <p class="text-sm text-gray-700">{{ $commande->notes }}</p>
        </div>
        @endif
    </div>
</div>
@endsection
