
up:
	docker run --name reef-app -dp 80:80 reef-app

rebuild:
	docker build -t reef-app .

down:
	docker stop reef-app && docker rm reef-app