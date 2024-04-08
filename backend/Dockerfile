FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy Prisma schema file
COPY src/prisma ./prisma

# Install Prisma CLI globally
RUN npm install -g prisma

# Generate Prisma client
RUN prisma generate

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "serve"]
