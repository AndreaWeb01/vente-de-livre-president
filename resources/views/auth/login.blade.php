<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Connexion - {{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->


    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased bg-gray-50">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <!-- Logo/Header -->
            <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Connexion</h1>
                <p class="mt-2 text-sm text-gray-600">Accédez à votre compte</p>
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
                            <h3 class="text-sm font-medium text-red-800">Erreur de connexion</h3>
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

            <!-- Formulaire de connexion -->
            <form method="POST" action="{{ route('admin.login.store') }}">
                @csrf
                <!-- Email ou Téléphone -->
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email ou Téléphone
                    </label>
                    <input id="email"
                           type="text"
                           name="email"
                           value="{{ old('email') }}"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('email') border-red-300 @enderror"
                           placeholder="Entrez votre email ou numéro de téléphone"
                           required
                           autofocus>
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
                           placeholder="Entrez votre mot de passe"
                           required>
                </div>

                <!-- Se souvenir de moi -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center">
                        <input id="remember_me"
                               name="remember"
                               type="checkbox"
                               class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                            Se souvenir de moi
                        </label>
                    </div>

                    {{-- <a class="text-sm text-blue-600 hover:text-blue-500" href="{{ route('password.request') }}">
                        Mot de passe oublié ?
                    </a> --}}
                </div>

                <!-- Bouton de connexion -->
                <div class="flex items-center justify-end">
                    <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                        Se connecter
                    </button>
                </div>
            </form>

            <!-- Lien vers l'inscription -->
            @if (Route::has('register'))
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Pas encore de compte ?
                        <a href="{{ route('register') }}" class="font-medium text-blue-600 hover:text-blue-500">
                            Créer un compte
                        </a>
                    </p>
                </div>
            @endif
        </div>
    </div>
</body>
</html>
