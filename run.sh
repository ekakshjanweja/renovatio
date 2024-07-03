# builds the node image called 'renovatio_image'
docker build -t renovatio_image .

# runs the built image,
#  --env-file .env : passes the .env file to the container
docker run -p 3000:3000 --env-file .env --name renovatio renovatio_image
