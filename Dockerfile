FROM node:10
RUN yarn global add bs-platform

# Expose ports for IPFS deployment example
EXPOSE 4001
EXPOSE 8081