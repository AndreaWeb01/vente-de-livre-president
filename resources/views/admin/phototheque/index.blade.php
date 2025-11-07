@extends('admin.layout')

@section('title', 'Photothèque')

@section('content')
<div class="mb-8 flex items-center justify-between">
    <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Photothèque</h1>
        <p class="text-xl text-gray-600">
            Retrouvez toutes les images uploadées dans la photothèque.
        </p>
    </div>
    <a href="{{ route('admin.phototheque.create') }}"
       class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Ajouter une image
    </a>
</div>

@if (session('success'))
    <div class="alert alert-success mb-4">
        {{ session('success') }}
    </div>
@endif

@if($phototheques->isEmpty())
    <div class="p-8 text-center text-gray-500">Aucune image trouvée pour l’instant.</div>
@else
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @foreach($phototheques as $photo)
            <div class="bg-white rounded shadow relative group">
                @if(isset($photo->photo))
                    <img src="{{ asset('images/phototheque/' . $photo->photo) }}"
                         alt="Image photothèque"
                         class="h-48 w-full object-cover rounded-t-lg" />
                @else
                    <div class="h-48 flex items-center justify-center bg-gray-100 text-gray-400">
                        Pas d'image
                    </div>
                @endif
                <div class="px-4 py-3">
                    <div class="font-semibold text-gray-800 mb-1">
                        {{ $photo->titre ?? 'Sans titre' }}
                    </div>
                    <div class="text-sm text-gray-600 mb-2 truncate">
                        {{ $photo->description ?? '' }}
                    </div>
                    <a href="{{ asset('images/phototheque/' . $photo->image) }}"
                        target="_blank"
                        class="text-blue-600 hover:underline text-xs">Voir en grand</a>
                </div>
            </div>
        @endforeach
    </div>
@endif
@endsection
