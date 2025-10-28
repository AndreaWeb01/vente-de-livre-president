<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Validation\Rule;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'prenom' => ['required', 'string', 'max:255'],
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'prenom' => $input['prenom'],
            'nom' => $input['nom'],
            'email' => $input['email'],
            'telephone' => $input['telephone'],
            'password' => Hash::make($input['password']),
        ]);

        // Assigner le rôle utilisateur par défaut
        $user->assignRole('user');

        return $user;
    }
}
