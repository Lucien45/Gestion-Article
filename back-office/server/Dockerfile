# on render or vercel
FROM node:23-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine3.21

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]


# on vps
# FROM node:23-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install


# WORKDIR /app

# COPY dist/ ./dist/

# EXPOSE 3000

# CMD ["node", "dist/main"]
