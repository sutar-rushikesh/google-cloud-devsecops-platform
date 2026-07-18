# Phase 06 - Trivy Security Scanning

## Objective

After setting up the CI environment and code quality analysis, the next step is integrating security scanning into the DevSecOps pipeline.

Trivy is an open-source security scanner developed by Aqua Security that scans:

- Filesystem
- Docker Images
- Operating System Packages
- Application Dependencies
- Secrets
- Infrastructure as Code

This ensures vulnerabilities are identified before container images are deployed into Kubernetes.

---

# Why Trivy?

Traditional CI/CD pipelines focus only on build and deployment.

A DevSecOps pipeline should also detect:

- Critical vulnerabilities
- High vulnerabilities
- Exposed secrets
- Misconfigurations

before deployment.

Trivy provides lightweight and fast vulnerability scanning.

---

# Architecture

```
GitHub
   │
   ▼
Jenkins Pipeline
   │
   ▼
Trivy Filesystem Scan
   │
   ▼
Trivy Docker Image Scan
   │
   ▼
Artifact Registry
```

---

# Installation

SSH into Jenkins VM

```bash
sudo apt update
```

Install Trivy

```bash
sudo apt install wget apt-transport-https gnupg lsb-release -y
```

Add Repository

```bash
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | \
gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
```

```bash
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] \
https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | \
sudo tee /etc/apt/sources.list.d/trivy.list
```

Update packages

```bash
sudo apt update
```

Install Trivy

```bash
sudo apt install trivy -y
```

Verify Installation

```bash
trivy --version
```

Example

```
Version: 0.xx.x
```

---

# Filesystem Scan

Scan current project

```bash
trivy fs .
```

Output

```
✔ Secrets Scan
✔ Vulnerability Scan
✔ Misconfiguration Scan
```

---

# Docker Image Scan

After Docker image build

```bash
trivy image hello:latest
```

or

```bash
trivy image us-central1-docker.pkg.dev/<PROJECT_ID>/docker-repo/hello:latest
```

Example

```
Target

hello:latest

Total Vulnerabilities

Critical : 0

High : 2

Medium : 5
```

---

# Jenkins Pipeline Integration

Filesystem Scan Stage

```groovy
stage('Scan Filesystem using Trivy') {
    steps {
        sh 'trivy fs .'
    }
}
```

Docker Image Scan

```groovy
stage('Scan Latest Docker Image using Trivy') {
    steps {
        sh """
        trivy image \
        us-central1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/docker-repo/hello:${IMAGE_TAG}
        """
    }
}
```

---

# Security Benefits

✔ Detects OS vulnerabilities

✔ Detects Package vulnerabilities

✔ Detects Application vulnerabilities

✔ Detects Secrets

✔ Detects Docker Image vulnerabilities

✔ Supports CI/CD Integration

---

# Common Commands

Filesystem Scan

```bash
trivy fs .
```

Image Scan

```bash
trivy image nginx:latest
```

Ignore unfixed vulnerabilities

```bash
trivy image --ignore-unfixed nginx:latest
```

Skip Secret Scan

```bash
trivy fs --scanners vuln .
```

Generate JSON Report

```bash
trivy image \
-f json \
-o report.json \
hello:latest
```

Generate HTML Report

```bash
trivy image \
-f table \
hello:latest
```

---

# Challenges Faced

## Large number of vulnerabilities

Many vulnerabilities were detected from the base Docker image.

Resolution:

- Reviewed severity levels
- Verified package versions
- Planned base image upgrades

---

## Slow scan

Secret scanning increased execution time.

Resolution

Filesystem scans were optimized for CI execution.

---

# Best Practices

- Scan every commit
- Scan Docker images before push
- Fail pipeline on Critical vulnerabilities
- Keep Trivy updated
- Use minimal Docker base images
- Regularly patch operating system packages

---

# Learning Outcomes

After completing this phase I learned:

- DevSecOps security scanning
- Filesystem vulnerability scanning
- Docker image scanning
- Secret detection
- CI security integration
- Vulnerability analysis
- Security-first deployment approach

---

# Screenshots

Add screenshots in

```
screenshots/
└── phase-06-trivy/
```

Suggested screenshots

- Trivy installation
- Trivy version
- Filesystem scan
- Docker image scan
- Jenkins successful execution
- Vulnerability report