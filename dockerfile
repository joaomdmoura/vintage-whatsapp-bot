FROM node:18

ENV LANG C.UTF-8
RUN apt update
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install chromium-browser

RUN mkdir /app
WORKDIR /app

COPY . .
RUN rm -rf dist
