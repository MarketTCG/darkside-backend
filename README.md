# Darkside Backend

> **NOTE: This project is uncompleted and is provided here for demonstration purposes only.**

A scalable e-commerce backend built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/).

## Features

- **Auth**: JWT & Google OAuth2
- **Commerce**: Products, Catalogues, Orders, & Stripe Payments
- **Users**: Multi-vendor support, User profiles & roles

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Stripe & Google OAuth credentials

### Setup

```bash
# Install dependencies
$ npm install

# Environment variables (create .env)
DATABASE_URL=...
JWT_SECRET=...
STRIPE_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Run development
$ npm run start:dev

# Run tests
$ npm run test
```

## Documentation

API documentation is available at `http://localhost:3000/api` when the server is running.
