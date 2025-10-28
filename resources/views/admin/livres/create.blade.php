@extends('admin.layout')

@section('title', 'Créer un Livre')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Créer un nouveau livre</h1>
    <p class="text-xl text-gray-600">
        Ajoutez un nouveau livre à votre plateforme
    </p>
</div>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Informations du livre</h3>
    </div>

    <form method="POST" action="{{ route('admin.livres.store') }}" enctype="multipart/form-data" class="p-6 space-y-6">
        @csrf

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label for="titre" class="block text-sm font-medium text-gray-700">Titre *</label>
                <input type="text"
                       id="titre"
                       name="titre"
                       value="{{ old('titre') }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('titre') border-red-300 @enderror"
                       required>
                @error('titre')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="auteur_id" class="block text-sm font-medium text-gray-700">Auteur *</label>
                <select id="auteur_id"
                        name="auteur_id"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('auteur_id') border-red-300 @enderror"
                        required>
                    <option value="">Sélectionner un auteur</option>
                    @foreach($auteurs as $auteur)
                        <option value="{{ $auteur->id }}" {{ old('auteur_id') == $auteur->id ? 'selected' : '' }}>
                            {{ $auteur->user->prenom }} {{ $auteur->user->nom }}
                        </option>
                    @endforeach
                </select>
                @error('auteur_id')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="page" class="block text-sm font-medium text-gray-700">Nombre de pages *</label>
                <input type="number"
                       id="page"
                       name="page"
                       min="1"
                       value="{{ old('page') }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('page') border-red-300 @enderror"
                       required>
                @error('page')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="type" class="block text-sm font-medium text-gray-700">Type *</label>
                <select id="type"
                        name="type"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('type') border-red-300 @enderror"
                        required>
                    <option value="">Sélectionner un type</option>
                    <option value="physique" {{ old('type') === 'physique' ? 'selected' : '' }}>Physique</option>
                    <option value="numerique" {{ old('type') === 'numerique' ? 'selected' : '' }}>Numérique</option>
                </select>
                @error('type')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="langue" class="block text-sm font-medium text-gray-700">Langue *</label>
                <input type="text"
                       id="langue"
                       name="langue"
                       value="{{ old('langue') }}"
                       placeholder="Ex: Français, Anglais, etc."
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('langue') border-red-300 @enderror"
                       required>
                @error('langue')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="date_publication" class="block text-sm font-medium text-gray-700">Date de publication *</label>
                <input type="date"
                       id="date_publication"
                       name="date_publication"
                       value="{{ old('date_publication') }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('date_publication') border-red-300 @enderror"
                       required>
                @error('date_publication')
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
                       value="{{ old('prix') }}"
                       placeholder="0.00"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('prix') border-red-300 @enderror"
                       required>
                <p class="text-sm text-gray-500">Prix maximum : 999 999,99 FCFA</p>
                @error('prix')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="stock" class="block text-sm font-medium text-gray-700">Stock *</label>
                <input type="number"
                       id="stock"
                       name="stock"
                       min="0"
                       value="{{ old('stock', 0) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('stock') border-red-300 @enderror"
                       required>
                @error('stock')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="photo" class="block text-sm font-medium text-gray-700">Photo de couverture (optionnel)</label>
                <input type="file"
                       id="photo"
                       name="photo"
                       accept="image/*"
                       class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 @error('photo') border-red-300 @enderror">
                <p class="text-sm text-gray-500">Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)</p>
                @error('photo')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="livrepdf" class="block text-sm font-medium text-gray-700">PDF du livre (optionnel)</label>
                <input type="file"
                       id="livrepdf"
                       name="livrepdf"
                       accept=".pdf"
                       class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 @error('livrepdf') border-red-300 @enderror">
                <p class="text-sm text-gray-500">Format accepté: PDF (max 10MB)</p>
                @error('livrepdf')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>
        </div>

        <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Description *</label>
            <textarea id="description"
                      name="description"
                      rows="4"
                      placeholder="Entrez une description détaillée du livre"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('description') border-red-300 @enderror"
                      required>{{ old('description') }}</textarea>
            @error('description')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.livres.index') }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
            </a>
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Créer le livre
            </button>
        </div>
    </form>
</div>
@endsection
