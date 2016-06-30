NAME=http-www.radare.org
REPO=https://github.com/radare/radare.org
#HTTPROOT=/usr/share/nginx/html
HTTPROOT=/var/lib/nginx/html/

include ../mk/http.mk

www:
	git clone https://github.com/radare/radare.org || (cd radare.org ; git pull)
	cd radare.org && $(MAKE)

.PHONY: www
