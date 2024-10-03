FROM node:lts-alpine

# PNPM setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN pnpm build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD ["pnpm", "start"]