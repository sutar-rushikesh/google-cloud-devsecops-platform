# Phase 09 - Google Kubernetes Engine (GKE)

## Objective

This phase focuses on provisioning a fully managed Kubernetes cluster using Google Kubernetes Engine (GKE).

The cluster serves as the deployment platform for the containerized application built in the previous phases. Infrastructure is provisioned using Terraform, enabling Infrastructure as Code (IaC) and repeatable deployments.

---

# Why GKE?

Google Kubernetes Engine (GKE) is Google's managed Kubernetes service that simplifies cluster management by handling:

- Kubernetes control plane
- Automatic upgrades
- Node management
- Security patches
- High availability
- Auto repair
- Auto scaling

Using GKE allows developers to focus on application deployment rather than cluster administration.

---

# Architecture

```
                GitHub
                   │
                   ▼
              Terraform
                   │
                   ▼
         Google Kubernetes Engine
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   Worker Node           Worker Node
        │                     │
        └──────────┬──────────┘
                   ▼
             Kubernetes Pods
```

---

# Prerequisites

Before creating the cluster, ensure the following:

- Google Cloud Project
- Billing Enabled
- Google Cloud SDK Installed
- Terraform Installed
- kubectl Installed
- Required APIs Enabled

---

# Enable Required APIs

Enable Kubernetes Engine API

```bash
gcloud services enable container.googleapis.com
```

Enable Compute Engine API

```bash
gcloud services enable compute.googleapis.com
```

Enable IAM API

```bash
gcloud services enable iam.googleapis.com
```

---

# Verify APIs

```bash
gcloud services list --enabled
```

---

# Terraform Project Structure

```
terraform/
└── gke-terraform/
    ├── provider.tf
    ├── main.tf
    └── variable.tf
```

---

# Terraform Provider

Example:

```terraform
provider "google" {
  project = var.project_id
  region  = var.region
}
```

---

# Cluster Configuration

The Terraform configuration creates:

- VPC Network
- Subnet
- GKE Cluster
- Node Pool

Key Features:

- Regional Cluster
- Auto Repair
- Auto Upgrade
- Autoscaling
- Managed Nodes

---

# Initialize Terraform

```bash
cd terraform/gke-terraform
```

```bash
terraform init
```

Expected Output

```
Terraform has been successfully initialized.
```

---

# Validate Configuration

```bash
terraform validate
```

---

# Review Execution Plan

```bash
terraform plan
```

---

# Create Infrastructure

```bash
terraform apply
```

Confirm with

```
yes
```

Terraform provisions:

- Kubernetes Cluster
- Node Pool
- Networking Components

---

# Verify Cluster

List clusters

```bash
gcloud container clusters list
```

Example

```
NAME

gke-cluster

LOCATION

us-central1
```

---

# Configure kubectl

Connect kubectl to the cluster.

```bash
gcloud container clusters get-credentials gke-cluster \
--region us-central1
```

---

# Verify Cluster Access

```bash
kubectl get nodes
```

Expected Output

```
NAME

STATUS

Ready
```

---

# Verify System Pods

```bash
kubectl get pods -A
```

You should see Kubernetes system components running successfully.

---

# Verify Cluster Information

```bash
kubectl cluster-info
```

Example

```
Kubernetes control plane is running
```

---

# Terraform Commands

Initialize

```bash
terraform init
```

Validate

```bash
terraform validate
```

Plan

```bash
terraform plan
```

Apply

```bash
terraform apply
```

Destroy

```bash
terraform destroy
```

---

# Jenkins Integration

Although Terraform was initially executed manually, the infrastructure can later be integrated into Jenkins pipelines.

Example:

```groovy
stage('Terraform Init') {
    steps {
        sh 'terraform init'
    }
}

stage('Terraform Apply') {
    steps {
        sh 'terraform apply -auto-approve'
    }
}
```

---

# Challenges Faced

## Authentication Failed

Issue

```
Unable to connect to GCP
```

Resolution

Configured the correct Google Cloud project and authenticated using the attached service account.

---

## Kubernetes API Not Enabled

Issue

```
API not enabled
```

Resolution

Enabled:

```bash
container.googleapis.com
```

---

## kubectl Connection Failed

Issue

```
The connection to the server was refused
```

Resolution

Retrieved cluster credentials using:

```bash
gcloud container clusters get-credentials
```

---

## Terraform Errors

Issue

Terraform validation failed due to configuration issues.

Resolution

Validated configuration before applying infrastructure changes.

---

# Security Best Practices

- Use Infrastructure as Code
- Enable private clusters for production
- Apply least privilege IAM roles
- Enable node auto repair
- Enable auto upgrade
- Store Terraform state securely
- Avoid hardcoding credentials

---

# Learning Outcomes

After completing this phase I learned:

- Google Kubernetes Engine
- Kubernetes Cluster Provisioning
- Infrastructure as Code
- Terraform for GCP
- kubectl Configuration
- Cluster Management
- Node Pool Configuration
- Kubernetes Networking Basics

---

# Screenshots

Store screenshots in:

```
screenshots/
└── phase-09-gke/
```

Recommended screenshots:

- Kubernetes API Enabled
- Terraform Init
- Terraform Plan
- Terraform Apply
- GKE Cluster Created
- Node Pool
- kubectl get nodes
- kubectl get pods -A
- Google Cloud Console Cluster View