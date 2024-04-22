FROM node:16-slim AS base
RUN corepack enable
COPY . /src
RUN cd /src && yarn install && yarn run build

FROM alpine:latest
COPY --from=base /src/build /build
