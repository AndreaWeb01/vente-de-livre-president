@extends('admin.layout')

@section('title', 'Détails du Livre')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $livre->titre }}</h1>
            <p class="text-xl text-gray-600">
                Détails du livre
            </p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('admin.livres.edit', $livre) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
            </a>
            <a href="{{ route('admin.livres.index') }}"
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
        <div class="bg-white rounded-lg shadow overflow-hidden">
            @if($livre->photo)
            <div class="aspect-video overflow-hidden">
                <img src="{{ str_starts_with($livre->photo, 'http') ? $livre->photo : asset('storage/' . $livre->photo) }}"
                     alt="{{ $livre->titre }}"
                     class="w-full h-full object-cover">
            </div>
            @endif

            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">{{ $livre->titre }}</h2>
                        <p class="text-lg text-gray-600 mt-1">Par {{ $livre->auteur->user->prenom }} {{ $livre->auteur->user->nom }}</p>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Stock: {{ $livre->stock }}
                    </span>
                </div>

                <div class="prose max-w-none">
                    <p class="text-gray-700 leading-relaxed">{{ $livre->description }}</p>
                </div>

                @if($livre->livrepdf)
                <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">📄 PDF du livre</h3>
                    <a href="{{ str_starts_with($livre->livrepdf, 'http') ? $livre->livrepdf : asset('storage/' . $livre->livrepdf) }}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Télécharger le PDF
                    </a>
                </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Informations détaillées -->
    <div class="space-y-6">
        <!-- Informations générales -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
            <dl class="space-y-3">
                <div>
                    <dt class="text-sm font-medium text-gray-500">ISBN</dt>
                    <dd class="text-sm text-gray-900 font-mono">{{ $livre->isbn }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Prix</dt>
                    <dd class="text-sm text-gray-900 font-semibold">{{ number_format($livre->prix, 0, ',', ' ') }} FCFA</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Stock disponible</dt>
                    <dd class="text-sm text-gray-900">{{ $livre->stock }} exemplaire(s)</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Créé le</dt>
                    <dd class="text-sm text-gray-900">{{ $livre->created_at->format('d/m/Y à H:i') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Modifié le</dt>
                    <dd class="text-sm text-gray-900">{{ $livre->updated_at->format('d/m/Y à H:i') }}</dd>
                </div>
            </dl>
        </div>

        <!-- Auteur -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Auteur</h3>
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">
                            {{ substr($livre->auteur->user->prenom, 0, 1) }}{{ substr($livre->auteur->user->nom, 0, 1) }}
                        </span>
                    </div>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ $livre->auteur->user->prenom }} {{ $livre->auteur->user->nom }}</p>
                    <p class="text-sm text-gray-500">{{ $livre->auteur->user->email }}</p>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div class="space-y-3">
                <a href="{{ route('admin.livres.edit', $livre) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Modifier le livre
                </a>

                <form method="POST" action="{{ route('admin.livres.destroy', $livre) }}"
                      onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit"
                            class="w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Supprimer le livre
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
