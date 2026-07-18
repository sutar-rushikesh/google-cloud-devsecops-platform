# Phase 10 - GitOps Continuous Deployment using ArgoCD

## Objective

This phase focuses on implementing a GitOps-based Continuous Deployment (CD) pipeline using ArgoCD.

Instead of manually deploying applications to Kubernetes, ArgoCD continuously monitors a Git repository and automatically synchronizes the Kubernetes cluster whenever changes are committed.

This enables fully automated, version-controlled, and declarative deployments.

---

# What is GitOps?

GitOps is an operational framework that uses Git as the single source of truth for infrastructure and application deployments.

Any change committed to Git is automatically detected and deployed to the Kubernetes cluster.

---

# Why ArgoCD?

ArgoCD is a Kubernetes-native Continuous Deployment tool.

It provides:

- Automated Kubernetes deployments
- Git as the single source of truth
- Automatic synchronization
- Rollback capability
- Deployment history
- Health monitoring
- Self-healing applications

---

# Architecture

```
                  Developer
                      │
                      ▼
               GitHub Repository
          (gcp-test-k8s Repository)
                      │
                Git Commit
                      │
                      ▼
                 ArgoCD Server
                      │
            Watches Git Repository
                      │
          Automatic Synchronization
                      │
                      ▼
             Google Kubernetes Engine
                      │
                      ▼
                Running Application
```

---

# GitOps Workflow

```
Developer

↓

Update values.yaml

↓

Git Commit

↓

GitHub

↓

ArgoCD detects changes

↓

Sync Application

↓

Deploy new Docker Image

↓

Application Updated
```

---

# Prerequisites

Before installing ArgoCD ensure:

- Kubernetes Cluster is running
- kubectl configured
- GKE Cluster Ready
- GitHub Repository created
- Docker Images available in Artifact Registry

---

# Install ArgoCD

Create namespace

```bash
kubectl create namespace argocd
```

Install ArgoCD

```bash
kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

---

# Verify Installation

```bash
kubectl get pods -n argocd
```

Example

```
NAME

argocd-server

Running

argocd-repo-server

Running

argocd-application-controller

Running
```

---

# Expose ArgoCD Server

```bash
kubectl patch svc argocd-server \
-n argocd \
-p '{"spec":{"type":"LoadBalancer"}}'
```

Verify

```bash
kubectl get svc -n argocd
```

---

# Get Initial Admin Password

```bash
kubectl get secret argocd-initial-admin-secret \
-n argocd \
-o jsonpath="{.data.password}" | base64 -d
```

---

# Login

Default Username

```
admin
```

Password

```
<Generated Password>
```

---

# Connect Git Repository

Repository

```
https://github.com/<username>/gcp-test-k8s.git
```

Authentication

- GitHub Token
- HTTPS

---

# Application Repository Structure

```
gcp-test-k8s/

├── helm
│
├── deployment.yaml
├── service.yaml
├── ingress.yaml
├── values.yaml
└── Chart.yaml
```

---

# Create ArgoCD Application

Application Name

```
hello-app
```

Project

```
default
```

Repository URL

```
https://github.com/<username>/gcp-test-k8s.git
```

Revision

```
main
```

Path

```
helm
```

Destination

```
https://kubernetes.default.svc
```

Namespace

```
default
```

---

# Enable Auto Sync

Enable

- Automatic Sync
- Self Heal
- Prune Resources

This ensures:

✔ Automatic Deployment

✔ Drift Correction

✔ Automatic Resource Cleanup

---

# CI/CD Flow

```
GitHub (Application Repository)

↓

Jenkins Pipeline

↓

Docker Build

↓

Artifact Registry

↓

Update Helm values.yaml

↓

Git Push

↓

GitHub (K8s Repository)

↓

ArgoCD

↓

Google Kubernetes Engine

↓

Application Updated
```

---

# Jenkins Integration

The Jenkins pipeline automatically updates the image tag inside:

```
helm/values.yaml
```

Example

```yaml
image:
  us-central1-docker.pkg.dev/project-id/docker-repo/hello:1.0.25
```

Jenkins commits the updated file and pushes it to GitHub.

ArgoCD detects the change and synchronizes the deployment automatically.

---

# Verify Deployment

Check application

```bash
kubectl get pods
```

Check services

```bash
kubectl get svc
```

Check deployments

```bash
kubectl get deployments
```

Check ingress

```bash
kubectl get ingress
```

---

# Verify Sync Status

Inside ArgoCD Dashboard

Application Status

```
Healthy

Synced
```

---

# Automatic Deployment Verification

Update application code

↓

Commit

↓

Push

↓

Jenkins Pipeline

↓

Docker Image

↓

Artifact Registry

↓

values.yaml Updated

↓

Git Push

↓

ArgoCD Sync

↓

Application Updated

No manual deployment required.

---

# Challenges Faced

## GitHub Authentication Failed

Issue

```
Permission denied
```

Resolution

Configured GitHub Personal Access Token inside Jenkins credentials.

---

## Image Not Updated

Issue

ArgoCD deployed an older image.

Resolution

Updated the image tag in `values.yaml` automatically from the Jenkins pipeline.

---

## OutOfSync Status

Issue

Application remained OutOfSync.

Resolution

Enabled Automatic Sync and manually synchronized once.

---

## Image Pull Error

Issue

```
ImagePullBackOff
```

Resolution

Verified:

- Artifact Registry
- Image tag
- Repository path
- IAM permissions

---

# Best Practices

- Store Kubernetes manifests in Git
- Never edit resources manually in the cluster
- Enable Auto Sync
- Enable Self Heal
- Enable Prune
- Keep Helm charts version-controlled
- Use immutable Docker image tags

---

# Learning Outcomes

After completing this phase I learned:

- GitOps
- ArgoCD Architecture
- Continuous Deployment
- Kubernetes Synchronization
- Helm Deployment
- Automated Image Updates
- GitHub Integration
- Declarative Infrastructure

---

# Screenshots

Store screenshots in

```
screenshots/
└── phase-10-argocd/
```

Recommended screenshots

- ArgoCD installation
- argocd namespace
- Running pods
- LoadBalancer service
- Initial admin password
- Login screen
- Repository connected
- Application created
- Sync Successful
- Healthy Status
- Jenkins updating values.yaml
- Automatic deployment
- Application UI