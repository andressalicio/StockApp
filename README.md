# Backend

## The following prerequisites are required for the execution of the project:

- Java 11
- Maven
- Intellj IDEA Community Edition or other IDE.
- Mysql 8 or above

## Configurations
- Configure mysql on \src\main\java\prodmaster\challenge\stockAPI\configuration\DataConfiguration.java - Actually it´s using a database called stockapi
- Configure email informations on file \src\main\resources\application.properties
- You also need to configure your email at OrdersService.java and MovementService.java

## Run the project

- This project was developed using Intellj IDEA Community Edition, so to run the project you just need to open it on the IDE and run the project.
- It's possible that the project can run with other IDEs that have maven configured, but the steps are not supported on this Readme

## After executing the project, the API will be running at localhost:8080 and you can try it pasting the following address on your browser:

```
http://localhost:8080/api/v1/stock/user
```

# Frontend

## Configurations
- If you changed the backend port, you will need to also change the backend references inside Frontend\src\api files.

## Installing and running the project:
Run:
- npm install
- npm run start

Your project will be running at localhost:3000 and if should be connected with the backend part.



