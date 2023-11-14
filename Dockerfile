# Stage 1: Build the application
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and other dependency-related files
COPY package.json pnpm-lock.yaml* ./
COPY migrations ./migrations

# Install dependencies
RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /usr/src/app
# Copy the rest of your application's source code
COPY . .
COPY --from=base /usr/src/app/node_modules ./node_modules

# Build your application
RUN pnpm run build
# RUN pnpm prune --prod

# Verify if the build was successful - for debugging
# RUN ls -l /usr/src/app/dist

# Stage 2: Setup the runtime environment
FROM base as deploy

WORKDIR /usr/src/app

# Copy the built node modules and build artifacts from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "run", "start:prod"]
