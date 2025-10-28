@extends('admin.layout')

@section('title', 'Gestion des Formations')

@section('content')
<div class="mb-8">
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestion des Formations</h1>
            <p class="text-xl text-gray-600">
                Gérez toutes les formations de votre plateforme
            </p>
        </div>
        <a href="{{ route('admin.formations.create') }}"
           class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nouvelle formation
        </a>
    </div>
</div>

<!-- Filtres -->
<div class="bg-white p-6 rounded-lg shadow mb-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
    <form method="GET" action="{{ route('admin.formations.index') }}" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="text"
                   name="search"
                   value="{{ request('search') }}"
                   placeholder="Rechercher par titre ou formateur..."
                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        </div>

        <select name="type"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="">Tous les types</option>
            <option value="en_ligne" {{ request('type') === 'en_ligne' ? 'selected' : '' }}>En ligne</option>
            <option value="presentiel" {{ request('type') === 'presentiel' ? 'selected' : '' }}>Présentiel</option>
            <option value="hybride" {{ request('type') === 'hybride' ? 'selected' : '' }}>Hybride</option>
            <option value="webinaire" {{ request('type') === 'webinaire' ? 'selected' : '' }}>Webinaire</option>
        </select>

        <div class="flex gap-2">
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Filtrer
            </button>
            <a href="{{ route('admin.formations.index') }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Effacer
            </a>
        </div>
    </form>
</div>

<!-- Liste des formations -->
<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Toutes les formations</h3>
    </div>

    @if($formations->count() > 0)
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            @foreach($formations as $formation)
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                @if($formation->image)
                <div class="aspect-video overflow-hidden">
                    <img src="{{ str_starts_with($formation->image, 'http') ? $formation->image : asset('storage/' . $formation->image) }}"
                         alt="{{ $formation->titre }}"
                         class="w-full h-full object-cover">
                </div>
                @endif

                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-lg text-gray-900 line-clamp-2">{{ $formation->titre }}</h3>
                        @if($formation->est_actif)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Actif
                            </span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Inactif
                            </span>
                        @endif
                    </div>

                    <p class="text-sm text-gray-600 mb-2">👨‍🏫 {{ $formation->formateur }}</p>
                    <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ $formation->description }}</p>

                    <div class="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>{{ ucfirst(str_replace('_', ' ', $formation->type)) }}</span>
                        <span>{{ $formation->domaine }}</span>
                    </div>

                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-bold text-green-600">{{ number_format($formation->prix, 0, ',', ' ') }} FCFA</span>
                        <span class="text-sm text-gray-500">{{ $formation->created_at->format('d/m/Y') }}</span>
                    </div>

                    <div class="flex gap-2">
                        <a href="{{ route('admin.formations.show', $formation) }}"
                           class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Voir
                        </a>
                        <a href="{{ route('admin.formations.edit', $formation) }}"
                           class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Modifier
                        </a>
                        <form method="POST" action="{{ route('admin.formations.destroy', $formation) }}"
                              class="inline"
                              onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit"
                                    class="inline-flex justify-center items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <!-- Pagination -->
        @if($formations->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $formations->links() }}
        </div>
        @endif
    @else
        <div class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune formation</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par créer une nouvelle formation.</p>
            <div class="mt-6">
                <a href="{{ route('admin.formations.create') }}"
                   class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Nouvelle formation
                </a>
            </div>
        </div>
    @endif
</div>
@endsection
