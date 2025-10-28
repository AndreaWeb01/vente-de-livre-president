@extends('admin.layout')

@section('title', 'Détails de la Formation')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ $formation->titre }}</h1>
            <p class="text-xl text-gray-600">
                Détails de la formation
            </p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('admin.formations.edit', $formation) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
            </a>
            <a href="{{ route('admin.formations.index') }}"
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
            @if($formation->image)
            <div class="aspect-video overflow-hidden">
                <img src="{{ str_starts_with($formation->image, 'http') ? $formation->image : asset('storage/' . $formation->image) }}"
                     alt="{{ $formation->titre }}"
                     class="w-full h-full object-cover">
            </div>
            @endif

            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">{{ $formation->titre }}</h2>
                        <p class="text-lg text-gray-600 mt-1">Par {{ $formation->formateur }}</p>
                    </div>
                    @if($formation->est_actif)
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Actif
                        </span>
                    @else
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
                            Inactif
                        </span>
                    @endif
                </div>

                <div class="prose max-w-none">
                    <p class="text-gray-700 leading-relaxed">{{ $formation->description }}</p>
                </div>

                @if($formation->url_video)
                <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">🎥 Vidéo de présentation</h3>
                    <a href="{{ $formation->url_video }}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="text-blue-600 hover:text-blue-800 underline">
                        {{ $formation->url_video }}
                    </a>
                </div>
                @endif

                @if($formation->url_zoom)
                <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">📄 Document PDF</h3>
                    <a href="{{ str_starts_with($formation->url_zoom, 'http') ? $formation->url_zoom : asset('storage/' . $formation->url_zoom) }}"
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
                    <dt class="text-sm font-medium text-gray-500">Type</dt>
                    <dd class="text-sm text-gray-900">{{ ucfirst(str_replace('_', ' ', $formation->type)) }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Domaine</dt>
                    <dd class="text-sm text-gray-900">{{ $formation->domaine }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Date</dt>
                    <dd class="text-sm text-gray-900">{{ \Carbon\Carbon::parse($formation->date)->format('d/m/Y') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Prix</dt>
                    <dd class="text-sm text-gray-900 font-semibold">{{ number_format($formation->prix, 0, ',', ' ') }} FCFA</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Créé le</dt>
                    <dd class="text-sm text-gray-900">{{ $formation->created_at->format('d/m/Y à H:i') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Modifié le</dt>
                    <dd class="text-sm text-gray-900">{{ $formation->updated_at->format('d/m/Y à H:i') }}</dd>
                </div>
            </dl>
        </div>

        <!-- Créateur -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Créateur</h3>
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">
                            {{ substr($formation->user->prenom, 0, 1) }}{{ substr($formation->user->nom, 0, 1) }}
                        </span>
                    </div>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ $formation->user->prenom }} {{ $formation->user->nom }}</p>
                    <p class="text-sm text-gray-500">{{ $formation->user->email }}</p>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div class="space-y-3">
                <a href="{{ route('admin.formations.edit', $formation) }}"
                   class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Modifier la formation
                </a>

                <form method="POST" action="{{ route('admin.formations.destroy', $formation) }}"
                      onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit"
                            class="w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Supprimer la formation
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
