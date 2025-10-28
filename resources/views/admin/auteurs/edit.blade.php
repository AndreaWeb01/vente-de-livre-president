@extends('admin.layout')

@section('title', 'Modifier l\'Auteur')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Modifier l'auteur</h1>
    <p class="text-xl text-gray-600">
        Modifiez les informations de l'auteur
    </p>
</div>

<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Informations de l'auteur</h3>
    </div>

    <form method="POST" action="{{ route('admin.auteurs.update', $auteur) }}" class="p-6 space-y-6">
        @csrf
        @method('PUT')

        <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Utilisateur associé</h3>
            <p class="text-sm text-gray-600">{{ $auteur->user->prenom }} {{ $auteur->user->nom }}</p>
            <p class="text-sm text-gray-600">{{ $auteur->user->email }}</p>
        </div>

        <div class="space-y-2">
            <label for="biographie" class="block text-sm font-medium text-gray-700">Biographie</label>
            <textarea id="biographie"
                      name="biographie"
                      rows="4"
                      placeholder="Entrez une biographie de l'auteur"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('biographie') border-red-300 @enderror">{{ old('biographie', $auteur->biographie) }}</textarea>
            @error('biographie')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.auteurs.show', $auteur) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
            </a>
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Mettre à jour l'auteur
            </button>
        </div>
    </form>
</div>
@endsection
