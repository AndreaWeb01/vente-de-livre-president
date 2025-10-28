<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Livres - {{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased bg-gray-100">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900">Nos Livres</h1>
                    <div class="flex space-x-4">
                        @auth
                            <a href="{{ route('dashboard') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                Mon Dashboard
                            </a>
                        @else
                            <a href="{{ route('login') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                Se connecter
                            </a>
                        @endauth
                    </div>
                </div>
            </div>
        </header>

        <!-- Main content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                @if($livres->count() > 0)
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach($livres as $livre)
                            <div class="bg-white overflow-hidden shadow rounded-lg">
                                @if($livre->photo)
                                    <img class="h-48 w-full object-cover" src="{{ Storage::url($livre->photo) }}" alt="{{ $livre->titre }}">
                                @else
                                    <div class="h-48 w-full bg-gray-200 flex items-center justify-center">
                                        <span class="text-gray-500">Pas d'image</span>
                                    </div>
                                @endif

                                <div class="p-6">
                                    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $livre->titre }}</h3>
                                    <p class="text-sm text-gray-600 mb-2">Par {{ $livre->auteur->user->prenom }} {{ $livre->auteur->user->nom }}</p>
                                    <p class="text-sm text-gray-500 mb-4">{{ Str::limit($livre->description, 100) }}</p>

                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-bold text-green-600">{{ number_format($livre->prix, 2) }} €</span>
                                        @auth
                                            <form method="POST" action="{{ route('panier.add') }}" class="inline">
                                                @csrf
                                                <input type="hidden" name="achetable_type" value="App\Models\Livre">
                                                <input type="hidden" name="achetable_id" value="{{ $livre->id }}">
                                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                                    Acheter
                                                </button>
                                            </form>
                                        @else
                                            <a href="{{ route('login') }}" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                                Se connecter pour acheter
                                            </a>
                                        @endauth
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <!-- Pagination -->
                    <div class="mt-6">
                        {{ $livres->links() }}
                    </div>
                @else
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun livre disponible</h3>
                        <p class="mt-1 text-sm text-gray-500">Revenez plus tard pour découvrir nos nouveaux livres.</p>
                    </div>
                @endif
            </div>
        </main>
    </div>
</body>
</html>
