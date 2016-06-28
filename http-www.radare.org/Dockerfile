FROM alpine

RUN apk add --update make nodejs nginx

RUN ln -fs /usr/share/nginx/html /www
# ADD www /usr/share/nginx/html
# RUN mkdir -p /www ; cd /www ; mv * /usr/share/nginx/html/ ; npm install markdown && make

RUN echo 'daemon off;' >> /etc/nginx/nginx.conf

WORKDIR "/www"

# CMD ["nginx", "-g", "daemon off;"]

RUN mkdir -p /run/nginx/

ENTRYPOINT nginx
# ADD public-html /usr/local/apache2/htdocs/
