FROM node:23-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage de production
FROM node:23-alpine3.21 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/media ./media 
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
