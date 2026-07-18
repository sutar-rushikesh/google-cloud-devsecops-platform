# Phase 04 - Jenkins Installation & Configuration

---

# Objective

This phase focuses on installing and configuring Jenkins on the Google Compute Engine VM.

Jenkins serves as the Continuous Integration (CI) server responsible for automating the software delivery lifecycle. It orchestrates source code checkout, security scanning, code quality analysis, Docker image creation, Artifact Registry integration, and deployment automation.

---

# Why Jenkins?

Jenkins is one of the most widely adopted automation servers in enterprise DevOps environments.

In this project, Jenkins is responsible for:

- Continuous Integration (CI)
- Pipeline Automation
- Security Scanning
- Docker Image Build
- Artifact Registry Integration
- GitHub Integration
- SonarQube Analysis
- Trivy Scanning
- GitOps Automation

---

# Architecture

```

Developer

↓

GitHub

↓

Jenkins

├── Checkout Source Code
├── SonarQube Scan
├── Trivy Filesystem Scan
├── Docker Build
├── Push Docker Image
└── Update GitOps Repository

```

---

# Prerequisites

Before installing Jenkins, ensure:

- Ubuntu VM is running
- Internet connectivity is available
- User has sudo privileges
- Google Cloud SDK is installed
- Java 21 is installed

---

# Step 1 – Update Ubuntu Packages

```bash
sudo apt update

sudo apt upgrade -y
```

---

# Step 2 – Install Java

Jenkins requires Java.

Install OpenJDK 21.

```bash
sudo apt install openjdk-21-jdk -y
```

Verify installation.

```bash
java -version
```

Expected output

```
OpenJDK 21
```

---

# Step 3 – Install Jenkins

Import Jenkins Repository Key

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

Add Jenkins Repository

```bash
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | \
sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
```

Update Repository

```bash
sudo apt update
```

Install Jenkins

```bash
sudo apt install jenkins -y
```

---

# Step 4 – Enable Jenkins Service

```bash
sudo systemctl enable jenkins

sudo systemctl start jenkins
```

Verify status.

```bash
sudo systemctl status jenkins
```

Expected

```
Active (running)
```

---

# Step 5 – Configure Firewall

Allow Jenkins Port

```bash
8080
```

Google Cloud

```
VPC Network

↓

Firewall Rules

↓

Allow TCP 8080
```

---

# Step 6 – Access Jenkins

Open

```
http://VM_EXTERNAL_IP:8080
```

Example

```
http://34.xxx.xxx.xxx:8080
```

---

# Step 7 – Unlock Jenkins

Retrieve Administrator Password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Paste the password into the Jenkins UI.

---

# Step 8 – Install Suggested Plugins

Select

```
Install Suggested Plugins
```

Wait for installation to complete.

---

# Step 9 – Create Admin User

Configure

- Username
- Password
- Full Name
- Email Address

Save and continue.

---

# Step 10 – Configure Jenkins URL

Example

```
http://VM_EXTERNAL_IP:8080
```

Save.

---

# Step 11 – Install Required Plugins

Navigate

```
Manage Jenkins

↓

Plugins
```

Install the following plugins.

| Plugin | Purpose |
|----------|----------|
| Git | Source Code Checkout |
| GitHub | GitHub Integration |
| Pipeline | Jenkins Pipelines |
| Docker Pipeline | Docker Build |
| Credentials Binding | Secure Credentials |
| Workspace Cleanup | Clean Workspace |
| SonarQube Scanner | Code Analysis |
| OWASP Dependency Check | Dependency Scanning |
| Kubernetes CLI | kubectl Integration |
| Blue Ocean | Modern Pipeline UI |
| SSH Agent | SSH Authentication |

Restart Jenkins after plugin installation.

---

# Step 12 – Configure Global Tools

Navigate

```
Manage Jenkins

↓

Tools
```

Configure:

### Git

Auto Install

---

### JDK

Java 21

---

### Sonar Scanner

Name

```
sonar-scanner
```

Auto Install

---

### Docker

Verify Docker CLI is available.

---

### Trivy

Verify

```bash
trivy --version
```

---

# Step 13 – Configure Credentials

Navigate

```
Manage Jenkins

↓

Credentials

↓

Global
```

Create credentials for:

| Credential | Type |
|------------|------|
| GitHub Token | Username with Password |
| Sonar Token | Secret Text |
| GCP Project ID | Secret Text (if required) |
| SSH Keys | SSH Username with Private Key |

> **Note:** This project authenticates to Google Cloud using the Compute Engine attached Service Account, so a JSON key is **not** required.

---

# Step 14 – Verify Jenkins

Create a simple Pipeline Job.

Example

```groovy
pipeline {

    agent any

    stages {

        stage('Hello') {

            steps {

                echo 'Jenkins is Working Successfully'

            }

        }

    }

}
```

Build the pipeline.

Expected

```
SUCCESS
```

---

# Jenkins Directory Structure

```
/var/lib/jenkins

├── jobs
├── workspace
├── plugins
├── tools
├── users
└── secrets
```

---

# Validation Checklist

- Java Installed
- Jenkins Installed
- Jenkins Service Running
- Firewall Configured
- Jenkins Accessible
- Plugins Installed
- Admin User Created
- Global Tools Configured
- Credentials Configured
- Sample Pipeline Executed

---

# Common Troubleshooting

### Jenkins UI Not Accessible

Check

```bash
sudo systemctl status jenkins
```

Verify firewall allows port **8080**.

---

### Java Error

Verify

```bash
java -version
```

---

### Service Failed

Check logs

```bash
sudo journalctl -u jenkins
```

---

### Jenkins Password

Retrieve again

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

### Permission Issues

Verify Jenkins user

```bash
id jenkins
```

---

# Commands Used

```bash
sudo apt update

sudo apt install openjdk-21-jdk -y

java -version

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

sudo apt install jenkins -y

sudo systemctl enable jenkins

sudo systemctl start jenkins

sudo systemctl status jenkins

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

trivy --version

id jenkins
```

---

# Outcome

At the end of this phase:

- Jenkins is installed
- Jenkins service is running
- Required plugins are installed
- Global tools are configured
- Credentials are configured
- Jenkins is ready to execute CI/CD pipelines

The platform is now prepared for integrating SonarQube and implementing automated code quality analysis.

---

# Next Phase

➡ **Phase 05 – SonarQube Installation & Configuration**

```
docs/phase-05-sonarqube/
```