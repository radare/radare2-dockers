cydia.radare.org
================

Requires to have www/debs full of deb files


Node.js service
---------------

- serves static content

- operations:
  - delete deb
  - publish deb
  - rebuild

- requires authentication
  - 2FA ?

- supports post operations to publish new binaries
  - notifies developers somehow
  - or maybe just a log
  - or irc, or telegram :D

Bugs and proposals for cydia.radare.org
---------------------------------------
* [ ] libgcc should depend on dummylibs (otherwise gcc will not work coz missing libSystem)
* [ ] php: not signed, and depends on libiconv
* [ ] go: set GOPATH in env.sh;/var/go/bin/go (not signed); /var/go/src/cmd/, /var/go/pkg/obj/cmd/ (all binaries are not signed)
* [ ] devdeps is not working yet ... FIX
* [ ] upgrade nodejs
* [ ] openssl
* [ ] man-db must depend on gettext (libintl) and libpipeline
* [ ] man-db broken (iOS6.1.3) (`symbol not found`)
