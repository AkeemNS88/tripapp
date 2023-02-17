We have a total of 3 containers in our application
- Frontend
- Backend
- Postgres Database 

## Building Images
Before we can start the frontend and backend containers, we fist need to build their images. To do so, run the following commands in the terminal

```sh
docker build -t <image_name>:<tag> -f Dockerfile.frontend . # builds the frontend image
docker build -t <image_name>:<tag> -f Dockerfile.backend . # builds the backend image
```

We don't need to build the postgres image ourselves. We'll grab it from dockerhub's repository.

## Running Images Locally
To test that our frontend and backend images are working properly, you can run them and access on localhost. In order to run them, enter the following commands.
```sh
docker run -p 5000:80 frontend:latest # launches the frontend container that's listening for traffic on port 5000

docker run -p 3000:3000 backend:latest # launches the backend container that's listening for traffic on port 3000
```

To pull and test the postgres db image, you need to run the following command
```sh
docker run \
    -e POSTGRES_USER=<user> \
    -e POSTGRES_DB=<default_db_name> \
	-e POSTGRES_PASSWORD=<my_secret_password> \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v <local_mount_dir>:/var/lib/postgresql/data \
    -p 5432:5432 \
	postgres
```

This command starts a postgres container with
- a postgres user named `user`
- a default postgres db named `default_db_name`
- postgres password set to `my_secret_password`
- a volume to store database files `local_mount_dir` for persistence

...