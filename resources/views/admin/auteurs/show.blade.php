@extends('admin.layout')

@section('title', 'Détails de l\'Auteur')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $auteur->user->prenom }} {{ $auteur->user->nom }}</h1>
            <p class="text-xl text-gray-600">
                Détails de l'auteur
            </p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('admin.auteurs.edit', $auteur) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
            </a>
            <a href="{{ route('admin.auteurs.index') }}"
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
        <!-- Profil auteur -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex items-center mb-6">
                <div class="flex-shrink-0 h-20 w-20">
                    <div class="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-2xl font-medium text-gray-700">
                            {{ substr($auteur->user->prenom, 0, 1) }}{{ substr($auteur->user->nom, 0, 1) }}
                        </span>
                    </div>
                </div>
                <div class="ml-6">
                    <h2 class="text-2xl font-bold text-gray-900">{{ $auteur->user->prenom }} {{ $auteur->user->nom }}</h2>
                    <p class="text-lg text-gray-600">{{ $auteur->user->email }}</p>
                    <div class="flex items-center mt-2">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                            </svg>
                            {{ ucfirst($auteur->specialite) }}
                        </span>
                    </div>
                </div>
            </div>

            @if($auteur->biographie)
            <div class="prose max-w-none">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Biographie</h3>
                <p class="text-gray-700 leading-relaxed">{{ $auteur->biographie }}</p>
            </div>
            @endif
        </div>

        <!-- Livres de l'auteur -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Livres de l'auteur</h3>
            @if($auteur->livres->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @foreach($auteur->livres as $livre)
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            @if($livre->photo)
                            <img src="{{ str_starts_with($livre->photo, 'http') ? $livre->photo : asset('storage/' . $livre->photo) }}"
                                 alt="{{ $livre->titre }}"
                                 class="h-12 w-8 object-cover rounded">
                            @else
                            <div class="h-12 w-8 bg-gray-200 rounded flex items-center justify-center">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            @endif
                            <div>
                                <h4 class="font-medium text-gray-900">{{ $livre->titre }}</h4>
                                <p class="text-sm text-gray-600">{{ number_format($livre->prix, 0, ',', ' ') }} FCFA</p>
                            </div>
                        </div>
                        <a href="{{ route('admin.livres.show', $livre) }}"
                           class="text-blue-600 hover:text-blue-900 text-sm">
                            Voir
                        </a>
                    </div>
                    @endforeach
                </div>
            @else
                <p class="text-gray-500 text-center">Aucun livre publié</p>
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
                    <dd class="text-sm text-gray-900">{{ $auteur->user->prenom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Nom</dt>
                    <dd class="text-sm text-gray-900">{{ $auteur->user->nom }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="text-sm text-gray-900">{{ $auteur->user->email }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd class="text-sm text-gray-900">{{ $auteur->user->telephone ?? 'Non renseigné' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Spécialité</dt>
                    <dd class="text-sm text-gray-900">{{ ucfirst($auteur->specialite) }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Inscription</dt>
                    <dd class="text-sm text-gray-900">{{ $auteur->created_at->format('d/m/Y à H:i') }}</dd>
                </div>
            </dl>
        </div>

        <!-- Statistiques -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
            <dl class="space-y-3">
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Livres publiés</dt>
                    <dd class="text-sm text-gray-900">{{ $auteur->livres->count() }}</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Prix moyen</dt>
                    <dd class="text-sm text-gray-900">
                        {{ $auteur->livres->count() > 0 ? number_format($auteur->livres->avg('prix'), 0, ',', ' ') : '0' }} FCFA
                    </dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Dernier livre</dt>
                    <dd class="text-sm text-gray-900">
                        {{ $auteur->livres->count() > 0 ? $auteur->livres->sortByDesc('created_at')->first()->created_at->format('d/m/Y') : 'Aucun' }}
                    </dd>
                </div>
            </dl>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div class="space-y-3">
                <a href="{{ route('admin.auteurs.edit', $auteur) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Modifier l'auteur
                </a>

                <a href="{{ route('admin.livres.index', ['auteur' => $auteur->id]) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Voir tous les livres
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
