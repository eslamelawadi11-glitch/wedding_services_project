# Setup Guide

## Prerequisites

- Node.js (v20.19.0 or >=22.12.0)
- PHP 8.1 or higher
- Composer
- MySQL
- Mapbox account (for map features)

## Step-by-Step Setup

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file in root directory
cp .env.example .env

# Edit .env and add your configuration:
# VITE_API_URL=http://localhost:8000/api
# VITE_MAPBOX_TOKEN=your-mapbox-token-here

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Composer dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Edit .env file with your database credentials:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=wedding_services
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Also add JWT secret:
# JWT_SECRET=your-secret-key
# Run: php artisan jwt:secret

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

Backend will run on `http://localhost:8000`

### 3. Mapbox Setup

1. Create an account at https://www.mapbox.com
2. Get your access token from the account dashboard
3. Add it to your frontend `.env` file as `VITE_MAPBOX_TOKEN`

### 4. Create Admin User

You can create an admin user manually in the database:

```sql
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES ('Admin', 'admin@example.com', '$2y$10$...', 'admin', NOW(), NOW());
```

Or use Laravel Tinker:

```bash
php artisan tinker
```

```php
$user = new App\Models\User();
$user->name = 'Admin';
$user->email = 'admin@example.com';
$user->password = Hash::make('password');
$user->role = 'admin';
$user->save();
```

## Testing the Application

1. Start both frontend and backend servers
2. Visit `http://localhost:5173`
3. Register as a user or vendor
4. Login and explore the features

## Common Issues

### CORS Errors
If you encounter CORS errors, make sure:
- Backend is running on port 8000
- Frontend proxy is configured correctly in `vite.config.js`
- Laravel CORS middleware is properly configured

### Database Connection
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### JWT Authentication
- Run `php artisan jwt:secret` to generate JWT secret
- Clear config cache: `php artisan config:clear`

## Production Build

```bash
# Build frontend
npm run build

# The built files will be in the `dist` directory
# You can serve them with any static file server or integrate with Laravel
```

## Next Steps

- Configure email settings for password reset
- Set up file storage for service images
- Configure production database
- Set up SSL certificates
- Configure environment-specific settings

