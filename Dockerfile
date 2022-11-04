FROM node:lts-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 4000
ENTRYPOINT ["npm", "start"]
