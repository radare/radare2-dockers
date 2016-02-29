FROM ubuntu

ADD www /www

RUN apt-get update && \
  apt-get install -y nginx make reprepro php5-cli && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx && \
  apt-get clean

# Requires www/debs to be filled with deb files

# create pkg database
RUN sh -c "cd /www ; \
rm -rf /usr/share/nginx/html ; \
ln -fs /www /usr/share/nginx/html ; \
make PHP=php5 "

RUN find /www

WORKDIR /etc/nginx

ENTRYPOINT sh -c "nginx"
