FROM node:17.9.0-alpine as app-build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY /package.json /usr/src/app
COPY /yarn.lock /usr/src/app

RUN node --version
RUN npm --version
RUN yarn -version

RUN yarn install

COPY ./ /usr/src/app
RUN yarn build

FROM nginx:1.20.2-alpine as Partner-Cabinet

COPY nginx.conf /etc/nginx/nginx.conf

# Copy only React Build into /nginx/html
COPY --from=app-build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]