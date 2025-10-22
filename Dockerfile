FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies and build
COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . ./
RUN npm run build --silent

FROM node:20-alpine

WORKDIR /usr/src/app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --silent

# Copy built artifacts
COPY --from=builder /usr/src/app/dist/meditation-ai-land-page ./dist/meditation-ai-land-page

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "dist/meditation-ai-land-page/server/server.mjs"]
