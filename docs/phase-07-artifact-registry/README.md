# Phase 07 - Google Artifact Registry

## Objective

This phase focuses on configuring Google Artifact Registry as the centralized container image repository for the DevSecOps platform.

Instead of storing Docker images locally or on Docker Hub, all application images are securely pushed to Google Artifact Registry.

This enables:

- Secure image storage
- Version-controlled Docker images
- Integration with Jenkins CI
- Integration with Google Kubernetes Engine (GKE)
- Secure image pulling by Kubernetes clusters

---

# Why Artifact Registry?

Google Artifact Registry is Google's managed service for storing software artifacts.

It supports:

- Docker Images
- Helm Charts
- Maven Packages
- npm Packages
- Python Packages
- Go Modules

For this project, Docker images are stored inside Artifact Registry before deployment to GKE.

---

# Architecture

```

Developer
│
▼
GitHub Repository
│
▼
Jenkins CI
│
▼
Docker Build
│
▼
Google Artifact Registry
│
▼
Google Kubernetes Engine

```

---

# Prerequisites

Before configuring Artifact Registry, ensure:

- Google Cloud Project created
- Billing enabled
- Jenkins configured
- Docker installed
- Google Cloud SDK installed
- Required IAM permissions assigned

---

# Enable Required APIs

Enable Artifact Registry API

```bash
gcloud services enable artifactregistry.googleapis.com
```

Enable IAM API

```bash
gcloud services enable iam.googleapis.com
```

Enable Cloud Resource Manager API

```bash
gcloud services enable cloudresourcemanager.googleapis.com
```

Verify APIs

```bash
gcloud services list --enabled
```

---

# Create Docker Repository

Create a Docker repository in the desired region.

Example:

```bash
gcloud artifacts repositories create docker-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker Images Repository"
```

---

# Verify Repository

```bash
gcloud artifacts repositories list \
--location=us-central1
```

Example Output

```
REPOSITORY

docker-repo

FORMAT

DOCKER

LOCATION

us-central1

```

---

# Configure Docker Authentication

Configure Docker to authenticate with Artifact Registry.

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

Example

```
Adding credentials for:

us-central1-docker.pkg.dev
```

---

# Docker Image Naming Convention

Artifact Registry uses the following format.

```
LOCATION-docker.pkg.dev

/

PROJECT_ID

/

REPOSITORY

/

IMAGE_NAME

:

TAG
```

Example

```
us-central1-docker.pkg.dev/project-id/docker-repo/hello:1.0.15
```

---

# Build Docker Image

```bash
docker build -t hello:latest .
```

---

# Tag Docker Image

```bash
docker tag hello:latest \
us-central1-docker.pkg.dev/PROJECT_ID/docker-repo/hello:latest
```

---

# Push Docker Image

```bash
docker push \
us-central1-docker.pkg.dev/PROJECT_ID/docker-repo/hello:latest
```

---

# Verify Image

Open Google Cloud Console

Artifact Registry

↓

docker-repo

↓

Images

You should see

```
hello

latest

1.0.xx
```

---

# Jenkins Pipeline Integration

Configure Docker Authentication

```groovy
stage('Configure Artifact Registry') {
    steps {
        sh '''
        gcloud auth configure-docker us-central1-docker.pkg.dev --quiet
        '''
    }
}
```

---

Build Image

```groovy
stage('Build Docker Image') {
    steps {
        sh '''
        docker build -t hello:latest .
        '''
    }
}
```

---

Tag & Push

```groovy
stage('Tag & Push Docker Image') {
    steps {
        sh '''
        docker tag hello:latest us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:$IMAGE_TAG

        docker push us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:$IMAGE_TAG

        docker tag hello:latest us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:latest

        docker push us-central1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/docker-repo/hello:latest
        '''
    }
}
```

---

# Image Versioning Strategy

This project follows automated image versioning.

Example

```
1.0.1

1.0.2

1.0.3

1.0.10

1.0.15
```

where

```
IMAGE_TAG = "1.0.${BUILD_NUMBER}"
```

Every Jenkins build automatically creates a new image version.

---

# Challenges Faced

## Docker Authentication Failed

Issue

```
docker login failed
```

Resolution

Configured Docker authentication using

```bash
gcloud auth configure-docker
```

---

## Artifact Registry API Disabled

Issue

```
SERVICE_DISABLED
```

Resolution

Enabled

```
artifactregistry.googleapis.com
```

---

## Permission Denied

Issue

```
Permission denied while pushing image
```

Resolution

Assigned required IAM roles to the service account.

---

## Repository Not Found

Issue

```
repository does not exist
```

Resolution

Verified:

- Project ID
- Region
- Repository name

---

# Security Best Practices

- Never use root account credentials
- Use least privilege IAM roles
- Enable Artifact Registry API only when required
- Store credentials securely
- Use immutable image tags
- Scan images before pushing
- Enable vulnerability scanning

---

# Learning Outcomes

After completing this phase I learned:

- Google Artifact Registry
- Docker authentication with GCP
- Image versioning
- Docker tagging strategy
- Secure image storage
- Jenkins integration
- CI image publishing
- Registry management

---

# Screenshots

Store screenshots here

```
screenshots/
└── phase-07-artifact-registry/
```

Recommended screenshots

- Artifact Registry API enabled
- Docker repository created
- Docker authentication
- Jenkins Configure Artifact Registry stage
- Docker image build
- Docker push successful
- Artifact Registry image list
- Version history