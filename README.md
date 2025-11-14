# vente-de-livre-president

## Paiement Moneroo Standard

Le site utilise l’API Moneroo Standard via le package `moneroo/moneroo-laravel` pour initier les règlements des commandes.  
Le flux côté serveur est le suivant :

1. `PaymentController::initPayment` construit la charge utile (montant, client, métadonnées, restrictions) à partir de la commande et appelle `POST /v1/payments/initialize`.
2. L’utilisateur est redirigé vers l’URL `checkout_url` retournée par Moneroo.
3. Après le paiement, Moneroo renvoie l’utilisateur vers `payment.callback` avec `monerooPaymentId`/`monerooPaymentStatus`.  
   Le contrôleur vérifie ensuite la transaction via l’API avant de marquer la commande comme payée.

### Variables d'environnement utiles

```env
MONEROO_SECRET_KEY=sk_test_xxx
MONEROO_CURRENCY=XOF
MONEROO_RETURN_URL="${APP_URL}/payment/callback"
MONEROO_CALLBACK_URL="${APP_URL}/payment/callback"
MONEROO_PAYMENT_METHODS=orange_ci,mtn_ci,moov_ci,card
MONEROO_CUSTOMER_COUNTRY=CI
MONEROO_RESTRICT_COUNTRY_CODE=CI
MONEROO_RESTRICT_CUSTOMER_PHONE=false
MONEROO_VERIFY_SSL=false
```

> Activez `MONEROO_RESTRICT_CUSTOMER_PHONE=true` pour limiter un paiement au numéro de téléphone saisi sur la commande (sinon `MONEROO_RESTRICT_COUNTRY_CODE` sera utilisé).

> **Note pour Windows en développement local** : Si vous rencontrez l'erreur "SSL certificate problem: unable to get local issuer certificate", définissez `MONEROO_VERIFY_SSL=false` dans votre `.env`. L'application téléchargera automatiquement le certificat CA bundle depuis curl.se et le configurera. En production, laissez cette option à `true` (par défaut).
