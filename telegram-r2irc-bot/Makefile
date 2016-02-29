NAME=telegram-r2irc-bot
BOT=tgircbot
FIX=fix-irc-js

include ../mk/node-tg.mk

$(FIX): $(FIX_NEXT)
	sed -e 's,setTimeout(false),setTimeout(0),' src/node_modules/irc.js/IRC.js > .irc.js
	mv .irc.js src/node_modules/irc.js/IRC.js
