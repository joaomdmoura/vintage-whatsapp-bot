FROM node:18

ENV LANG C.UTF-8
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install chromium -y
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libnss3 lsb-release xdg-utils
RUN apt-get install tesseract-ocr -y
RUN apt-get install tesseract-ocr-por -y

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY . .
RUN npm run build
CMD ["node", "dist/bot/grpc/client.js"]
# CMD [ "npm", "run", "start" ]