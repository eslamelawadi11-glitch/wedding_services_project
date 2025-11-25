# Wedding Services Platform

A comprehensive web-based platform for finding, comparing, and booking wedding-related services.

## Features

- 🎯 Multi-role system (Visitor, User, Vendor, Admin)
- 🔐 JWT Authentication with email verification
- 🔍 Advanced search and filtering system
- 🗺️ Map integration (Mapbox)
- 📱 Fully responsive design
- 🌙 Dark/Light theme support
- 🌍 Multi-language support (Arabic/English) with RTL
- ⭐ Reviews and ratings system
- ❤️ Wishlist functionality
- 📅 Booking management system
- 🎨 Modern UI with TailwindCSS

## Tech Stack

### Frontend
- Vue.js 3
- Pinia (State Management)
- Vue Router
- TailwindCSS
- Vue-i18n (Internationalization)
- Mapbox GL JS
- Axios

### Backend
- Laravel (PHP)
- MySQL
- JWT Authentication

## Project Structure

```
wedding_services_project/
├── src/                    # Vue.js frontend
│   ├── assets/
│   ├── components/
│   ├── locales/           # Translation files
│   ├── router/
│   ├── stores/            # Pinia stores
│   └── views/
├── backend/               # Laravel backend
│   ├── app/
│   ├── database/
│   └── routes/
└── public/
```

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
VITE_MAPBOX_TOKEN=your-mapbox-token-here
```

3. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Composer dependencies:
```bash
composer install
```

3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wedding_services
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start Laravel server:
```bash
php artisan serve
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_MAPBOX_TOKEN` - Mapbox access token

### Backend (.env)
- Standard Laravel environment variables
- Database configuration
- JWT secret

## User Roles

### Visitor
- Browse services
- Use basic search
- View service details

### User (Customer)
- All visitor features
- Create account
- Send booking requests
- Rate & review services
- Add to wishlist
- Edit profile

### Vendor
- Create vendor account
- Add and manage services
- Upload images
- Manage availability
- View and respond to booking requests
- Edit vendor profile

### Admin
- Full system management
- Accept/reject services
- Manage users, vendors, bookings
- System analytics dashboard

## API Endpoints

See `backend/README.md` for complete API documentation.

## Development

### Running Frontend
```bash
npm run dev
```

### Running Backend
```bash
cd backend
php artisan serve
```

### Building for Production
```bash
npm run build
```

## License

This project is open source and available under the MIT License.
