FROM node:8
RUN mkdir /app
RUN mkdir /app/publicFiles
VOLUME /app/publicFiles
ADD ./app/package.json /app
WORKDIR /app
RUN npm install
ADD ./app/* /app/
CMD [ "nodejs", "main.js" ]
