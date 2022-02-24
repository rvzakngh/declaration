# Overview
This project is a sample health declaration application consist of both frontend (SPA) and webservice/server. The project consists of:
- SPA (/spa) developed using Angular. For more explanation on the use cases, refer to [/spa](spa/)
- Web service (/server) developed using Java with Jersey. For more explanation on APIs, refer to [/server](server/)
- Kubernetes configuration files (targeted for Google Kubernetes Engine)

# Build
In order to build, you would need to have the following tools ready:
- SPA: nodejs (npm), Angular CLI (ng)
- Web service: maven (mvn), JDK

## SPA
You can start by running from the /spa
```npm install```

After the node modules are all installed, you may run the built-in Angular development server
```ng serve```

Alternatively, if you wish to build
```ng build```

Some unit tests:
```ng test```

## Web service (Server)
In order to build the Java WAR file
```mvn package```

Some unit tests are also available that will automatically runs Jetty web app server. The test would then access the endpoint. For this unit/integration testing purpose, the endpoints that are accessed are the ones that will use in-memory data instead of using a database
```mvn verify```

# Docker images
The build methods above will produces some SPA static files and also a Java WAR file. For Kubernetes deployment, docker images will need to be built.

## SPA
For SPA, the docker build can be run to create a docker image from the /spa directory
```docker build -t <registry-base-path>/declaration-spa .```

This would create an image based on Nginx. It would then copy the SPA built files and modify the configuration for the purpose of hosting static SPA.

## Web service (Server)
Similarly, a Dockerfile is also available in order to create a docker image from the /server directory
```docker build -t <registry-base-path>/declaration-server .```

This would create an image based on Tomcat. It would then copy the WAR file (context path will be /decl) into the Tomcat webapps.

# Deployment into Kubernetes

As the deployment is on Google Kubernetes Engine (GKE), the steps below are specific for GKE although it can be adapted accordingly for other Kubernetes environment. 

## Prerequisites
1. Create a cluster
2. Create Cloud SQL instance (MySQL) and database

## Steps (not in details)
1. Cloud SQL Proxy will need to be setup. This means side-car container will be deployed together with the declaration-server container. The side car is used to provide a better security to facilitate the connection from the declaration-server container to the Cloud SQL. You may refer to Cloud SQL for Kubernetes Engine documentation in GCP for the setup steps. The side car essentially will establish authentication to the Cloud SQL via a service-account. This is in addition to the DB credential.
2. As part of the Cloud SQL Proxy deployment, a key file of the service account will need to be added to the kubernetes secret. Similarly, DB username and password are also need to be added to kubernetes secret.
3. Assuming all those are setup, then you may deploy the declaration-server and declaration-spa
```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/deployment-spa.yaml
```
4. Then when the pods are all up and ready, you may deploy the services. The services are of type NodePort. Thus, they are not exposed to internet.
```
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/service-spa.yaml
```
5. TLS certificate will need to be added to the kubernetes secret for the ingress to use
6. Then an ingress can be deployed to expose both the SPA and the web service. The ingress will direct the URL with prefix /decl to the declaration-server wheras for any other path will be served by the declaration-spa
```
kubectl apply -f k8s/ingress.yaml
```





