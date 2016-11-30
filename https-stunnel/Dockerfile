FROM alpine

COPY repositories /etc/apk/repositories

RUN apk update && apk upgrade
RUN apk add stunnel

COPY ssl.tgz /etc
RUN tar xzvf /etc/ssl.tgz -C /etc && chmod 400 /etc/ssl/* && chown -R root:root /etc/ssl && rm -f /etc/ssl.tgz

# massage chroot
RUN mkdir /var/run/stunnel && chown stunnel:stunnel /var/run/stunnel
RUN mkdir -p /var/run/stunnel/proc
RUN mkdir -p /var/run/stunnel/dev

# for the chroot
COPY stunnel.conf /etc/stunnel/stunnel.conf
RUN cp /etc/stunnel/stunnel.conf /var/run/stunnel/
# RUN apk add valgrind strace

# RUN mount -o bind /proc /var/run/stunnel/proc && mount -o bind /dev /var/run/stunnel/dev
# RUN cp -a /dev/zero /var/run/stunnel/dev/zero
# RUN mkdir -p /var/run/stunnel/proc/self && cp -rf /proc/self/* /var/run/stunnel/proc/self/
EXPOSE 443

ENTRYPOINT stunnel
# /dev is necessary for libressl iirc and /proc is mandatory to run
# ENTRYPOINT mount -o bind /proc /var/run/stunnel/proc && mount -o bind /dev /var/run/stunnel/dev && stunnel
# ENTRYPOINT mount -o bind /proc /var/run/stunnel/proc && stunnel
