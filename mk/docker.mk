all:
	docker build -t $(NAME) .

run:
	docker run --privileged -p $(PORT):$(PORT) -ti $(NAME)

bg:
	docker run --privileged -p $(PORT):$(PORT) -d $(NAME)

sh shell:
	docker run --privileged --entrypoint /bin/sh -ti $(NAME)

clean:
	docker rmi -f $(NAME)
