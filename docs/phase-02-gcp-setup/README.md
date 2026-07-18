# Phase 02 - Google Cloud Platform Setup

---

# Objective

In this phase, we prepare the Google Cloud Platform environment that will host our complete DevSecOps platform.

A dedicated GCP project is created, billing is enabled, required APIs are activated, networking is prepared, and the Artifact Registry is configured for storing Docker images.

---

# Architecture

```

Local Machine

↓

Google Cloud Platform

↓

Project Creation

↓

Enable Billing

↓

Enable APIs

↓

Create Artifact Registry

↓

Ready for Infrastructure Deployment

```

---

# Prerequisites

Before starting this phase, ensure you have:

- Google Account
- Billing Account
- Internet Connection
- Git Installed
- Google Cloud SDK Installed

---

# Step 1 – Create a Google Cloud Account

1. Visit

```
https://console.cloud.google.com
```

2. Sign in using your Google account.

3. Accept Terms and Conditions.

4. Complete initial setup.

---

# Step 2 – Create a New Project

Navigate to

```
Google Cloud Console
→ Select Project
→ New Project
```

Example

```
Project Name

google-cloud-devsecops-platform
```

Wait until the project is created successfully.

---

# Step 3 – Enable Billing

Navigate to

```
Billing
```

Attach your billing account to the project.

Verify

```
Billing Status

Active
```

---

# Step 4 – Install Google Cloud SDK

Verify installation.

```bash
gcloud version
```

Example

```bash
Google Cloud SDK 540.x.x
```

---

# Step 5 – Login to Google Cloud

```bash
gcloud auth login
```

This opens a browser for authentication.

Verify

```bash
gcloud auth list
```

---

# Step 6 – Set Active Project

```bash
gcloud config set project PROJECT_ID
```

Example

```bash
gcloud config set project google-cloud-devsecops-platform
```

Verify

```bash
gcloud config get-value project
```

---

# Step 7 – Enable Required APIs

Enable Compute Engine API

```bash
gcloud services enable compute.googleapis.com
```

Enable Kubernetes Engine API

```bash
gcloud services enable container.googleapis.com
```

Enable Artifact Registry

```bash
gcloud services enable artifactregistry.googleapis.com
```

Enable IAM API

```bash
gcloud services enable iam.googleapis.com
```

Enable Cloud Resource Manager API

```bash
gcloud services enable cloudresourcemanager.googleapis.com
```

---

# Step 8 – Verify Enabled APIs

```bash
gcloud services list --enabled
```

Verify that the following services are enabled.

- Compute Engine
- Kubernetes Engine
- IAM
- Artifact Registry
- Cloud Resource Manager

---

# Step 9 – Create Artifact Registry Repository

Example

```bash
gcloud artifacts repositories create docker-repo \
--repository-format=docker \
--location=us-central1
```

---

# Step 10 – Verify Repository

```bash
gcloud artifacts repositories list --location=us-central1
```

Expected Output

```
docker-repo
```

---

# Step 11 – Configure Docker Authentication

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

# Step 12 – Verify Authentication

Docker configuration file

```
~/.docker/config.json
```

Should contain

```
credHelpers
```

for Artifact Registry.

---

# Validation Checklist

- Google Cloud Project Created
- Billing Enabled
- Google Cloud SDK Installed
- Login Successful
- Project Selected
- APIs Enabled
- Artifact Registry Created
- Docker Authentication Configured

---

# Commands Used

```bash
gcloud version

gcloud auth login

gcloud auth list

gcloud config set project PROJECT_ID

gcloud config get-value project

gcloud services enable compute.googleapis.com

gcloud services enable container.googleapis.com

gcloud services enable artifactregistry.googleapis.com

gcloud services enable iam.googleapis.com

gcloud services enable cloudresourcemanager.googleapis.com

gcloud services list --enabled

gcloud artifacts repositories create docker-repo \
--repository-format=docker \
--location=us-central1

gcloud artifacts repositories list --location=us-central1

gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

# Outcome

After completing this phase, the Google Cloud Platform environment is fully prepared for infrastructure deployment.

The project now has:

- Active Billing
- Required APIs Enabled
- Docker Artifact Registry
- Docker Authentication Configured

This environment is now ready for provisioning infrastructure using Terraform.

---

# Next Phase

➡ **Phase 03 – Virtual Machine Creation using Terraform**

```
docs/phase-03-vm-creation/
```