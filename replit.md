# Miraj Candles E-commerce Platform

## Overview
A modern e-commerce platform for Miraj Candles built with React, TypeScript, Tailwind CSS, and Express.js. The platform includes a customer-facing frontend, backend API, and admin panel for managing products and orders.

## Recent Changes (September 25, 2025)
- Successfully imported from GitHub repository
- Configured all components for Replit environment
- Fixed Vite configuration issues for proper host handling
- Installed all dependencies and set up workflows
- Configured deployment settings for production
- Both frontend and backend are working correctly with API integration

## Project Architecture

### Client (Frontend)
- **Technology**: React + TypeScript + Vite
- **Port**: 5000 (configured for Replit proxy)
- **Features**: Product catalog, shopping cart, user authentication, responsive design
- **Configuration**: Properly configured to allow all hosts for Replit environment

### Server (Backend)
- **Technology**: Node.js + Express
- **Port**: 3000
- **Features**: RESTful API, MongoDB integration, sample data fallback
- **Database**: MongoDB (with graceful fallback to sample data)

### Admin Panel
- **Technology**: React + TypeScript + Vite
- **Port**: 5001 (separate application)
- **Features**: Product management, order management, admin authentication

## Current State
- ✅ All dependencies installed successfully
- ✅ Frontend running on port 5000 with proper host configuration
- ✅ Backend API running on port 3000 serving sample data
- ✅ API integration working (frontend successfully calls backend)
- ✅ Deployment configuration set up for production
- ✅ Graceful fallback to sample data when database unavailable

## User Preferences
- Project follows existing code structure and conventions
- Uses sample data for demonstration when database not connected
- Maintains separation between client, server, and admin components

## Deployment Notes
- Configured for autoscale deployment
- Build process compiles client assets
- Server serves both API endpoints and static frontend files
- Ready for production deployment on Replit