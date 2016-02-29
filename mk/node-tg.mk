ifeq ($(FIX),)
FIX=src/node_modules
else
FIX_NEXT=src/node_modules
endif

all: src/TOKEN
	docker build -t $(NAME) .

clean:
	rm -f src
	docker rmi $(NAME)

mrproper: clean
	rm -rf radare2-bindings

src: radare2-bindings
	cd radare2-bindings ; git pull
	rm -f src
	ln -fs radare2-bindings/r2pipe/nodejs/examples/$(BOT) src

src/node_modules: src
	cd src ; npm install

src/TOKEN: $(FIX)
	cp -f ../etc/$(NAME)/TOKEN src/TOKEN

radare2-bindings:
	git clone https://github.com/radare/radare2-bindings

run:
	docker run $(NAME)

run2:
	docker run $(NAME) node --version
	docker run --sig-proxy=false -v "$(shell pwd)/src:/src" $(NAME) /bin/sh -c "cd /src; node index.js"

include ../mk/generic.mk
