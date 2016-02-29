ifeq ($(PORT),)
IPORT=2222
OPORT=22
endif

all:
	cp ../etc/$(NAME)/PASSWD .
	docker build -t $(NAME) .

run:
	docker run --sig-proxy=false -p :$(IPORT):$(OPORT) -v $(PWD)/dir:/dir $(NAME)

.PHONY: all run

include ../mk/generic.mk
