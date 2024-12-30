# Stage 1: Cài đặt dependencies và chạy ở chế độ phát triển
FROM node:20 AS development


# Cài đặt pnpm
# RUN npm install
# RUN npm install -g pnpm

WORKDIR /app

# COPY package.json pnpm-lock.yaml ./
COPY package.json package-lock.json ./

RUN npm install
# RUN pnpm install


COPY . .

# Expose port 5173 for Vite in development mode
EXPOSE 8080

# Chế độ phát triển: chạy Dev Server với hot-reload
CMD ["npm", "run", "dev"]
# CMD ["pnpm", "run", "dev"]

# Stage 2: Build và phục vụ ứng dụng ở chế độ production
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build ứng dụng cho production
RUN npm run build

# Stage 3: Chạy ứng dụng Vue đã build qua Nginx
FROM nginx:alpine AS production

# Copy các file đã build vào Nginx để phục vụ trên web server
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 cho Nginx
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
