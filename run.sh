# builds the node image called 'renovatio_image'
docker build -t renovatio_image .

# runs the built image,
#  --rm: removes the container when exit
#  --env-file .env : passes the .env file to the container
docker run --rm -p 3000:3000 --env-file .env --name renovatio renovatio_image
