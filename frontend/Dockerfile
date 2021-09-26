# Use an official node runtime as a parent image
FROM node:12

WORKDIR /app/

# Install dependencies
COPY package.json package-lock.json /app/

RUN npm install

# Add rest of the client code
COPY . /app/

EXPOSE 8080

CMD npm run serve