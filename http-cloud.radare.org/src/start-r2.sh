#!/bin/sh

[ ! `id -u` = 0 ] && echo need root && exit 1

echo Running r2
FILE=/bin/ls
FILE=/bin/true
LOG=/opt/sandbox/log
PORT=8080
[ -n "$1" ] && PORT=$1

cd /opt/sandbox
if [ -f /opt/sandbox/pid ]; then
	kill -9 $(cat /opt/sandbox/pid)
fi

# TODO : use rarun to chroot
date >> ${LOG}
#su -c "r2 -q -e scr.color=false -e scr.color=false -e http.sandbox=true -e http.port=${PORT} -c=h ${FILE} >> ${LOG} 2>&1 & echo "'$!'" >/opt/sandbox/pid" sandbox
if [ ! -x /usr/sbin/r2cloud ]; then
	(
	cd /src
	gcc r2cloud.c -o r2cloud
	chown root:root r2cloud
	chmod 4755 r2cloud
	cp -f r2cloud /usr/sbin/r2cloud
	)
fi
/usr/sbin/r2cloud run
chmod 777 /opt/sandbox/*
echo GET /cmd/e cfg.sandbox=true | nc 127.0.0.1 ${PORT}
#echo GET /cmd/e%20cfg.sandbox=true | nc 127.0.0.1 ${PORT}
