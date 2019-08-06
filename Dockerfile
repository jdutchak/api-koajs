# Create image based on the official Node 6 image from dockerhub
FROM node:10.11.0-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

## Copy dependency definitions
COPY package.json /usr/src/app

# Install dependencies
RUN apk --no-cache add --update \
    bash git \
    python \
    build-base \
  && rm -rf /var/cache/apk/*

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 8000

# Serve the app
CMD ["npm", "start"]
