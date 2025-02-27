# Use the official Node.js image as the base image with Node.js 20
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install the project dependencies
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

# Build the React application
RUN yarn build

# Install the `serve` package globally to serve the built app (optional, if you prefer global)
RUN yarn global add serve

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app in production mode
CMD ["serve", "-s", "dist", "-l", "8080"]
