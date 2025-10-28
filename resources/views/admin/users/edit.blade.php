@extends('admin.layout')

@section('title', 'Modifier l\'Utilisateur')

@section('content')
<div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Modifier l'utilisateur</h1>
    <p class="text-xl text-gray-600">
        Modifiez les informations de l'utilisateur
    </p>
</div>

<div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Informations de l'utilisateur</h3>
    </div>

    <form method="POST" action="{{ route('admin.users.update', $user) }}" class="p-6 space-y-6">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom *</label>
                <input type="text"
                       id="prenom"
                       name="prenom"
                       value="{{ old('prenom', $user->prenom) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('prenom') border-red-300 @enderror"
                       required>
                @error('prenom')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="nom" class="block text-sm font-medium text-gray-700">Nom *</label>
                <input type="text"
                       id="nom"
                       name="nom"
                       value="{{ old('nom', $user->nom) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('nom') border-red-300 @enderror"
                       required>
                @error('nom')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email *</label>
                <input type="email"
                       id="email"
                       name="email"
                       value="{{ old('email', $user->email) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('email') border-red-300 @enderror"
                       required>
                @error('email')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="telephone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel"
                       id="telephone"
                       name="telephone"
                       value="{{ old('telephone', $user->telephone) }}"
                       class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('telephone') border-red-300 @enderror">
                @error('telephone')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="role" class="block text-sm font-medium text-gray-700">Rôle *</label>
                <select id="role"
                        name="role"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('role') border-red-300 @enderror"
                        required>
                    <option value="">Sélectionner un rôle</option>
                    <option value="user" {{ old('role', $user->getRoleNames()->first()) === 'user' ? 'selected' : '' }}>Utilisateur</option>
                    <option value="editor" {{ old('role', $user->getRoleNames()->first()) === 'editor' ? 'selected' : '' }}>Éditeur</option>
                    <option value="admin" {{ old('role', $user->getRoleNames()->first()) === 'admin' ? 'selected' : '' }}>Administrateur</option>
                </select>
                @error('role')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="space-y-2">
                <label for="email_verified_at" class="block text-sm font-medium text-gray-700">Statut de vérification</label>
                <select id="email_verified_at"
                        name="email_verified_at"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('email_verified_at') border-red-300 @enderror">
                    <option value="0" {{ !$user->email_verified_at ? 'selected' : '' }}>Non vérifié</option>
                    <option value="1" {{ $user->email_verified_at ? 'selected' : '' }}>Vérifié</option>
                </select>
                @error('email_verified_at')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
            <h4 class="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe (optionnel)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label for="password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <input type="password"
                           id="password"
                           name="password"
                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm @error('password') border-red-300 @enderror">
                    @error('password')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div class="space-y-2">
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                    <input type="password"
                           id="password_confirmation"
                           name="password_confirmation"
                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
            </div>
            <p class="mt-2 text-sm text-gray-500">Laissez vide pour conserver le mot de passe actuel</p>
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.users.show', $user) }}"
               class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
            </a>
            <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Mettre à jour l'utilisateur
            </button>
        </div>
    </form>
</div>
@endsection
