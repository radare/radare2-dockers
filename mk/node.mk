ifeq ($(PORT),)
IPORT=8080
OPORT=80
endif

all:
	docker build -t $(NAME) .

run:
	docker run --sig-proxy=false -p :$(IPORT):$(OPORT) $(NAME)

.PHONY: all run

include ../mk/generic.mk
