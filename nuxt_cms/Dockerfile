FROM node:20 AS production

WORKDIR /app

# Copy file package.json và lock file trước để tối ưu cache
COPY package.json package-lock.json ./

# Cài đặt dependencies (chỉ cho production)
RUN npm install --omit=dev

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng
RUN npm install --save-dev sass-embedded
RUN npm run build

# Expose cổng 80 cho Nuxt
EXPOSE 3000

# Chạy Nuxt ở chế độ production
CMD ["node", ".output/server/index.mjs"]
