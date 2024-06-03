FROM alpine:3

RUN apk update
RUN apk add nodejs npm

RUN mkdir -p /home/local/darksidetcg-backend
WORKDIR /home/local/darksidetcg-backend

COPY package.json package.json
RUN npm install

COPY . .

ENTRYPOINT npm run start:dev

# docker build -t maylife/darksidetcg-backend:v0.1 .
# docker push maylife/darksidetcg-backend:v0.1