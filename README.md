# YAChat

Yet another chat but with Node.js, Redis, MongoDB and Docker

## Quick Start
1. Run ./run.ps1

## Get Started

1. Start for building and setup docker-compose up -d
2. Scale and start the socket.io servers docker-compose scale app=4
3. Stop again since we want to start all services at once docker-compose stop
4. Start all services at once and attach to stdout docker-compose up