SUDO=sudo

all:
	echo findus
	mkdir -p /opt/sandbox
	sleep 5 && curl localhost:8080/cmd/aa &
	$(SUDO) sh start-r2.sh
	$(SUDO) sh start-node.sh

cloud:
	gcc r2cloud.c -o r2cloud
	chown root:root r2cloud
	chmod 4755 r2cloud
	cp -f r2cloud /usr/sbin/r2cloud

log logs:
	tail -n 200 /opt/sandbox/log

r2 update:
	cd prg/radare2 ; \
		git reset --hard HEAD~4 ; \
		git clean -xdf ; \
		git checkout master ; \
		git pull ; \
		cp -rf shlr/www/d3 shlr/www/new/d3 ; \
		export CFLAGS=-g LDFLAGS=-g ; \
		./configure --prefix=/usr ; \
		make -j 4 && \
		$(SUDO) make deinstall && \
		$(SUDO) make install

android:
	${MAKE} android-arm
	${MAKE} android-x86
	${MAKE} android-mips

android-arm:
	cd prg/radare2 ; sys/android-arm.sh

android-x86:
	cd prg/radare2 ; sys/android-x86.sh

android-mips:
	cd prg/radare2 ; sys/android-mips.sh

start:
	mkdir -p /opt/sandbox
	$(SUDO) sh start-node.sh
	$(SUDO) sh start-r2.sh

stop:
	-$(SUDO) pkill r2
	$(SUDO) pkill pen

w32:
	rm -rf r2w32
	git clone git://github.com/radare/radare2 r2w32
	cd r2w32 ; ./configure --with-compiler=i586-mingw32msvc-gcc  --with-ostype=windows --host=i586-unknown-windows
	cd r2w32 ; make -j4 ; make w32dist

DATE=$(shell date +%Y%m%d)
CLOUD_FILES=Makefile start-node.sh start-r2.sh
CLOUD_FILES+=prg/r2cloud
# CLOUD_FILES+=/opt/sandbox

backup:
	tar czvf r2cloud-$(DATE).tar.gz $(CLOUD_FILES)
