#bin/bash

docker build -t vect_image .

docker rm -f vect_container

docker run -ti \
  -v $(pwd)/Vectorizer:/home/audiens/vectorizer \
  --name vect_container \
  vect_image bash

