# Multi-stage Dockerfile for Vite React SPA
# Stage 1: Build production assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies (use npm ci if package-lock is present, otherwise fallback to install)
RUN npm install

# Copy application source code
COPY . .

# Build the production bundle into dist/
RUN npm run build

# Stage 2: Serve static bundle via Nginx
FROM nginx:alpine

# Copy custom Nginx configuration with SPA fallback and gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
