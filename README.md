# Next.js App with Prisma and SQLite

This project is a Next.js application using Prisma as the ORM and SQLite as the database. It provides a modern web development setup with server-side rendering, static site generation, and a powerful ORM for database management.

## Features

- **Next.js**: A React framework for server-side rendering, static site generation, and client-side rendering.
- **Prisma**: A next-generation ORM for database modeling and querying.
- **SQLite**: A lightweight, serverless database for development and testing.
- **TypeScript**: A statically typed programming language for improved code quality.
- **Authentication**: Includes register and login functionality in the `auth` folder.
- **Authorization**: The `dashboard` folder is accessible only for authenticated users.
- **Middleware**: The `middleware.ts` file checks the token from cookies for authentication.
- **Rendering Techniques**: Routes under the `dashboard` folder demonstrate CSR, SSR, ISR, and SSG rendering techniques.
- **JWT Authentication**: Uses `jose` for JWT token management.
- **Server Actions**: The `action` folder contains server actions to handle form submissions, like creating posts.
- **UI Components**: Styled with Tailwind CSS and ShadCN UI components.
- **API Routes**: The `api` folder contains route handlers for API endpoints.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 18.x)
- npm or Yarn
- SQLite (pre-installed with most operating systems)

---

### Installation

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or with Yarn:

   ```bash
   yarn install
   ```

---

### Setup Prisma

1. Generate your Prisma client:

   ```bash
   npx prisma generate
   ```

2. Migrate your database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

   This will apply the initial database schema to your SQLite database.

---

### Development

To run the development server:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Project Structure

- `/app`: Next.js routes and API endpoints.
- `/prisma`: Prisma schema (`schema.prisma`) and migration files.
- `/components`: React components used in the app.
- `/auth`: Contains register and login functionality.
- `/dashboard`: Accessible only to authenticated users and includes routes demonstrating Lazy Loading, CSR, SSR, ISR, and SSG.
- `/action`: Server actions for handling form submissions, like creating posts.
- `/api`: Contains route handlers for API endpoints.
- `/sentry-example-page`: To send an error on Sentry.
- `middleware.ts`: Contains logic to check JWT tokens from cookies for authentication.

---

## Prisma Configuration

This project uses SQLite as the database. The Prisma schema (`prisma/schema.prisma`) defines the data models.

Example schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

### Prisma Commands

- **Generate Prisma Client**:

  ```bash
  npx prisma generate
  ```

- **Run Migrations**:

  ```bash
  npx prisma migrate dev --name <migration-name>
  ```

- **Open Prisma Studio** (GUI to interact with the database):
  ```bash
  npx prisma studio
  ```

---

### Deployment

1. **Build the app**:

   ```bash
   npm run build
   ```

   Or with Yarn:

   ```bash
   yarn build
   ```

2. **Start the app**:

   ```bash
   npm start
   ```

   Or with Yarn:

   ```bash
   yarn start
   ```

---

### Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
NODE_ENV="development"

NEXT_PUBLIC_APP_NAME="Blog App"

SENTRY_AUTH_TOKEN=

DATABASE_URL="file:./dev.db"
```

Make sure to replace the database URL with your configuration if you are not using SQLite.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributing

Contributions are welcome! Feel free to open issues or create pull requests.
