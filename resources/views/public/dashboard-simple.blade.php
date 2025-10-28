<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Dashboard Public</h1>
    <p>Bonjour, {{ $user->prenom }} {{ $user->nom }}</p>
    <p>Email: {{ $user->email }}</p>
    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit">Déconnexion</button>
    </form>
</body>
</html>
