# Laravel Backend API

This is the Laravel backend for the Wedding Services Platform.

## Setup Instructions

1. Install Composer dependencies:
```bash
composer install
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure your database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wedding_services
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed the database (optional):
```bash
php artisan db:seed
```

7. Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user/vendor
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Services
- `GET /api/services` - List services (with filters)
- `GET /api/services/{id}` - Get service details
- `POST /api/services` - Create service (vendor only)
- `PUT /api/services/{id}` - Update service (vendor only)
- `DELETE /api/services/{id}` - Delete service (vendor only)
- `GET /api/services/featured` - Get featured services
- `GET /api/services/top-rated` - Get top rated services

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/{id}/status` - Update booking status

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/{id}` - Remove from wishlist

### Vendor
- `GET /api/vendor/stats` - Get vendor statistics
- `GET /api/vendor/bookings` - Get vendor bookings

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/vendors` - List all vendors
- `DELETE /api/admin/vendors/{id}` - Delete vendor
- `GET /api/admin/services` - List all services
- `PATCH /api/admin/services/{id}/status` - Update service status
- `GET /api/admin/bookings` - List all bookings

## Authentication

The API uses JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer {token}
```

