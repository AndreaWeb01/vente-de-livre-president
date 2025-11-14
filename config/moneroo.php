<?php

return [
    'secretKey' => env('MONEROO_SECRET_KEY'),
    'currency' => env('MONEROO_CURRENCY', 'XOF'),
    'default_country' => env('MONEROO_CUSTOMER_COUNTRY', 'CI'),
    'default_methods' => array_values(array_filter(array_map('trim', explode(',', env('MONEROO_PAYMENT_METHODS', 'orange_ci,mtn_ci,moov_ci,card'))))),
    'return_url' => env('MONEROO_RETURN_URL'),
    'callback_url' => env('MONEROO_CALLBACK_URL'),
    'restrict_country_code' => env('MONEROO_RESTRICT_COUNTRY_CODE'),
    'restrict_customer_phone' => env('MONEROO_RESTRICT_CUSTOMER_PHONE', false),
    'devMode' => env('MONEROO_DEV_MODE', false),
    'devBaseUrl' => env('MONEROO_DEV_BASE_URL'),
    'verify_ssl' => env('MONEROO_VERIFY_SSL', true),
];
