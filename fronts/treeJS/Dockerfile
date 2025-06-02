FROM node:22 AS builder

COPY . .
RUN npm install
RUN npm run build:prod


FROM nginx:alpine
COPY --from=builder /public /usr/share/nginx/html
COPY --from=builder /dist /usr/share/nginx/html
EXPOSE 80
