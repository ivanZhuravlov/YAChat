FROM node:8.1.4-alpine
MAINTAINER Falco Prescher

LABEL version="0.1"
LABEL description="Hosting a simple web socket and http server with express"

ENV "PROJECTDIR"="/app"

RUN mkdir $PROJECTDIR
RUN mkdir $PROJECTDIR/dao

WORKDIR $PROJECTDIR

COPY chat.js $PROJECTDIR
COPY app.js $PROJECTDIR
COPY mail.js $PROJECTDIR
COPY server.js $PROJECTDIR
COPY config.js $PROJECTDIR
COPY dao/chatprotocol.js $PROJECTDIR/dao
COPY package.json $PROJECTDIR

RUN ["npm", "install", "--only=prod"]

EXPOSE 81

ENTRYPOINT ["npm"]

CMD ["start"]
