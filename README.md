# Test Task

Responsive web application for displaying casino brand rankings with geolocation support. Built with Laravel backend and vanilla JavaScript frontend.

## Features

- RESTful API with CRUD operations
- Automatic country detection via Cloudflare headers
- Mobile-responsive design with desktop ranking view
- Docker containerization for easy deployment

## Quick Start

### With Docker (Recommended)

```bash
git clone https://github.com/Extervin/test-task.git
cd test-task
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/v1/brands

### Local Development

```bash
# Backend
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Frontend
# Open frontend/index.html in browser
```

## API Endpoints

```
GET    /api/v1/brands              # Get brands (with geolocation)
POST   /api/v1/brands              # Create brand
GET    /api/v1/brands/{id}         # Get specific brand
PUT    /api/v1/brands/{id}         # Update brand
DELETE /api/v1/brands/{id}         # Delete brand
GET    /api/v1/brands/country/{code} # Get brands by country
```

### Example Request

```bash
curl -X POST http://localhost:8000/api/v1/brands \
-H "Content-Type: application/json" \
-d '{
  "brand_name": "Test Casino",
  "brand_image": "https://example.com/logo.png",
  "rating": 5,
  "country_code": "us"
}'
```

## Tech Stack

**Backend:**
- PHP 8.2+ with Laravel 12
- SQLite database
- Laravel built-in server

**Frontend:**
- Vanilla JavaScript
- CSS Grid/Flexbox
- Font Awesome icons

**DevOps:**
- Docker containerization
- Nginx for frontend static files

## Testing

Frontend includes testing functions accessible via browser console:

```javascript
testCountry("bg")      
testCountry("us")     
testCountry("default") 
```

## Project Structure

```
├── backend/           # Laravel API
├── frontend/          # Static frontend files
├── docker/            # Docker configuration
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Development Notes

- The application uses test data with placeholder images
- Geolocation works via CF-IPCountry header (Cloudflare)
- Fallback to default brands when country not found
- Mobile-first responsive design

---

*This project was created as a technical demonstration.*
