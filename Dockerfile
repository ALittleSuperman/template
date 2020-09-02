FROM nginx:latest


COPY  ./build  /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

