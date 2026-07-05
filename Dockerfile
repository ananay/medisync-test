FROM node:20-bullseye

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build || echo "build skipped"

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "dev"]
