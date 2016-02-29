GPG=gpg2
ME=cloud.radare.org

all:
	docker-machine ip default
	docker-compose up

etc-restore restore-etc:
	$(GPG) -d < etc.gpg | tar xzv -C etc

etc-backup backup-etc:
	cd etc ; tar czv * | $(GPG) -e -r $(ME) > ../etc.gpg
