FROM voidlinux/voidlinux

RUN xbps-install -Syu && \
    xbps-install -Syu && \
    xbps-install -y gcc patch make git nodejs && \
    rm -rf /var/cache/xbps/*

RUN git clone https://github.com/radare/radare2 && cd radare2 && sys/install.sh

RUN xbps-install -y netcat libcap-progs curl
RUN useradd -u 1002 r2cloud
RUN rm -rf /opt/sandbox
ADD src /src
ADD www /www
RUN type setcap

RUN rm -rf /www/enyo /www/p /www/m /www/t && \
    cd radare2/shlr/www && cp -rf enyo m p t /www/

EXPOSE 80
ENTRYPOINT bash -c "make -C /src SUDO="
