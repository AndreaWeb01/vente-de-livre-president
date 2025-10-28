<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string'], // peut être email ou téléphone
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Valider les identifiants et récupérer l'utilisateur
     */
    public function validateCredentials(): User
    {
        $this->ensureIsNotRateLimited();

        $login = $this->input('email');
        $password = $this->input('password');

        // Déterminer si c'est un email ou un numéro
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'telephone';

        /** @var User|null $user */
        $user = Auth::getProvider()->retrieveByCredentials([
            $fieldType => $login,
            'password' => $password,
        ]);

        if (! $user || ! Auth::getProvider()->validateCredentials($user, ['password' => $password])) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());

        return $user;
    }

    /**
     * Vérifier la limite de tentatives
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Générer une clé unique de tentative
     */
    public function throttleKey(): string
    {
        return $this->string('email')
            ->lower()
            ->append('|'.$this->ip())
            ->transliterate()
            ->value();
    }
}
