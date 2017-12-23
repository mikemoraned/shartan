FROM node:9.3.0

# Install node-canvas dependencies
RUN apt-get update
RUN apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install
RUN cd server && npm install

# Build the app
RUN npm run build

CMD ./start.sh $PORT

