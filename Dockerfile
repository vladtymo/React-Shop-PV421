# Use Node 22 to build the Vite React app, then serve with nginx (multi-stage)
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies (copy lockfile if present for reproducible installs)
COPY package.json ./
RUN npm install

# Copy source and build
COPY . .

# EXPOSE 3000
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]