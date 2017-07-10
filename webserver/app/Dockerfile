FROM node:7.9.0-alpine
MAINTAINER Falco Prescher

LABEL version="0.1"
LABEL description="Hosting a simple web socker and http server with express"

ENV "PROJECTDIR"="/app"

RUN mkdir $PROJECTDIR

WORKDIR $PROJECTDIR

COPY index.js $PROJECTDIR
COPY package.json $PROJECTDIR

RUN ["npm", "install", "--only=prod"]

EXPOSE 81

ENTRYPOINT ["npm"]

CMD ["start"]
