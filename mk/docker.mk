
all:
	docker build -t $(NAME) .

run:
	docker run $(DOCKER_RFLAGS) -p $(PORT):$(PORT) -ti $(NAME)

bg:
	docker run $(DOCKER_RFLAGS) -p $(PORT):$(PORT) -d $(NAME)

sh shell:
	docker run --entrypoint /bin/sh -ti $(NAME)
	#docker run --privileged --entrypoint /bin/sh -ti $(NAME)

clean:
	docker rmi -f $(NAME)
