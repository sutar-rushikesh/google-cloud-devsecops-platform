# Troubleshooting Guide

## Overview

This document contains the common issues encountered during the implementation of the Google Cloud DevSecOps Platform and the corresponding solutions.

These troubleshooting steps can help quickly identify and resolve similar problems during deployment or maintenance.

---

# Table of Contents

- Google Cloud Authentication
- Jenkins Issues
- SonarQube Issues
- Docker Issues
- Trivy Issues
- Artifact Registry Issues
- GitHub Issues
- Kubernetes Issues
- ArgoCD Issues
- Terraform Issues
- SSL/TLS Issues
- General Linux Commands

---

# 1. Google Cloud Authentication Issues

## Problem

```
ERROR: gcp-service-account
```

### Cause

Jenkins credential ID does not exist or is incorrectly configured.

### Solution

- Verify the credential exists.
- Ensure the credential ID matches the Jenkinsfile.
- Store the Service Account JSON as a **Secret File** credential.

Verify:

```
Manage Jenkins
→ Credentials
→ System
→ Global Credentials
```

---

## Problem

```
Cloud Resource Manager API has not been used before
```

### Cause

Required APIs are disabled.

### Solution

Enable required APIs.

```
gcloud services enable cloudresourcemanager.googleapis.com

gcloud services enable artifactregistry.googleapis.com

gcloud services enable iam.googleapis.com
```

---

## Problem

```
Permission denied
```

### Cause

Service Account lacks IAM permissions.

### Solution

Assign appropriate roles.

Example

- Artifact Registry Administrator
- Kubernetes Engine Admin
- Storage Admin
- Service Account User

---

# 2. Jenkins Issues

## Problem

```
ERROR: gcp-project-id
```

### Cause

Credential not found.

### Solution

Either:

Create a Secret Text credential

or

Hardcode the Project ID

```
GOOGLE_CLOUD_PROJECT="project-id"
```

---

## Problem

```
No workspace found
```

### Solution

```
cleanWs()
```

Run before checkout.

---

## Problem

Pipeline fails after modifying Jenkinsfile.

### Solution

Use

```
Replay
```

or

Rebuild Pipeline

after validating syntax.

---

# 3. SonarQube Issues

## Problem

```
Failed to query server version
```

### Cause

SonarQube server unreachable.

### Solution

Verify server.

```
systemctl status sonarqube
```

Check firewall.

```
curl http://SERVER-IP:9000
```

---

## Problem

```
Quality Gate Timeout
```

### Solution

Verify

```
Manage Jenkins

Configure System

SonarQube Servers
```

Ensure webhook is configured.

```
http://JENKINS_URL/sonarqube-webhook/
```

---

## Problem

```
report-task.txt not found
```

### Cause

Sonar Scanner failed.

### Solution

Check scanner logs before Quality Gate stage.

---

# 4. Docker Issues

## Problem

```
permission denied while trying to connect to docker.sock
```

### Cause

Jenkins user is not in the docker group.

### Solution

```
sudo usermod -aG docker jenkins

sudo systemctl restart jenkins

sudo reboot
```

---

## Problem

```
docker login failed
```

### Solution

Run

```
gcloud auth configure-docker us-central1-docker.pkg.dev
```

Verify

```
docker login
```

---

## Problem

```
Legacy Builder Deprecated
```

### Cause

Docker BuildKit not enabled.

### Solution

Install Docker Buildx.

```
docker buildx install
```

---

# 5. Trivy Issues

## Problem

```
Database update failed
```

### Solution

Update Trivy.

```
trivy image --download-db-only
```

---

## Problem

```
Unsupported files not found
```

### Cause

No supported application dependencies.

### Solution

Safe to ignore for static HTML projects.

---

## Problem

Critical Vulnerabilities Found

### Solution

- Update base image
- Upgrade OS packages
- Use latest Docker image

---

# 6. Artifact Registry Issues

## Problem

```
denied: Permission denied
```

### Cause

Service Account missing permissions.

### Solution

Assign

```
Artifact Registry Writer
```

role.

---

## Problem

```
Repository not found
```

### Solution

Verify

```
gcloud artifacts repositories list
```

---

## Problem

```
Unauthenticated request
```

### Solution

Run

```
gcloud auth configure-docker
```

again.

---

# 7. GitHub Issues

## Problem

```
403 Permission Denied
```

### Cause

Invalid GitHub Token.

### Solution

Generate a new Personal Access Token.

Required scopes

- repo
- workflow

---

## Problem

```
remote origin already exists
```

### Solution

```
git remote remove origin

git remote add origin REPOSITORY_URL
```

---

## Problem

Repository shows original author's name.

### Cause

Forked repository.

### Solution

Create a new repository and push using

```
git remote set-url origin
```

---

# 8. Kubernetes Issues

## Problem

Pods Pending

### Solution

```
kubectl describe pod POD_NAME
```

Check

- CPU
- Memory
- ImagePullSecret

---

## Problem

ImagePullBackOff

### Solution

Verify

```
kubectl describe pod
```

Confirm image exists in Artifact Registry.

---

## Problem

CrashLoopBackOff

### Solution

```
kubectl logs POD_NAME
```

Review container startup logs.

---

## Problem

Ingress not working

### Solution

Verify

```
kubectl get ingress

kubectl describe ingress
```

---

# 9. ArgoCD Issues

## Problem

Application OutOfSync

### Cause

Git repository differs from cluster.

### Solution

Click

```
SYNC
```

or enable

```
Auto Sync
```

---

## Problem

Application Missing

### Solution

Verify repository URL

Branch

Path

Namespace

---

## Problem

Repository Authentication Failed

### Solution

Reconnect GitHub repository using a Personal Access Token.

---

# 10. Terraform Issues

## Problem

Provider Initialization Failed

### Solution

```
terraform init
```

---

## Problem

State Lock

### Solution

```
terraform force-unlock LOCK_ID
```

---

## Problem

Invalid Credentials

### Solution

Verify

```
gcloud auth application-default login
```

---

# 11. SSL/TLS Issues

## Problem

Certificate not trusted

### Solution

Verify

- Certificate
- Secret
- Ingress configuration

---

## Problem

HTTPS not loading

### Solution

Verify

```
kubectl get ingress

kubectl get svc
```

---

# 12. Useful Linux Commands

Check Jenkins

```
systemctl status jenkins
```

Restart Jenkins

```
systemctl restart jenkins
```

Check Docker

```
systemctl status docker
```

Restart Docker

```
systemctl restart docker
```

Check Kubernetes

```
kubectl get pods -A
```

Check Services

```
kubectl get svc -A
```

Check Nodes

```
kubectl get nodes
```

Check Ingress

```
kubectl get ingress
```

Check Images

```
gcloud artifacts docker images list \
us-central1-docker.pkg.dev/PROJECT_ID/docker-repo
```

---

# Best Practices

- Use separate service accounts for different environments.
- Store secrets in Jenkins Credentials.
- Never hardcode passwords or tokens.
- Scan source code and container images regularly.
- Keep Docker base images updated.
- Enable automatic backups for critical resources.
- Use GitOps for Kubernetes deployments.
- Monitor application health with Prometheus and Grafana.
- Apply the principle of least privilege (PoLP) for IAM roles.

---

# Summary

This troubleshooting guide documents the most common issues encountered while building the Google Cloud DevSecOps Platform. Following these solutions can significantly reduce debugging time and help maintain a stable, secure, and production-ready environment.