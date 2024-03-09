FROM node:17-alpine

# set working directory
WORKDIR /app

# copy package.json file to app directory
COPY package.json ./package.json

# install dependencies
RUN npm install

# copy code files
COPY . /app/

# Expose port
EXPOSE 5173

# start app 
CMD ["npm", "run", "dev"]
    