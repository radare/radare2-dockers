FIX_NEXT=www

ifeq ($(FIX),)
FIX=www
HAVE_FIX=0
else
HAVE_FIX=1
endif

ifneq ($(PORT),)
IPORT=$(PORT)
OPORT=$(PORT)
endif

ifeq ($(IPORT),)
IPORT=80
endif

ifeq ($(OPORT),)
OPORT=80
endif

all: $(FIX)
	docker build -t ${NAME} .

ifeq ($(HAVE_FIX),0)
$(FIX):
	@echo fix
endif

ifneq ($(HAVE_RUN),1)
HTTPROOT?=/var/lib/nginx/html/
run:
	docker run --sig-proxy=false -p :$(IPORT):$(OPORT) -v $(PWD)/www:$(HTTPROOT) $(NAME)
endif

.PHONY: all run $(FIX)

include ../mk/generic.mk
