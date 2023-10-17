# Getting Started with Create React App


### `yarn start`

### `yarn build`

---


# Run the web app in a Docker container

### Build the image
    sudo docker build -t giter-partner-cabinet . -f app.Dockerfile

### Run the image
    sudo docker run -it --rm --name=partner_cabinet -p 80:80 giter-partner-cabinet

### Passing env vars 
    sudo docker run -it --rm --name=partner_cabinet -p 80:80 --env ENVIRONMENT=dev giter-partner-cabinet 

### Run bash inside the container if needed, using the name 
    docker exec -it partner_cabinet /bin/bash

### when container is runned you can see the app in http://localhost/