FROM node:8.2.1

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install
RUN cd server && npm install

# Build the app
RUN npm run build
RUN cd server && npm run build

EXPOSE 3002

CMD npm run server
