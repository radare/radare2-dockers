FROM voidlinux/voidlinux
RUN /usr/sbin/ssh-keygen -A

RUN xbps-install -Syu && \
  xbps-install -Syu && \
  xbps-install -y gcc make git && \
  rm -rf /var/cache/xbps/*

RUN echo '%wheel ALL=(ALL) ALL' >> /etc/sudoers
RUN cat /etc/sudoers
RUN mkdir /var/run/sshd
RUN useradd -G wheel -ms /bin/bash pancake

ADD PASSWD /tmp/PASSWD
RUN /usr/sbin/chpasswd -e < /tmp/PASSWD ; rm -f /tmp/PASSWD

EXPOSE 22
ENTRYPOINT /usr/sbin/sshd -D
