# Backend Authentication Setup Guide

## 🚀 Quick Setup

### Step 1: Install Laravel Sanctum
```bash
cd backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Step 2: Run Migrations
```bash
php artisan migrate
```

This will:
- Create the users table
- Add phone, role, and avatar fields
- Create personal_access_tokens table (for Sanctum)

### Step 3: Configure Environment
Add to your `.env` file:
```env
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000
```

### Step 4: Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Step 5: Start Server
```bash
php artisan serve
```

The API will be available at: `http://localhost:8000/api`

## 🧪 Test the Login Endpoint

### Using cURL:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Using Postman:
1. Method: **POST**
2. URL: `http://localhost:8000/api/auth/login`
3. Headers:
   - `Content-Type: application/json`
   - `Accept: application/json`
4. Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

## 📝 Create a Test User

You can create a test user via Tinker:
```bash
php artisan tinker
```

Then run:
```php
$user = \App\Models\User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'user'
]);
```

## ✅ Verification

After setup, test these endpoints:

1. **Register:** `POST /api/auth/register`
2. **Login:** `POST /api/auth/login`
3. **Get User:** `GET /api/auth/me` (with Bearer token)
4. **Logout:** `POST /api/auth/logout` (with Bearer token)

All endpoints should return proper JSON responses with appropriate status codes.

