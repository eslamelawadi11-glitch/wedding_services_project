# Quick Start - Backend Authentication

## 🚀 Installation Steps

### 1. Install Laravel Sanctum
```bash
cd backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 2. Run Migrations
```bash
php artisan migrate
```

This creates:
- `users` table with all required fields
- `personal_access_tokens` table (for Sanctum)

### 3. Configure Environment
Add to `.env`:
```env
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000
```

### 4. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 5. Start Server
```bash
php artisan serve
```

## ✅ Verify Installation

### Test Login Endpoint
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Create Test User

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'user'
]);
```

## 🎯 Endpoints Ready

- ✅ `POST /api/auth/login` - Login
- ✅ `POST /api/auth/register` - Register
- ✅ `GET /api/auth/me` - Get user (protected)
- ✅ `POST /api/auth/logout` - Logout (protected)
- ✅ `PUT /api/auth/profile` - Update profile (protected)
- ✅ `POST /api/auth/change-password` - Change password (protected)

All endpoints are fully functional and tested!

