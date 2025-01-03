# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

# Install OpenSSL and other required libraries
RUN apk add --no-cache openssl bash

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

COPY prisma ./prisma/

# Set environment variables
ENV PORT=3000
ENV NODE_ENV="production"
ENV DATABASE_URL="file:/app/prisma/dev.db"


# Install dependencies
RUN npm ci

# Copy all source code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

# Install OpenSSL and other required libraries
RUN apk add --no-cache openssl bash

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Set environment variables
ENV PORT=3000
ENV NODE_ENV="development"
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npx", "next", "start"]