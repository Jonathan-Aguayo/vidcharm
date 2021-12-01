FROM node:17.0.1 AS deps
WORKDIR /vidCharm
COPY ./package.json ./
COPY ./prisma ./prisma/
COPY ./yarn.lock ./
RUN npm install

FROM node:17.0.1 AS builder
WORKDIR /vidCharm
COPY . .
COPY --from=deps /vidCharm/node_modules ./node_modules
RUN npm run build

FROM node:17.0.1 AS runner
WORKDIR /vidCharm
ENV NODE_ENV production
COPY --from=builder /vidCharm/public ./public
COPY --from=builder /vidCharm/.next ./.next
COPY --from=builder /vidCharm/node_modules ./node_modules
COPY --from=builder /vidCharm/package.json ./package.json
COPY --from=builder /vidCharm/next.config.js ./

EXPOSE 3000

CMD [ "npm", "run", "start" ]
