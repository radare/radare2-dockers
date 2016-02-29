
backup:
	docker save $(NAME) | gzip > $(NAME).tar.gz

restore:
	gunzip < $(NAME).tar.gz | docker load

stop:
	for a in `docker ps|grep -v CONT | awk '{print $$1}'` ; do docker kill $$a ; done


.PHONY: backup restore stop
