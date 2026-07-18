# Phase 05 - SonarQube Installation & Configuration

---

# Objective

In this phase, we install and configure SonarQube as the Static Application Security Testing (SAST) platform for our DevSecOps pipeline.

SonarQube continuously analyzes source code to detect bugs, vulnerabilities, security hotspots, code smells, and maintainability issues before the application is deployed.

The Jenkins CI pipeline integrates with SonarQube to automatically perform code quality analysis on every build.

---

# Why SonarQube?

SonarQube is one of the most widely used code quality platforms in enterprise DevSecOps environments.

It provides:

- Static Code Analysis
- Code Smells Detection
- Bug Detection
- Vulnerability Detection
- Security Hotspots
- Code Coverage
- Maintainability Rating
- Technical Debt Analysis
- Quality Gates

---

# Architecture

```

Developer

↓

GitHub

↓

Jenkins

↓

SonarQube Scanner

↓

SonarQube Server

↓

Quality Gate

↓

Continue / Stop Pipeline

```

---

# Prerequisites

Before installing SonarQube:

- Ubuntu VM Running
- Jenkins Installed
- Java 21 Installed
- Docker Installed
- Internet Connectivity Available

---

# SonarQube Deployment Method

In this project, SonarQube is deployed using Docker.

Advantages:

- Lightweight
- Easy Upgrade
- Easy Backup
- Containerized Deployment
- Production Friendly

---

# Step 1 – Pull SonarQube Image

```bash
docker pull sonarqube:lts-community
```

---

# Step 2 – Create Docker Network

```bash
docker network create sonar-network
```

---

# Step 3 – Run SonarQube Container

```bash
docker run -d \
--name sonarqube \
--network sonar-network \
-p 9000:9000 \
sonarqube:lts-community
```

---

# Step 4 – Verify Container

```bash
docker ps
```

Expected Output

```
sonarqube
```

---

# Step 5 – Access SonarQube

Open

```
http://VM_EXTERNAL_IP:9000
```

Example

```
http://34.xxx.xxx.xxx:9000
```

---

# Step 6 – Default Login

Username

```
admin
```

Password

```
admin
```

You will be prompted to change the password after the first login.

---

# Step 7 – Create Project

Navigate to:

```
Projects

↓

Create Project
```

Example

```
Project Name

app
```

Project Key

```
app
```

---

# Step 8 – Generate Authentication Token

Navigate to:

```
My Account

↓

Security

↓

Generate Token
```

Example

```
Sonar-token
```

Copy and securely store the generated token.

---

# Step 9 – Configure SonarQube in Jenkins

Navigate to:

```
Manage Jenkins

↓

System

↓

SonarQube Servers
```

Configure:

| Setting | Value |
|----------|-------|
| Name | sonar-server |
| Server URL | http://<VM-IP>:9000 |
| Authentication Token | Sonar-token |

Save the configuration.

---

# Step 10 – Configure Sonar Scanner

Navigate to:

```
Manage Jenkins

↓

Tools

↓

SonarQube Scanner
```

Configure:

```
Name

sonar-scanner
```

Enable

```
Install Automatically
```

---

# Step 11 – Configure Webhook

Navigate to:

```
Administration

↓

Configuration

↓

Webhooks
```

Add Webhook

```
Name

Jenkins
```

URL

```
http://<JENKINS-IP>:8080/sonarqube-webhook/
```

Save.

---

# Step 12 – Pipeline Integration

Example Jenkins Pipeline

```groovy
stage('SonarQube Analysis') {

    steps {

        withSonarQubeEnv('sonar-server') {

            sh """

            ${SCANNER_HOME}/bin/sonar-scanner \
            -Dsonar.projectName=app \
            -Dsonar.projectKey=app

            """

        }

    }

}
```

---

# Step 13 – Quality Gate

Add Quality Gate stage.

```groovy
stage('Quality Gate') {

    steps {

        waitForQualityGate abortPipeline: false,
        credentialsId: 'Sonar-token'

    }

}
```

Pipeline Flow

```
Build

↓

Scan Code

↓

Upload Report

↓

Quality Gate

↓

Pass

↓

Continue Pipeline
```

---

# SonarQube Dashboard

The dashboard provides:

- Reliability Rating
- Security Rating
- Maintainability Rating
- Duplicated Code
- Bugs
- Vulnerabilities
- Security Hotspots
- Code Coverage

---

# Validation Checklist

- SonarQube Installed
- Container Running
- Dashboard Accessible
- Project Created
- Token Generated
- Jenkins Connected
- Sonar Scanner Installed
- Webhook Configured
- Pipeline Successfully Scanned
- Quality Gate Passed

---

# Useful Commands

Pull Image

```bash
docker pull sonarqube:lts-community
```

Run Container

```bash
docker run -d \
--name sonarqube \
-p 9000:9000 \
sonarqube:lts-community
```

Check Container

```bash
docker ps
```

Logs

```bash
docker logs sonarqube
```

Restart

```bash
docker restart sonarqube
```

Stop

```bash
docker stop sonarqube
```

---

# Common Issues

## SonarQube Not Accessible

Verify:

```bash
docker ps
```

Check port:

```bash
9000
```

---

## Jenkins Cannot Connect

Verify:

- Server URL
- Firewall Rule
- Sonar Token
- Jenkins Configuration

---

## Quality Gate Waiting Forever

Verify:

Webhook URL

```
http://JENKINS-IP:8080/sonarqube-webhook/
```

---

## Invalid Token

Generate a new token and update Jenkins credentials.

---

# Outcome

After completing this phase:

- SonarQube is deployed
- Jenkins communicates with SonarQube
- Static Code Analysis is automated
- Quality Gates are enforced
- Code quality reports are generated on every pipeline execution

This ensures that only high-quality and secure code progresses further in the CI/CD pipeline.

---

# Next Phase

➡ **Phase 06 – Trivy Installation & Security Scanning**

```
docs/phase-06-trivy/
```