FROM node:18.15.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

RUN apk add --no-cache bash

ENTRYPOINT ["sh", "-c"]
CMD ["${CONTAINER_COMMAND:-npm run dev}"]