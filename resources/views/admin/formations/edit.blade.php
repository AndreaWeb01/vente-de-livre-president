@extends('admin.layout')

@section('title', 'Modifier la Formation')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Modifier la formation</h1>
    <p class="text-xl text-gray-600">
        Modifiez les informations de la formation
    </p>
</div>

<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Informations de la formation</h3>
    </div>

    <form method="POST" action="{{ route('admin.formations.update', $formation) }}" enctype="multipart/form-data" class="p-6 space-y-6">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label for="titre" class="block text-sm font-medium text-gray-700">Titre *</label>
                <input type="text"
                       id="titre"
                       name="titre"
                       value="{{ old('titre', $formation->titre) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('titre') border-red-300 @enderror"
                       required>
                @error('titre')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="type" class="block text-sm font-medium text-gray-700">Type de formation *</label>
                <select id="type"
                        name="type"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('type') border-red-300 @enderror"
                        required>
                    <option value="">Sélectionner un type de formation</option>
                    <option value="en_ligne" {{ old('type', $formation->type) === 'en_ligne' ? 'selected' : '' }}>En ligne</option>
                    <option value="presentiel" {{ old('type', $formation->type) === 'presentiel' ? 'selected' : '' }}>Présentiel</option>
                    <option value="hybride" {{ old('type', $formation->type) === 'hybride' ? 'selected' : '' }}>Hybride</option>
                    <option value="webinaire" {{ old('type', $formation->type) === 'webinaire' ? 'selected' : '' }}>Webinaire</option>
                    <option value="atelier" {{ old('type', $formation->type) === 'atelier' ? 'selected' : '' }}>Atelier</option>
                    <option value="conference" {{ old('type', $formation->type) === 'conference' ? 'selected' : '' }}>Conférence</option>
                    <option value="formation_continue" {{ old('type', $formation->type) === 'formation_continue' ? 'selected' : '' }}>Formation continue</option>
                    <option value="certification" {{ old('type', $formation->type) === 'certification' ? 'selected' : '' }}>Certification</option>
                </select>
                @error('type')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="formateur" class="block text-sm font-medium text-gray-700">Formateur *</label>
                <input type="text"
                       id="formateur"
                       name="formateur"
                       value="{{ old('formateur', $formation->formateur) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('formateur') border-red-300 @enderror"
                       required>
                @error('formateur')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="domaine" class="block text-sm font-medium text-gray-700">Domaine *</label>
                <input type="text"
                       id="domaine"
                       name="domaine"
                       value="{{ old('domaine', $formation->domaine) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('domaine') border-red-300 @enderror"
                       required>
                @error('domaine')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="date" class="block text-sm font-medium text-gray-700">Date *</label>
                <input type="date"
                       id="date"
                       name="date"
                       value="{{ old('date', $formation->date) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('date') border-red-300 @enderror"
                       required>
                @error('date')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="prix" class="block text-sm font-medium text-gray-700">Prix (FCFA) *</label>
                <input type="number"
                       id="prix"
                       name="prix"
                       step="0.01"
                       min="0"
                       max="999999.99"
                       value="{{ old('prix', $formation->prix) }}"
                       placeholder="0.00"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('prix') border-red-300 @enderror"
                       required>
                <p class="text-sm text-gray-500">Prix maximum : 999 999,99 FCFA</p>
                @error('prix')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="stock" class="block text-sm font-medium text-gray-700">Stock (nombre de places) *</label>
                <input type="number"
                       id="stock"
                       name="stock"
                       min="0"
                       value="{{ old('stock', $formation->stock ?? 0) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('stock') border-red-300 @enderror"
                       required>
                @error('stock')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="image" class="block text-sm font-medium text-gray-700">Nouvelle image (optionnel)</label>
                <input type="file"
                       id="image"
                       name="image"
                       accept="image/*"
                       class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 @error('image') border-red-300 @enderror">
                @if($formation->image)
                    <div class="mt-2">
                        <p class="text-sm text-gray-600 mb-2">Image actuelle :</p>
                        <img src="{{ str_starts_with($formation->image, 'http') ? $formation->image : asset('storage/' . $formation->image) }}"
                             alt="Image actuelle"
                             class="h-20 w-32 object-cover rounded border">
                    </div>
                @endif
                <p class="text-sm text-gray-500">Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)</p>
                @error('image')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="url_video" class="block text-sm font-medium text-gray-700">URL de la vidéo (optionnel)</label>
                <input type="url"
                       id="url_video"
                       name="url_video"
                       value="{{ old('url_video', $formation->url_video) }}"
                       placeholder="https://youtube.com/watch?v=..."
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('url_video') border-red-300 @enderror">
                @error('url_video')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="url_zoom" class="block text-sm font-medium text-gray-700">Nouveau PDF (optionnel)</label>
                <input type="file"
                       id="url_zoom"
                       name="url_zoom"
                       accept=".pdf"
                       class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 @error('url_zoom') border-red-300 @enderror">
                @if($formation->url_zoom)
                    <div class="mt-2">
                        <p class="text-sm text-gray-600 mb-2">PDF actuel :</p>
                        <a href="{{ str_starts_with($formation->url_zoom, 'http') ? $formation->url_zoom : asset('storage/' . $formation->url_zoom) }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Voir le PDF actuel
                        </a>
                    </div>
                @endif
                <p class="text-sm text-gray-500">Format accepté: PDF (max 10MB)</p>
                @error('url_zoom')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>
        </div>

        <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Description *</label>
            <textarea id="description"
                      name="description"
                      rows="4"
                      placeholder="Entrez une description détaillée de la formation"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('description') border-red-300 @enderror"
                      required>{{ old('description', $formation->description) }}</textarea>
            @error('description')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div class="flex items-center space-x-2">
            <input type="checkbox"
                   id="est_actif"
                   name="est_actif"
                   value="1"
                   {{ old('est_actif', $formation->est_actif) ? 'checked' : '' }}
                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <label for="est_actif" class="text-sm font-medium text-gray-700">Actif</label>
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.formations.show', $formation) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
            </a>
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Mettre à jour la formation
            </button>
        </div>
    </form>
</div>
@endsection
