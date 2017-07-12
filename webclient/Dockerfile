FROM node:8.1.4-alpine
MAINTAINER Falco Prescher

LABEL version="0.1"
LABEL description="Hosting a simple web client with express"

# RUN addgroup -S app && adduser -S -g app app

ENV "PROJECTDIR"="/app"

RUN mkdir $PROJECTDIR
# RUN chown -R app:app $PROJECTDIR

# USER app

COPY src $PROJECTDIR/src
COPY styles $PROJECTDIR/styles
COPY index.js $PROJECTDIR
COPY index.html $PROJECTDIR
COPY package.json $PROJECTDIR

WORKDIR $PROJECTDIR

RUN ["npm", "install"]

EXPOSE 80

ENTRYPOINT ["npm"]

CMD ["start"]
