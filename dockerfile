FROM node:20.4.0
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --omit=optional --force 
# If you are building your code for production
#RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 4000
CMD [ "node", "./bin/www" ]