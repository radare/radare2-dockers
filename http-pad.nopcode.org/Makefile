NAME=http-pad.nopcode.org
PORT=9001

HAVE_RUN=1

include ../mk/http.mk

run:
	docker run -p 9001:9001 -v db:/db -ti $(NAME) cat /etc/passwd
	#docker run -p 9001:9001 -v db:/db -ti $(NAME) node node_modules/ep_etherpad-lite/node/server.js
