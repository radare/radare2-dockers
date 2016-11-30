all:
	docker build -t $(NAME) .

run:
	docker run --privileged -p 8443:443 -ti $(NAME)

sh shell:
	docker run --privileged --entrypoint /bin/sh -ti $(NAME)

clean:
	docker rmi -f $(NAME)
