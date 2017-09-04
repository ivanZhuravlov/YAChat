FROM node:8.1.4-alpine
MAINTAINER Falco Prescher

LABEL version="0.1"
LABEL description="Hosting a simple web client with express"

# RUN addgroup -S app && adduser -S -g app app

ENV "PROJECTDIR"="/app"

RUN mkdir $PROJECTDIR
# RUN chown -R app:app $PROJECTDIR

# USER app

COPY aot $PROJECTDIR/aot
COPY src $PROJECTDIR/src
COPY server.js $PROJECTDIR
COPY package.json $PROJECTDIR
COPY webpack.config.js $PROJECTDIR
COPY tsconfig.json $PROJECTDIR

WORKDIR $PROJECTDIR

RUN ["mkdir", "wwwroot"]
COPY wwwroot/index.html $PROJECTDIR/wwwroot
COPY wwwroot/index.css $PROJECTDIR/wwwroot

RUN ["npm", "install"]
RUN ["npm", "run", "build"]
# RUN ["npm", "install", "--only=prod"]

EXPOSE 80

ENTRYPOINT ["npm"]

CMD ["run", "serve"]
