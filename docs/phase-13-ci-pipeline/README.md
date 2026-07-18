# Phase 13 - Continuous Integration (CI) Pipeline with Jenkins

## Objective

In this phase, a complete Continuous Integration (CI) pipeline is implemented using Jenkins.

Whenever new code is pushed to the GitHub repository, Jenkins automates the software delivery process by performing code checkout, security scanning, static code analysis, Docker image creation, vulnerability scanning, and pushing the image to Google Artifact Registry.

This ensures every application build is validated, secure, and ready for deployment.

---

# CI Pipeline Workflow

```

Developer
│
│ Git Push
▼
GitHub Repository
│
▼
Jenkins Pipeline
│
├── Workspace Cleanup
├── Git Checkout
├── Configure Google Cloud
├── Trivy Filesystem Scan
├── SonarQube Analysis
├── Quality Gate Validation
├── Docker Build
├── Docker Image Push
├── Trivy Image Scan
└── Build Success

```

---

# CI Architecture

```

                GitHub

                   │

             Source Code

                   │

                   ▼

              Jenkins CI

                   │

     ┌─────────────┼─────────────┐

     ▼             ▼             ▼

 Trivy FS     SonarQube      Docker Build

     │             │             │

     └─────────────┼─────────────┘

                   ▼

         Artifact Registry

                   │

           Trivy Image Scan

                   │

                   ▼

          Ready for Deployment

```

---

# Tools Used

| Tool | Purpose |
|-------|----------|
| GitHub | Source Code Repository |
| Jenkins | CI Automation |
| SonarQube | Static Code Analysis |
| Trivy | Security Scanning |
| Docker | Containerization |
| Google Artifact Registry | Docker Image Repository |
| Google Cloud CLI | Authentication |

---

# Pipeline Stages

---

## Stage 1 - Clean Workspace

Purpose

Removes old workspace files before every build.

```
cleanWs()
```

Benefits

- Clean build environment
- No stale artifacts
- Avoid dependency conflicts

---

## Stage 2 - Git Checkout

Purpose

Downloads the latest source code from GitHub.

```
git branch: 'main'
```

Output

```
Repository cloned successfully
```

---

## Stage 3 - Configure Google Cloud

Purpose

Configure Google Cloud project and Docker authentication.

Commands

```
gcloud auth list

gcloud config set project PROJECT_ID

gcloud auth configure-docker us-central1-docker.pkg.dev
```

Result

Docker can now push images securely to Artifact Registry.

---

## Stage 4 - Trivy Filesystem Scan

Purpose

Scan the source code for:

- Secrets
- Vulnerabilities
- Misconfigurations

Command

```
trivy fs .
```

Example Output

```
No Critical Vulnerabilities Found
```

Benefits

- Detect secrets
- Scan Dockerfile
- Scan configuration files

---

## Stage 5 - SonarQube Static Code Analysis

Purpose

Perform code quality analysis.

Command

```
sonar-scanner \
-Dsonar.projectName=app \
-Dsonar.projectKey=app
```

Checks

- Bugs
- Vulnerabilities
- Code Smells
- Duplicated Code
- Maintainability
- Security Hotspots

Result

Project dashboard generated.

---

## Stage 6 - Quality Gate

Purpose

Verify the SonarQube Quality Gate before continuing.

Pipeline

```
waitForQualityGate()
```

Result

```
Quality Gate : PASSED
```

If failed

Pipeline stops automatically.

---

## Stage 7 - Docker Image Build

Purpose

Build the application Docker image.

Command

```
docker build -t hello:latest .
```

Output

```
Docker Image Built Successfully
```

---

## Stage 8 - Push Image to Artifact Registry

Purpose

Tag and push Docker image.

Commands

```
docker tag hello:latest \
us-central1-docker.pkg.dev/PROJECT_ID/docker-repo/hello:VERSION

docker push \
us-central1-docker.pkg.dev/PROJECT_ID/docker-repo/hello:VERSION
```

Also pushes

```
latest
```

Result

Images stored securely inside Google Artifact Registry.

---

## Stage 9 - Trivy Image Scan

Purpose

Scan the final Docker image.

Command

```
trivy image IMAGE_NAME
```

Checks

- OS Packages
- CVEs
- Base Image Vulnerabilities
- Libraries

Result

Security report generated.

---

# Jenkins Pipeline Flow

```
Start

↓

Clean Workspace

↓

Checkout Source Code

↓

Configure Google Cloud

↓

Filesystem Security Scan

↓

SonarQube Analysis

↓

Quality Gate

↓

Docker Build

↓

Push Docker Image

↓

Image Vulnerability Scan

↓

Pipeline Completed Successfully
```

---

# Security Implemented

✔ Source Code Scan

✔ Secret Detection

✔ Docker Image Scan

✔ Static Code Analysis

✔ Quality Gate Validation

✔ Secure Artifact Storage

---

# Deliverables

Successfully implemented

- Jenkins Pipeline
- GitHub Integration
- SonarQube Analysis
- Trivy Filesystem Scan
- Docker Build
- Docker Image Push
- Artifact Registry Integration
- Docker Image Vulnerability Scan

---

# Outcome

✔ Fully Automated CI Pipeline

✔ Secure Code Validation

✔ Automated Docker Image Creation

✔ Automated Image Publishing

✔ Production-Ready Build Process

---

# Screenshots

Include the following screenshots:

- Jenkins Dashboard
- Jenkins Credentials
- Installed Plugins
- Pipeline Script
- Git Checkout Stage
- Trivy Filesystem Scan
- SonarQube Dashboard
- Quality Gate Passed
- Docker Build Logs
- Artifact Registry Images
- Trivy Image Scan
- Jenkins Pipeline Success
- Blue Ocean Pipeline (Optional)
- Console Output