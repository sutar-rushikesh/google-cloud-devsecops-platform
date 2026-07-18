# Phase 03 - Google Compute Engine (Jenkins VM) Creation

---

# Objective

In this phase, we provision a Google Compute Engine (GCE) Virtual Machine that serves as the central automation server for our DevSecOps platform.

This VM will host all required DevOps tools including Jenkins, Docker, Google Cloud SDK, Terraform, kubectl, Trivy, Git, and other utilities used throughout the CI/CD pipeline.

---

# Why Compute Engine?

Google Compute Engine provides secure, scalable virtual machines that can be configured with custom software stacks.

Instead of relying on managed CI services, we will build our own Jenkins server to simulate a real-world enterprise DevSecOps environment.

---

# Architecture

```

Google Cloud Platform

│

▼

Compute Engine

│

▼

Ubuntu VM

│

├── Jenkins

├── Docker

├── Terraform

├── Git

├── kubectl

├── Trivy

├── Google Cloud SDK

└── Sonar Scanner

```

---

# VM Specifications

| Property | Value |
|-----------|-------|
| Cloud Provider | Google Cloud Platform |
| Service | Compute Engine |
| Operating System | Ubuntu 22.04 LTS |
| Machine Type | e2-standard-2 *(or your chosen machine type)* |
| Region | us-central1 |
| Zone | us-central1-a |
| Boot Disk | 30 GB SSD |
| Network | Default VPC |
| External IP | Ephemeral Static IP |

---

# Step 1 – Navigate to Compute Engine

Open

```
Google Cloud Console

↓

Compute Engine

↓

VM Instances
```

---

# Step 2 – Create Virtual Machine

Click

```
Create Instance
```

Configure the VM.

Example

```
Name

jenkins-vm
```

Region

```
us-central1
```

Zone

```
us-central1-a
```

Machine

```
e2-standard-2
```

Operating System

```
Ubuntu 22.04 LTS
```

Disk

```
30 GB SSD
```

Firewall

```
✓ Allow HTTP

✓ Allow HTTPS
```

---

# Step 3 – Review Configuration

Verify

- Machine Type
- CPU
- Memory
- Disk Size
- Region
- Firewall Rules

Click

```
Create
```

---

# Step 4 – Connect to VM

Use SSH from Google Cloud Console

OR

Use terminal

```bash
gcloud compute ssh jenkins-vm --zone us-central1-a
```

---

# Step 5 – Verify Operating System

```bash
cat /etc/os-release
```

Expected

```
Ubuntu 22.04 LTS
```

---

# Step 6 – Update Packages

```bash
sudo apt update

sudo apt upgrade -y
```

---

# Step 7 – Install Basic Utilities

```bash
sudo apt install -y \
curl \
wget \
git \
vim \
zip \
unzip \
jq \
net-tools \
tree
```

---

# Step 8 – Verify Installation

```bash
git --version

curl --version

tree --version
```

---

# Step 9 – Configure Timezone (Optional)

```bash
timedatectl
```

Change timezone if required.

```bash
sudo timedatectl set-timezone Asia/Kolkata
```

---

# Step 10 – Create Project Workspace

```bash
mkdir ~/projects

cd ~/projects
```

---

# Step 11 – Verify Network Connectivity

```bash
ping google.com
```

Verify internet access.

---

# Step 12 – Verify Disk

```bash
df -h
```

---

# Step 13 – Verify Memory

```bash
free -h
```

---

# Step 14 – Verify CPU

```bash
lscpu
```

---

# Step 15 – Verify Firewall

Ensure the VM has

```
HTTP

HTTPS
```

enabled.

---

# Ports Required

| Service | Port |
|----------|------|
| SSH | 22 |
| HTTP | 80 |
| HTTPS | 443 |
| Jenkins | 8080 |
| SonarQube | 9000 |
| Grafana | 3000 |
| Prometheus | 9090 |
| ArgoCD | 8080 / LoadBalancer |
| Kubernetes API | Managed by GKE |

---

# Validation Checklist

- VM Created
- SSH Working
- Ubuntu Installed
- Internet Connectivity Available
- System Updated
- Basic Utilities Installed
- Workspace Created

---

# Commands Used

```bash
gcloud compute ssh jenkins-vm --zone us-central1-a

sudo apt update

sudo apt upgrade -y

sudo apt install -y \
curl \
wget \
git \
vim \
zip \
unzip \
jq \
net-tools \
tree

cat /etc/os-release

df -h

free -h

lscpu

timedatectl

ping google.com
```

---

# Outcome

At the end of this phase, we have a fully operational Ubuntu virtual machine running on Google Compute Engine.

This VM will be used as the centralized DevSecOps server for the remainder of the project.

The server is now ready for installing Jenkins, Docker, Terraform, Google Cloud SDK, Trivy, and other DevOps tools.

---

# Next Phase

➡ **Phase 04 – Jenkins Installation & Configuration**

```
docs/phase-04-jenkins/
```