<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Inscription - {{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased bg-gray-50">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <!-- Logo/Header -->
            <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Inscription</h1>
                <p class="mt-2 text-sm text-gray-600">Créez votre compte</p>
            </div>

            <!-- Messages d'erreur -->
            @if ($errors->any())
                <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">Erreur d'inscription</h3>
                            <div class="mt-2 text-sm text-red-700">
                                <ul class="list-disc list-inside space-y-1">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            <!-- Formulaire d'inscription -->
            <form method="POST" action="{{ route('register') }}">
                @csrf

                <!-- Prénom -->
                <div class="mb-4">
                    <label for="prenom" class="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                    </label>
                    <input id="prenom"
                           type="text"
                           name="prenom"
                           value="{{ old('prenom') }}"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('prenom') border-red-300 @enderror"
                           placeholder="Votre prénom"
                           required
                           autofocus>
                </div>

                <!-- Nom -->
                <div class="mb-4">
                    <label for="nom" class="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                    </label>
                    <input id="nom"
                           type="text"
                           name="nom"
                           value="{{ old('nom') }}"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('nom') border-red-300 @enderror"
                           placeholder="Votre nom"
                           required>
                </div>

                <!-- Email -->
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input id="email"
                           type="email"
                           name="email"
                           value="{{ old('email') }}"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('email') border-red-300 @enderror"
                           placeholder="votre@email.com"
                           required>
                </div>

                <!-- Téléphone -->
                <div class="mb-4">
                    <label for="telephone" class="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                    </label>
                    <input id="telephone"
                           type="tel"
                           name="telephone"
                           value="{{ old('telephone') }}"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('telephone') border-red-300 @enderror"
                           placeholder="Votre numéro de téléphone">
                </div>

                <!-- Mot de passe -->
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe
                    </label>
                    <input id="password"
                           type="password"
                           name="password"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('password') border-red-300 @enderror"
                           placeholder="Choisissez un mot de passe sécurisé"
                           required>
                </div>

                <!-- Confirmation mot de passe -->
                <div class="mb-6">
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe
                    </label>
                    <input id="password_confirmation"
                           type="password"
                           name="password_confirmation"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                           placeholder="Confirmez votre mot de passe"
                           required>
                </div>

                <!-- Bouton d'inscription -->
                <div class="flex items-center justify-end">
                    <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                        S'inscrire
                    </button>
                </div>
            </form>

            <!-- Lien vers la connexion -->
            @if (Route::has('login'))
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Déjà un compte ?
                        <a href="{{ route('login') }}" class="font-medium text-blue-600 hover:text-blue-500">
                            Se connecter
                        </a>
                    </p>
                </div>
            @endif
        </div>
    </div>
</body>
</html>
