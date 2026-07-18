# Phase 14 - Continuous Deployment (CD) Pipeline using ArgoCD

## Objective

The objective of this phase is to automate the deployment of application updates into the Google Kubernetes Engine (GKE) cluster using GitOps principles.

Instead of directly deploying from Jenkins to Kubernetes, Jenkins updates the Kubernetes deployment repository with the latest Docker image tag. ArgoCD continuously monitors this Git repository and automatically synchronizes any changes to the Kubernetes cluster.

This approach provides version-controlled, auditable, and automated deployments.

---

# GitOps Workflow

```

Developer
│
│ Push Code
▼
GitHub Application Repository
│
▼
Jenkins CI Pipeline
│
├── Build Docker Image
├── Push Image to Artifact Registry
└── Update Helm values.yaml
        │
        ▼
GitHub Kubernetes Repository
        │
        ▼
ArgoCD
        │
        ▼
Google Kubernetes Engine
        │
        ▼
Updated Application

```

---

# Continuous Deployment Architecture

```

                 Jenkins

                    │

                    ▼

     Update Helm values.yaml

                    │

                    ▼

      GitHub Kubernetes Repository

                    │

         Git Commit & Git Push

                    │

                    ▼

               ArgoCD

                    │

         Detect Repository Changes

                    │

                    ▼

          Synchronize Application

                    │

                    ▼

             Google Kubernetes Engine

                    │

                    ▼

           Updated Application Running

```

---

# Tools Used

| Tool | Purpose |
|-------|----------|
| Jenkins | Continuous Integration |
| GitHub | Kubernetes Manifest Repository |
| Helm | Kubernetes Configuration |
| ArgoCD | GitOps Deployment |
| Google Kubernetes Engine | Kubernetes Cluster |
| Google Artifact Registry | Docker Image Storage |

---

# Deployment Strategy

The deployment process follows GitOps principles.

Instead of Jenkins running:

```
kubectl apply
```

Jenkins only modifies the Kubernetes configuration stored in Git.

ArgoCD becomes the only deployment engine responsible for applying changes to the cluster.

Benefits

- Git becomes the source of truth
- Easy rollback
- Complete deployment history
- Better security
- Auditable deployments

---

# Stage 1 - Checkout Kubernetes Repository

Purpose

Clone the Kubernetes deployment repository.

Example

```
git clone https://github.com/<username>/gcp-test-k8s.git
```

Result

Latest deployment manifests become available for modification.

---

# Stage 2 - Update Helm values.yaml

Purpose

Replace the old Docker image with the newly built image.

Example

Before

```
image:

us-central1-docker.pkg.dev/project/docker-repo/hello:1.0.20
```

After

```
image:

us-central1-docker.pkg.dev/project/docker-repo/hello:1.0.21
```

This ensures Kubernetes deploys the latest application version.

---

# Stage 3 - Commit Changes

Purpose

Commit the updated Helm configuration.

Example

```
git add .

git commit -m "Updated Docker image to version 1.0.21"
```

---

# Stage 4 - Push Changes

Purpose

Push the updated manifests back to GitHub.

Example

```
git push origin main
```

Result

GitHub now contains the latest Kubernetes configuration.

---

# Stage 5 - ArgoCD Detects Changes

ArgoCD continuously monitors the Kubernetes repository.

When it detects a Git commit, it automatically starts synchronization.

Process

```
Git Repository Updated

↓

ArgoCD Detects Changes

↓

Manifest Comparison

↓

Synchronization

↓

Deployment Updated
```

---

# Stage 6 - Kubernetes Deployment

ArgoCD updates

- Deployment
- ReplicaSet
- Pods

Old Pods

↓

Terminated

↓

New Pods Created

↓

Application Updated

---

# Stage 7 - Verify Deployment

Commands

```
kubectl get pods

kubectl get deployments

kubectl get svc

kubectl get ingress
```

Verify

```
READY Pods

Running

Latest Image

Healthy Deployment
```

---

# Verify Docker Image

```
kubectl describe deployment hello-app
```

Verify

```
Image:

us-central1-docker.pkg.dev/project/docker-repo/hello:1.0.21
```

---

# Verify ArgoCD

Open ArgoCD Dashboard

Expected Status

```
Healthy

Synced
```

Application Tree

```
Application

↓

Deployment

↓

ReplicaSet

↓

Pods

↓

Service

↓

Ingress
```

---

# Continuous Deployment Flow

```
Git Push

↓

Jenkins CI

↓

Docker Build

↓

Artifact Registry

↓

Update values.yaml

↓

GitHub

↓

ArgoCD Sync

↓

Deploy to GKE

↓

Application Updated
```

---

# Advantages of GitOps

- Declarative deployments
- Version-controlled infrastructure
- Automatic synchronization
- Easy rollback
- Centralized configuration
- Secure deployment process
- Complete audit trail

---

# Deliverables

Successfully implemented

- GitOps Workflow
- Kubernetes Manifest Repository
- Helm Configuration
- Automated Image Update
- Git Commit Automation
- ArgoCD Synchronization
- Automatic Kubernetes Deployment

---

# Outcome

✔ Continuous Deployment Implemented

✔ GitOps Successfully Configured

✔ Automatic Deployment to GKE

✔ Version-Controlled Infrastructure

✔ Fully Automated End-to-End DevSecOps Pipeline

---

# Screenshots

Add the following screenshots:

- Kubernetes Repository
- Jenkins CD Stage
- Updated values.yaml
- Git Commit
- GitHub Commit History
- ArgoCD Dashboard
- ArgoCD Application Tree
- ArgoCD Sync Status
- Kubernetes Pods
- Kubernetes Deployment
- Kubernetes Service
- Kubernetes Ingress
- Final Application Running