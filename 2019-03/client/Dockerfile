FROM node:8.15.1-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /client
ADD . /client

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["sh", "/client/run.sh"]
CMD ["start"]