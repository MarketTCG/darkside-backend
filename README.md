# Darkside Backend

<p align="center">
  A modern, scalable e-commerce backend built with <a href="https://nestjs.com/" target="_blank">NestJS</a> and <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>.
</p>

## Description

Darkside is a full-featured e-commerce and marketplace platform backend. It provides comprehensive APIs for managing products, catalogues, orders, user authentication with OAuth support, vendor management, and integrated payment processing via Stripe.

### Key Features

- **Authentication & Authorization**: JWT-based authentication with Google OAuth2 support
- **Product Management**: Full product catalogue with listings and pricing
- **Order Management**: Complete order lifecycle tracking
- **Payment Processing**: Stripe integration for secure checkout and payments
- **Vendor Management**: Multi-vendor support with dedicated vendor APIs
- **User Management**: User profiles, roles, and permissions
- **API Documentation**: Swagger/OpenAPI documentation
- **Scalable Architecture**: Modular NestJS structure with MongoDB persistence

## Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- npm or yarn package manager
- Stripe API keys (for payment processing)
- Google OAuth credentials (for authentication)

## Installation

```bash
$ npm install
```

## Environment Setup

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# watch mode
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code Quality

```bash
# format code
$ npm run format

# lint code
$ npm run lint
```

## Project Structure

- **auth/**: Authentication and authorization (JWT, Google OAuth)
- **catalogue/**: Product catalogues and categories
- **listing/**: Product listings with pricing and inventory
- **product/**: Product management and details
- **order/**: Order processing and tracking
- **checkout/**: Checkout session management
- **stripe/**: Payment processing integration
- **user/**: User profiles and management
- **vendor/**: Vendor management and operations
- **utils/**: Utility services and helpers

## API Documentation

Once the application is running, access the API documentation at:

```
http://localhost:3000/api
```

## License

UNLICENSED
