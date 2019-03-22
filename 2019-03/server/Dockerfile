FROM node:8.15.1-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /server
ADD /server /server
ADD /client /client

EXPOSE 8080

ENTRYPOINT ["sh", "/server/run.sh"]
CMD ["start"]

#RUN mkdir -p /srv/app/server
#WORKDIR /srv/app/server

#COPY package.json /srv/app/server
#COPY package-lock.json /srv/app/server

#RUN yarn install

#COPY . /srv/app/server

#CMD [ "yarn","run","start" ]
