# Phase 08 - Docker Containerization

## Objective

This phase focuses on containerizing the web application using Docker. Containerization ensures that the application runs consistently across development, testing, and production environments.

The Docker image created in this phase is later pushed to Google Artifact Registry and deployed to Google Kubernetes Engine (GKE).

---

# Why Docker?

Docker packages the application along with all required dependencies into a lightweight container image.

Benefits include:

- Consistent runtime environment
- Platform independence
- Faster deployments
- Easy scalability
- Simplified dependency management
- Better resource utilization

---

# Architecture

```
Developer
     │
     ▼
Application Source Code
     │
     ▼
Docker Build
     │
     ▼
Docker Image
     │
     ▼
Google Artifact Registry
     │
     ▼
Google Kubernetes Engine
```

---

# Project Structure

```
application/

├── Dockerfile
├── index.html
├── style.css
├── script.js
└── profile.jpeg
```

---

# Dockerfile

```dockerfile
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# Dockerfile Explanation

### Base Image

```dockerfile
FROM nginx:alpine
```

Uses the lightweight Nginx Alpine image.

Benefits:

- Small image size
- Fast startup
- Low resource usage

---

### Remove Default Website

```dockerfile
RUN rm -rf /usr/share/nginx/html/*
```

Deletes the default Nginx welcome page.

---

### Copy Application Files

```dockerfile
COPY . /usr/share/nginx/html/
```

Copies all website files into the Nginx web root.

Files copied include:

- index.html
- style.css
- script.js
- profile.jpeg

---

### Expose Port

```dockerfile
EXPOSE 80
```

Allows the container to serve HTTP traffic on port 80.

---

### Start Nginx

```dockerfile
CMD ["nginx","-g","daemon off;"]
```

Starts the Nginx server in the foreground.

---

# Build Docker Image

Navigate to the application directory.

```bash
cd application
```

Build the Docker image.

```bash
docker build -t hello:latest .
```

Expected Output

```
Successfully built
Successfully tagged hello:latest
```

---

# Verify Image

```bash
docker images
```

Example

```
REPOSITORY     TAG

hello          latest
```

---

# Run Docker Container

```bash
docker run -d -p 8080:80 --name hello-app hello:latest
```

---

# Verify Running Container

```bash
docker ps
```

Example

```
CONTAINER ID

IMAGE

STATUS

PORTS

hello-app
```

---

# Access Application

Open your browser.

```
http://localhost:8080
```

The professional portfolio web application should load successfully.

---

# View Container Logs

```bash
docker logs hello-app
```

---

# Execute Inside Container

```bash
docker exec -it hello-app sh
```

---

# Stop Container

```bash
docker stop hello-app
```

---

# Remove Container

```bash
docker rm hello-app
```

---

# Remove Image

```bash
docker rmi hello:latest
```

---

# Jenkins Pipeline Integration

Docker Build Stage

```groovy
stage('Build Docker Image') {
    steps {
        sh '''
        docker build -t hello:latest .
        '''
    }
}
```

Docker Tag

```groovy
docker tag hello:latest \
us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:$IMAGE_TAG
```

Docker Push

```groovy
docker push \
us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:$IMAGE_TAG
```

---

# Challenges Faced

## Docker Permission Denied

Issue

```
permission denied while trying to connect to the Docker daemon socket
```

Resolution

Added the Jenkins user to the Docker group.

```bash
sudo usermod -aG docker jenkins

sudo systemctl restart jenkins
```

---

## Default Nginx Page Displayed

Issue

The default Nginx welcome page appeared instead of the application.

Resolution

Removed the default files before copying the application.

```dockerfile
RUN rm -rf /usr/share/nginx/html/*
```

---

## Docker Login Failed

Issue

Authentication to Artifact Registry failed.

Resolution

Configured Docker authentication using:

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

# Best Practices

- Use lightweight base images
- Keep Docker images small
- Avoid unnecessary layers
- Use specific image tags
- Scan images before deployment
- Remove unused images regularly
- Do not store secrets inside Docker images

---

# Learning Outcomes

After completing this phase I learned:

- Docker fundamentals
- Dockerfile creation
- Docker image building
- Container lifecycle management
- Docker networking
- Docker image optimization
- Docker integration with Jenkins
- Docker integration with Google Artifact Registry

---

# Screenshots

Store screenshots in:

```
screenshots/
└── phase-08-docker/
```

Suggested screenshots:

- Docker installation
- Docker version
- Dockerfile
- Docker build successful
- Docker images
- Docker container running
- Browser output
- Jenkins Docker build stage
- Docker push successful