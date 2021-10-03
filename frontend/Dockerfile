FROM node:12

WORKDIR /app/

# Install dependencies
COPY package.json package-lock.json /app/

RUN npm install
RUN npm install -g serve

# Add rest of the client code
COPY . /app/

EXPOSE $PORT

RUN npm run build --mode prod

CMD serve -s /app/dist -l $PORT