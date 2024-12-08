# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory for your application
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available)
# This helps in caching dependencies to avoid reinstalling every time you rebuild
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: If you are using TypeScript, install ts-node globally (or you can do it locally in your `package.json`)
RUN npm install -g ts-node typescript

RUN npm run build

# Step 7: Expose the port that the application will run on (use the port from your `docker-compose.yml`)
EXPOSE 3000

# Step 8: Define the command to run the API or worker, depending on the service
# This can be adjusted in the `docker-compose.yml` to run either the API or worker script
CMD ["npm", "start"]
