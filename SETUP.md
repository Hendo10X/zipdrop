# Zipdrop - Setup Guide

This guide will help you set up and run the Zipdrop application.

## Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- A Neon database account (or any PostgreSQL database)
- Google Maps API key

## Step 1: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Step 2: Set Up Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Update the `.env.local` file with your actual values:

```env
# Database - Get this from your Neon dashboard
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Better Auth - Generate a random secret (e.g., using openssl rand -hex 32)
BETTER_AUTH_SECRET=your_random_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Google Maps API - Get this from Google Cloud Console
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Getting a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Geocoding API
   - Places API (optional, for autocomplete)
4. Go to "Credentials" and create an API key
5. Copy the API key to your `.env.local` file

### Setting Up Neon Database

1. Sign up at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into the `DATABASE_URL` in your `.env.local` file

## Step 3: Run Database Migrations

Push the database schema to your database:

```bash
npx drizzle-kit push
```

This will create all the necessary tables:
- `user` - User accounts
- `session` - User sessions
- `account` - Authentication accounts
- `verification` - Email verification tokens
- `saved_address` - Saved addresses
- `activity_log` - Activity history

## Step 4: Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Overview

### 1. Address Verification
- Navigate to `/verify` or click "Get Started"
- Enter any street address or landmark
- Get validated postal code and formatted address
- View country-specific postal formatting standards

### 2. Geolocation
- Click "Use My Location" on the verify page
- Browser will request location permission
- Automatically converts coordinates to a mailable address

### 3. Smart Address Book
- Sign up or log in to save addresses
- Verified addresses can be saved with custom labels
- Access saved addresses from the dashboard
- Edit labels or delete addresses as needed

### 4. User Dashboard
- Overview: See statistics and recent activity
- Saved: Manage your saved addresses
- Activity: View your activity history
- Profile: View your account information
- Settings: Manage preferences and account settings

## API Routes

The application includes the following API routes:

### Authentication
- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-in` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### Addresses
- `POST /api/addresses/verify` - Verify an address
- `POST /api/addresses/geolocation` - Convert coordinates to address
- `GET /api/addresses/saved` - Get all saved addresses
- `POST /api/addresses/saved` - Save a new address
- `PATCH /api/addresses/saved/:id` - Update address label
- `DELETE /api/addresses/saved/:id` - Delete a saved address

### Activity
- `GET /api/activity` - Get user activity log

## Database Schema

### saved_address
- `id` - Unique identifier
- `userId` - Reference to user
- `label` - Optional custom label (e.g., "Home", "Work")
- `street` - Street address
- `city` - City name
- `state` - State/province (optional)
- `postalCode` - Postal/ZIP code
- `country` - Country name
- `formattedAddress` - Full formatted address
- `latitude` - Latitude coordinate (optional)
- `longitude` - Longitude coordinate (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### activity_log
- `id` - Unique identifier
- `userId` - Reference to user
- `action` - Action type (e.g., "address_saved", "address_deleted")
- `details` - Human-readable description
- `metadata` - Additional JSON data
- `createdAt` - Timestamp

## Troubleshooting

### Database Connection Issues
- Ensure your `DATABASE_URL` is correct
- Check that your database is accessible
- Verify SSL mode is set correctly for Neon

### Google Maps API Errors
- Verify your API key is correct
- Ensure Geocoding API is enabled in Google Cloud Console
- Check that your API key has no restrictions preventing localhost access
- Monitor your API usage to ensure you haven't exceeded quotas

### Build Errors
- Delete `node_modules` and `.next` directories
- Run `npm install` again
- Clear your browser cache

## Production Deployment

1. Set up environment variables on your hosting platform
2. Update `BETTER_AUTH_URL` to your production domain
3. Run `npm run build` to create a production build
4. Deploy using your preferred hosting service (Vercel, Netlify, etc.)

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Open an issue on GitHub

## License

MIT
