<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Commande;
use App\Models\Commandeinviter;

echo "--- Latest Member Command ---\n";
$c1 = Commande::latest()->first();
if ($c1) {
    echo "ID: {$c1->id} | Ref: {$c1->reference} | Nom: {$c1->nom} | Total: {$c1->total} | Created: {$c1->created_at}\n";
} else {
    echo "No member commands found\n";
}

echo "\n--- Latest Guest Command ---\n";
$c2 = Commandeinviter::latest()->first();
if ($c2) {
    echo "ID: {$c2->id} | Ref: {$c2->reference} | Nom: {$c2->nom} | Total: {$c2->total} | Created: {$c2->created_at}\n";
} else {
    echo "No guest commands found\n";
}

echo "\nCounts: Members(" . Commande::count() . ") | Guests(" . Commandeinviter::count() . ")\n";
