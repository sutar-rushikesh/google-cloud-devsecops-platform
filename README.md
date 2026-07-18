<div align="center">

# 🚀 Google Cloud DevSecOps Platform

### End-to-End Enterprise DevSecOps Platform on Google Cloud Platform (GCP)

<p align="center">

CI • CD • Docker • Kubernetes • GKE • Jenkins • SonarQube • Trivy • Artifact Registry • ArgoCD • Prometheus • Grafana • NGINX Ingress • TLS/SSL • Terraform

</p>

<img src="./application/profile.jpeg" width="180" style="border-radius:50%" alt="Rushikesh Sutar">

### 👨‍💻 Created by Rushikesh Sutar

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rushikesh%20Sutar-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/devopswithrushikesh)

[![GitHub](https://img.shields.io/badge/GitHub-sutar--rushikesh-black?style=for-the-badge&logo=github)](https://github.com/sutar-rushikesh)

</div>

---

# 📌 Project Overview

This repository demonstrates the complete implementation of an **Enterprise-grade DevSecOps Platform** deployed on **Google Cloud Platform (GCP)** using modern cloud-native technologies.

The project starts from infrastructure provisioning and continues through secure CI/CD automation, Kubernetes deployment, GitOps, monitoring, observability, ingress management, and HTTPS security.

The objective of this project is to simulate a real-world enterprise DevSecOps workflow used by modern software organizations.

<img width="1983" height="793" alt="Futuristic DevSecOps platform on Google Cloud" src="https://github.com/user-attachments/assets/89231019-bb3d-42bb-b3dc-b90b43ab879d" />

---

# 🎯 Project Objectives

- Provision infrastructure using Terraform
- Build Google Kubernetes Engine (GKE)
- Configure Jenkins CI Server
- Perform Static Code Analysis using SonarQube
- Scan vulnerabilities using Trivy
- Store Docker images in Artifact Registry
- Deploy applications to Kubernetes
- Implement GitOps using ArgoCD
- Configure Monitoring using Prometheus
- Configure Dashboards using Grafana
- Secure application using NGINX Ingress
- Enable HTTPS using TLS Certificates
- Build a complete Production-style CI/CD Pipeline

---

# 🏗 High Level Architecture

```

Developer
│
▼
GitHub Repository
│
▼
Jenkins CI Pipeline
│
├── Source Checkout
├── Trivy Filesystem Scan
├── SonarQube Analysis
├── Quality Gate
├── Docker Build
├── Push to Artifact Registry
│
▼
GitHub GitOps Repository
│
▼
ArgoCD
│
▼
Google Kubernetes Engine (GKE)
│
├── Deployment
├── Service
├── Ingress
│
▼
NGINX Ingress Controller
│
▼
HTTPS Application

Monitoring

Prometheus
↓
Grafana Dashboard

```

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|--------------|
| Cloud | Google Cloud Platform |
| Infrastructure | Terraform |
| Compute | Google Compute Engine |
| Kubernetes | Google Kubernetes Engine |
| CI | Jenkins |
| CD | ArgoCD |
| Container | Docker |
| Registry | Artifact Registry |
| Security | Trivy |
| Code Quality | SonarQube |
| Monitoring | Prometheus |
| Dashboard | Grafana |
| Ingress | NGINX Ingress Controller |
| SSL | TLS Certificates |
| Source Control | Git & GitHub |

---

# 📂 Repository Structure

```

google-cloud-devsecops-platform/

├── application/
├── terraform/
├── jenkins/
├── docs/
├── screenshots/
├── assets/
└── README.md

```

---

# 📖 Implementation Phases

| Phase | Description |
|--------|-------------|
| Phase 01 | Project Planning & Prerequisites |
| Phase 02 | Google Cloud Setup |
| Phase 03 | Virtual Machine Creation |
| Phase 04 | Jenkins Installation |
| Phase 05 | SonarQube Installation |
| Phase 06 | Trivy Installation |
| Phase 07 | Artifact Registry |
| Phase 08 | Docker Configuration |
| Phase 09 | Google Kubernetes Engine |
| Phase 10 | ArgoCD Setup |
| Phase 11 | Prometheus & Grafana |
| Phase 12 | Ingress & TLS |
| Phase 13 | Continuous Integration |
| Phase 14 | Continuous Deployment |
| Phase 15 | Final Architecture & Summary |

Every phase contains:

- Architecture
- Step-by-step implementation
- Commands
- Configuration
- Screenshots
- Troubleshooting
- Best Practices

---

# 📸 Project Screenshots

The repository includes screenshots for every implementation phase.

```

screenshots/

├── phase-01-prerequisites
├── phase-02-gcp
├── phase-03-vm
├── phase-04-jenkins
├── phase-05-sonarqube
├── phase-06-trivy
├── phase-07-artifact-registry
├── phase-08-docker
├── phase-09-gke
├── phase-10-argocd
├── phase-11-monitoring
├── phase-12-security
├── phase-13-pipeline
├── phase-14-application
└── phase-15-final-output

```

---

# 🔐 Security Features

- Static Code Analysis
- Vulnerability Scanning
- Docker Image Scanning
- GitOps Deployment
- TLS Encryption
- Kubernetes Best Practices
- Secure Artifact Registry
- Quality Gates

---

# 📊 Monitoring

The platform includes:

- Prometheus Metrics
- Grafana Dashboards
- Kubernetes Monitoring
- Node Monitoring
- Container Monitoring
- Application Health Monitoring

---

# 🚀 CI/CD Workflow

```

Developer

↓

GitHub Push

↓

Jenkins

↓

Trivy Scan

↓

SonarQube

↓

Quality Gate

↓

Docker Build

↓

Artifact Registry

↓

GitOps Repository

↓

ArgoCD

↓

Google Kubernetes Engine

↓

Application Live

```

---

# 📚 Documentation

Detailed documentation for every implementation phase is available inside:

```

docs/

```

Each document contains:

- Objective
- Architecture
- Implementation
- Commands
- Configuration
- Validation
- Screenshots
- Troubleshooting

---

# 👨‍💻 Author

## Rushikesh Sutar

Senior Software Engineer — DevSecOps | Cloud | Kubernetes | Terraform | AWS | GCP

### GitHub

https://github.com/sutar-rushikesh

### LinkedIn

https://www.linkedin.com/in/devopswithrushikesh

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork this repository

📢 Share it with the DevOps community

🤝 Connect with me on LinkedIn

---

<div align="center">

### Thank you for visiting this repository ❤️

**Happy Learning!**

</div>
