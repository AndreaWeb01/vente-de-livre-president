<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Panier;
use App\Models\Panierinviter;
use App\Models\User;

echo "--- Member Baskets ---\n";
foreach (Panier::all() as $item) {
    echo "User: {$item->user_id} | Type: {$item->achetable_type} | ID: {$item->achetable_id}\n";
}

echo "\n--- Guest Baskets ---\n";
foreach (Panierinviter::all() as $item) {
    echo "Type: {$item->achetable_type} | ID: {$item->achetable_id}\n";
}

$user = User::where('email', 'djuekouassicelestin@gmail.com')->first();
if ($user) {
    echo "\n--- Target User ({$user->id}) ---\n";
    $p = Panier::where('user_id', $user->id)->count();
    echo "Basket count: $p\n";
} else {
    echo "\nUser Djue not found\n";
}
