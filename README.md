# Zipdrop

Zipdrop is a comprehensive, smart address utility designed to eliminate the common frustrations associated with finding and verifying mailable destinations.

## Features

-   **Address Verification**: Input any street address or landmark to receive the official, validated postal code and full corrected address.
-   **Postal Formatting**: Provides precise postal formatting standards required for specific countries or regions to ensure error-free international correspondence.
-   **Geolocation**: Converts your current physical coordinates into a certified mailable address on the fly.
-   **Smart Address Book**: Securely save verified addresses for instant access and reuse.
-   **User Authentication**: Secure sign-up and login functionality.
-   **Dashboard**: Manage your profile, settings, and saved addresses.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database**: [Neon](https://neon.tech/) (Serverless Postgres) with [Drizzle ORM](https://orm.drizzle.team/)
-   **Authentication**: [Better Auth](https://better-auth.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)
-   **Animations**: [Motion](https://motion.dev/) (Framer Motion)

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/zipdrop.git
    cd zipdrop
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=your_neon_database_url
    BETTER_AUTH_SECRET=your_better_auth_secret
    BETTER_AUTH_URL=http://localhost:3000 # or your production URL
    ```

4.  Run database migrations (if applicable):
    ```bash
    npx drizzle-kit push
    ```

5.  Start the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## License

[MIT](LICENSE)
