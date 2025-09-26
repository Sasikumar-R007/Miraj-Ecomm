# Miraj Candles E-commerce Platform

## Project Overview

This is a modern, full-stack e-commerce platform built for Miraj Candles. The project features a React TypeScript frontend, Node.js/Express backend, and a separate admin panel for product management.

**Last Updated**: September 26, 2025
**Status**: Successfully imported and configured for Replit environment

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Mongoose (MongoDB)
- **Admin Panel**: Separate React app with admin functionality
- **Database**: MongoDB (configured with fallback sample data for development)
- **Authentication**: Firebase Auth integration ready

### Project Structure
```
miraj-candles/
├── client/          # Main frontend React application (port 5000)
├── server/          # Backend Express API server (port 3000)
├── admin/           # Admin panel React application (port 8000)
├── package.json     # Root workspace configuration
└── README.md        # Original project documentation
```

## Development Configuration

### Workflows Configured
1. **Frontend Client**: Runs `cd client && npm run dev` on port 5000 (webview)
2. **Backend API**: Runs `cd server && npm run dev` on port 3000 (console)

### Key Configuration Changes for Replit
- Frontend configured with `host: '0.0.0.0'` and `allowedHosts: true` in vite.config.ts
- Backend configured to run on `localhost:3000` to avoid conflicts
- API proxy configured from frontend to backend at `/api` endpoint

## Deployment Configuration

- **Deployment Target**: Autoscale (suitable for stateless e-commerce)
- **Build Command**: `npm run build` (builds client application)
- **Run Command**: `node server/index.js` (serves both API and built frontend)

## Features

### Customer Features
- Product catalog with filtering and search
- Shopping cart and wishlist functionality
- User authentication (Firebase integration ready)
- Responsive design optimized for all devices
- Product categories and subcategories
- Best sellers and new arrivals sections

### Admin Features
- Separate admin panel for product management
- Order management system
- User management
- Dashboard with analytics

## Database Setup

The application is configured with MongoDB using Mongoose. For development:
- Uses fallback sample data when database is unavailable
- MongoDB URI: `mongodb://localhost:27017/miraj-candles` (configurable via env)
- Graceful degradation when database connection fails

## Environment Variables

The application supports the following environment variables:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (defaults to 3000)

## Development Status

✅ **Completed Setup Tasks**:
1. All dependencies installed for client, server, and admin
2. Frontend workflow configured and running on port 5000
3. Backend workflow configured and running on port 3000  
4. Both frontend and backend tested and working properly
5. Deployment configuration completed
6. Project successfully imported to Replit environment

## Notes

- The project includes extensive sample data for development testing
- Admin panel runs separately on port 8000 when needed
- Frontend successfully proxies API requests to backend
- All components are properly configured for the Replit environment
- Ready for production deployment through Replit's publish feature