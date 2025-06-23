# Cuisine Vital' - Meal Delivery Management System

A comprehensive meal delivery management system built with NestJS (backend) and React (frontend), designed for managing restaurant operations, orders, menus, and client relationships.

## Features

### Admin Dashboard
- Real-time statistics and analytics
- Order management and tracking
- Menu and inventory management
- Client management (individuals and businesses)
- Production planning and kitchen workflow
- Delivery tracking and logistics

### Client Portal
- Browse available menus
- Place orders with subscription management
- Order history and tracking
- Business subscription features (GOLD/SILVER plans)

### Key Functionalities
- **Order Management**: Individual and business orders with different workflows
- **Menu Management**: Dynamic menu creation with pricing and availability
- **Client Management**: Support for both individual customers and business subscriptions
- **Production Planning**: Kitchen workflow optimization and ingredient tracking
- **Delivery Management**: Route optimization and real-time tracking
- **Financial Management**: Automated invoicing and payment tracking
- **Loyalty Program**: Customer loyalty tracking and rewards

## Technology Stack

### Backend
- **NestJS**: Node.js framework for building scalable server-side applications
- **TypeORM**: Object-relational mapping for PostgreSQL
- **PostgreSQL**: Primary database with PostGIS for location features
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing
- **Lucide React**: Modern icon library

## Database Schema

The system uses a comprehensive PostgreSQL database with the following key entities:
- Users and roles management
- Client management (individuals and businesses)
- Menu and ingredient management
- Order processing (individual and business orders)
- Production planning and inventory
- Delivery and logistics
- Financial management (invoicing and payments)
- Loyalty and subscription management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cuisine-vital-system
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Database Setup**
   - Create a PostgreSQL database named `cuisine-db`
   - Run the SQL script from `db/base-v8.sql` to set up the schema
   - Update database credentials in `backend/src/app.module.ts`

4. **Environment Configuration**
   - Backend runs on port 3001
   - Frontend runs on port 5173
   - Update CORS settings if needed

5. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the backend and frontend concurrently.

### Default Access
- Admin login: Use credentials from your database setup
- Client portal: Available at `/client-portal`

## Project Structure

```
cuisine-vital-system/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── entities/       # Database entities
│   │   ├── dashboard/      # Dashboard statistics
│   │   ├── users/          # User management
│   │   ├── clients/        # Client management
│   │   ├── menus/          # Menu management
│   │   └── orders/         # Order management
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
└── db/                     # Database schema and scripts
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Dashboard
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/recent-orders` - Recent orders

### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `PUT /orders/:id/status` - Update order status

### Menus
- `GET /menus` - List all menus
- `GET /menus/available` - List available menus
- `POST /menus` - Create new menu

### Clients
- `GET /clients` - List all clients
- `POST /clients` - Create new client
- `PUT /clients/:id` - Update client

## Business Rules

### Subscription Plans
- **SILVER**: 5 menus available, €12.50/day per person
- **GOLD**: 15 menus available, €18.00/day per person, includes drinks and desserts

### Order Types
- **Individual Orders**: One-time orders from individual customers
- **Business Orders**: Recurring orders from subscribed businesses

### Production Planning
- Automatic ingredient calculation based on recipes
- Stock management with expiration tracking
- Production scheduling and kitchen workflow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Cuisine Vital' meal delivery service.