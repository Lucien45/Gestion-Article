#on render or vercel
FROM node:23-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_BUCKET

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_BUCKET=$VITE_SUPABASE_BUCKET

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

#on vps
# FROM nginx:1.27-alpine

# COPY dist/ /usr/share/nginx/html
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
