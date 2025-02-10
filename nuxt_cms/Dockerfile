# Dùng Node 18 (tương thích tốt hơn)
FROM node:20 AS builder

WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache
COPY package.json package-lock.json ./

# Cài đặt dependencies (chỉ cần cho production)
RUN npm install --production

# Copy toàn bộ mã nguồn
COPY . .

# Build Nuxt 3 cho production
RUN npm install --save-dev sass-embedded
RUN npm run build

# Giai đoạn chạy production
FROM node:20 AS production

WORKDIR /app

# Copy file build từ builder
COPY --from=builder /app/.output .output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose cổng 3000
EXPOSE 3000

# Chạy Nuxt ở chế độ production
CMD ["node", ".output/server/index.mjs"]
