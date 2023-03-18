FROM node:16.17
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api
COPY package.linux.json /usr/src/api/package.json
RUN npm install -g npm@8.19.2
RUN npm install
RUN npm install -g typescript
RUN tsc
EXPOSE 3000
CMD ["npm", "run", "qas"]