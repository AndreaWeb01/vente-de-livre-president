@extends('admin.layout')

@section('title', 'Ajouter une image à la photothèque')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Ajouter une image à la photothèque</h1>
    <p class="text-xl text-gray-600">
        Téléversez une nouvelle image pour enrichir la photothèque.
    </p>
</div>

@if ($errors->any())
    <div class="alert alert-danger mb-6">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Informations de l'image</h3>
    </div>

    <form method="POST" action="{{ route('admin.phototheque.store') }}" enctype="multipart/form-data" class="p-6 space-y-6">
        @csrf

        <div class="space-y-2">
            <label for="photo" class="block text-sm font-medium text-gray-700">Image *</label>
            <input type="file"
                   id="photo"
                   name="photo"
                   accept="image/*"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 @error('photo') border-red-300 @enderror"
                   required>
            <p class="text-sm text-gray-500">Formats acceptés : JPEG, PNG, JPG, GIF, SVG (max 2MB)</p>
            @error('photo')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>
        <div class="space-y-2">
            <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
            <input type="text"
                   id="titre"
                   name="titre"
                   class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 @error('titre') border-red-300 @enderror"
                   required>
            @error('titre')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>
        <div class="space-y-2">
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input type="date"
                   id="date"
                   name="date"
                   class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 @error('date') border-red-300 @enderror"
                   required>
            @error('date')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>
        <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description"
                      name="description"
                      rows="3"
                      class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 @error('description') border-red-300 @enderror"></textarea>
            @error('description')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
        </div>

        

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.phototheque.index') }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
            </a>
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Ajouter l'image
            </button>
        </div>
    </form>
</div>
@endsection
