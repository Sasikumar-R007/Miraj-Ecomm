# Overview

Miraj Candles is a modern e-commerce platform built for selling premium handcrafted candles, kids stationery, religious products, and gifts. The platform consists of three main applications: a customer-facing frontend, an admin panel for product management, and a backend API server. The system is designed with a focus on modern UI/UX, featuring smooth animations, responsive design, and comprehensive product management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The platform uses a **multi-application React architecture** with TypeScript and Vite as the build tool. There are two separate React applications:

**Client Application (Customer-facing):**
- Built with React 18, TypeScript, and Tailwind CSS
- Uses React Router for client-side routing
- Implements Framer Motion for smooth animations and transitions
- Features responsive design with mobile-first approach
- Includes context-based state management for cart, wishlist, and authentication
- Runs on port 5000

**Admin Panel:**
- Separate React application for product and order management
- Same tech stack as client but focused on admin functionality
- Includes Firebase integration for authentication
- Features comprehensive CRUD operations for products and orders
- Runs on port 5001

## Backend Architecture
The backend follows a **Node.js Express server pattern**:
- Express.js server with CORS enabled for cross-origin requests
- RESTful API endpoints for products, orders, and users
- Mongoose ODM for MongoDB interaction
- Modular architecture with separate models for Product, Order, and User
- Runs on port 3000

## State Management Strategy
The client application uses **React Context API** for global state management:
- **AuthContext:** Handles user authentication and session management
- **CartContext:** Manages shopping cart items and calculations
- **WishlistContext:** Handles product wishlist functionality
- **LoadingContext:** Controls global loading states across the application

## Authentication System
The platform implements a **dual authentication approach**:
- **Customer Authentication:** Mock authentication system for development with role-based access
- **Admin Authentication:** Firebase Authentication integration for admin users
- Role-based routing protection for admin areas
- Session persistence using localStorage for development

## UI/UX Design System
The design follows a **modern minimalist approach**:
- Color scheme: white, gray, and black with orange accent colors
- Tailwind CSS for utility-first styling with custom theme extensions
- Heroicons for consistent iconography
- Custom animations using Framer Motion for micro-interactions
- Skeleton loaders for improved perceived performance
- Global loading states with shopping bag animations

## Data Models
The system uses **MongoDB with Mongoose** for data persistence:

**Product Model:**
- Core fields: name, title, description, price, category, stock
- Enhanced fields: originalPrice, discount, features, images
- Status tracking: new, sale, discounted, featured, bestseller, trending

**Order Model:**
- Customer information and shipping address
- Order items with product references and quantities
- Status tracking: pending, processing, shipped, delivered, cancelled
- Timestamps for order lifecycle management

**User Model:**
- Basic profile information and contact details
- Role-based access control (user/admin)
- Wishlist and order history references

## Error Handling and Development Strategy
The platform implements **graceful degradation** for development:
- Mock services when external dependencies are unavailable
- Fallback sample data for immediate development feedback
- Error boundaries and toast notifications for user feedback
- Development-friendly configuration with hot reloading

# External Dependencies

## Core Framework Dependencies
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server
- **Express.js** for the backend API server
- **MongoDB with Mongoose** for database operations

## UI and Animation Libraries
- **Tailwind CSS** for utility-first styling and responsive design
- **Framer Motion** for smooth animations and page transitions
- **Heroicons** for consistent icon system
- **React Hot Toast** for user notification system

## Authentication and Storage
- **Firebase** for admin authentication and potential cloud storage
- **Local Storage** for session persistence in development
- **Mock Authentication** system for development and testing

## Development and Build Tools
- **TypeScript** for type safety and better developer experience
- **ESLint** for code quality and consistency
- **PostCSS and Autoprefixer** for CSS processing
- **Concurrently** for running multiple development servers

## Hosting and Deployment
- **Replit** development environment with custom port configuration
- **CORS** middleware for cross-origin resource sharing
- **Environment variable** support for configuration management