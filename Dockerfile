FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT 5000
ENV PG_HOST db
ENV PG_PORT 5432
ENV PG_USERNAME postgres
ENV PG_PASSWORD Selin2002
ENV PG_DB stfaki

EXPOSE $PORT

CMD [ "npm", "run", "start" ]