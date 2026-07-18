# Phase 01 - Project Planning & Prerequisites

---

# Objective

Before implementing the DevSecOps platform, it is important to identify the required tools, cloud resources, software, and accounts. This phase prepares the complete environment required to build an enterprise-grade CI/CD platform on Google Cloud Platform.

---

# Project Goal

Build an end-to-end Enterprise DevSecOps Platform that automates the complete Software Delivery Lifecycle.

The platform includes:

- Infrastructure as Code
- Continuous Integration
- Security Scanning
- Containerization
- Kubernetes Deployment
- GitOps
- Monitoring
- HTTPS Security
- Production-ready Architecture

---

# Final Architecture

```
Developer

        │

        ▼

GitHub Repository

        │

        ▼

Jenkins CI Pipeline

        │

 ┌──────┼─────────────┐
 │      │             │
 ▼      ▼             ▼

Trivy  SonarQube   Docker Build

        │

        ▼

Artifact Registry

        │

        ▼

GitOps Repository

        │

        ▼

ArgoCD

        │

        ▼

Google Kubernetes Engine

        │

        ▼

NGINX Ingress

        │

        ▼

HTTPS Application

        │

        ▼

Prometheus

        │

        ▼

Grafana Dashboard
```

---

# Technologies Used

| Category | Technology |
|------------|------------------------------|
| Cloud | Google Cloud Platform |
| Compute | Google Compute Engine |
| Container | Docker |
| Orchestration | Kubernetes (GKE) |
| CI | Jenkins |
| CD | ArgoCD |
| Registry | Artifact Registry |
| Security | Trivy |
| Code Quality | SonarQube |
| Infrastructure | Terraform |
| Monitoring | Prometheus |
| Dashboard | Grafana |
| Version Control | Git |
| Repository | GitHub |
| Web Server | NGINX |

---

# Skills Covered

This project demonstrates practical knowledge of:

- Google Cloud Platform
- Linux Administration
- Docker
- Kubernetes
- Jenkins
- Terraform
- GitHub
- GitOps
- DevSecOps
- Infrastructure as Code
- Continuous Integration
- Continuous Deployment
- Monitoring
- Observability
- TLS Security

---

# Software Requirements

Install the following software on your local machine.

| Software | Version |
|-----------|----------|
| Visual Studio Code | Latest |
| Git | Latest |
| Google Chrome | Latest |
| Docker Desktop (Optional) | Latest |
| Terraform | Latest |
| kubectl | Latest |
| Google Cloud SDK | Latest |

---

# Google Cloud Requirements

Create the following resources.

- Google Cloud Account
- Billing Account
- Google Cloud Project
- Compute Engine API
- Kubernetes Engine API
- Artifact Registry API
- IAM API
- Cloud Resource Manager API

---

# GitHub Repositories

This project uses two repositories.

## Repository 1

```
google-cloud-devsecops-platform
```

Purpose:

- Application Source Code
- Terraform
- Jenkinsfile
- Documentation

---

## Repository 2

```
google-cloud-devsecops-gitops
```

Purpose:

- Kubernetes Manifests
- Helm Values
- GitOps Deployment

---

# Project Folder Structure

```
google-cloud-devsecops-platform

│
├── application
├── terraform
├── jenkins
├── docs
├── assets
├── screenshots
└── README.md
```

---

# Google Cloud Services

The following services will be used throughout the project.

- Compute Engine
- Virtual Private Cloud
- Artifact Registry
- Kubernetes Engine
- IAM
- Cloud DNS
- Load Balancer

---

# Jenkins Plugins

The project requires the following Jenkins plugins.

- Git
- GitHub
- Docker
- Docker Pipeline
- Pipeline
- Pipeline Utility Steps
- Credentials Binding
- SonarQube Scanner
- OWASP Dependency Check
- Workspace Cleanup
- Kubernetes CLI
- SSH Agent
- Blue Ocean

---

# Security Tools

The following security tools are integrated.

- SonarQube
- Trivy
- Docker Security
- Kubernetes Security

---

# Monitoring Stack

The monitoring platform includes:

- Prometheus
- Grafana
- Kubernetes Metrics
- Node Exporter

---

# Networking Components

The platform includes:

- Load Balancer
- NGINX Ingress
- HTTPS
- TLS Certificates
- Domain Mapping

---

# Expected Deliverables

After completing this project you will have:

✅ Enterprise CI Pipeline

✅ Enterprise CD Pipeline

✅ Google Kubernetes Engine

✅ Docker Image Registry

✅ GitOps Deployment

✅ Monitoring Dashboard

✅ Production-ready Application

✅ HTTPS Enabled Application

---

# Learning Outcomes

After completing this project you will understand:

- Enterprise DevOps Workflow
- Enterprise DevSecOps Pipeline
- Infrastructure Automation
- Kubernetes Deployment
- GitOps
- Cloud Infrastructure
- Monitoring & Alerting
- Security Integration
- Production Deployment

---

# Screenshots

Store all screenshots for this phase inside:

```
screenshots/phase-01-prerequisites/
```

Suggested screenshots:

- Google Cloud Dashboard
- GitHub Repositories
- Local Development Environment
- VS Code
- Git Version
- Terraform Version
- Docker Version
- kubectl Version

---

# Next Phase

➡ Phase 02 — Google Cloud Platform Setup

```
docs/phase-02-gcp-setup
```