# Phase 11 - Kubernetes Monitoring using Prometheus & Grafana

## Objective

Monitoring is one of the most critical components of a production-grade DevSecOps platform.

In this phase, Prometheus and Grafana are deployed on Google Kubernetes Engine (GKE) to provide complete observability of the Kubernetes cluster and deployed applications.

Prometheus collects metrics from Kubernetes resources, while Grafana visualizes those metrics through interactive dashboards.

---

# Why Monitoring?

Without monitoring, it is impossible to know:

- Application health
- CPU usage
- Memory consumption
- Pod failures
- Node health
- Network traffic
- Storage utilization
- Cluster performance

Monitoring enables proactive issue detection before users are impacted.

---

# Why Prometheus?

Prometheus is an open-source monitoring and alerting toolkit.

Features:

- Time-series database
- Powerful query language (PromQL)
- Service discovery
- Kubernetes-native integration
- Alert Manager support
- Exporters for various services

---

# Why Grafana?

Grafana is a visualization platform that connects to Prometheus and displays metrics using dashboards.

Features:

- Interactive dashboards
- Real-time monitoring
- Alerting
- Custom dashboards
- Multiple data sources
- Role-based access

---

# Monitoring Architecture

```
                   Kubernetes Cluster
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
      Nodes              Pods             Services
        │                  │                  │
        └──────────────┬──────────────────────┘
                       ▼
                  Prometheus Server
                       │
               Stores Metrics Database
                       │
                       ▼
                   Grafana Server
                       │
                       ▼
                 Monitoring Dashboard
```

---

# Prerequisites

Before starting:

- GKE Cluster running
- kubectl configured
- Helm installed
- Cluster administrator access

---

# Install Helm

Verify installation

```bash
helm version
```

---

# Add Helm Repository

```bash
helm repo add prometheus-community \
https://prometheus-community.github.io/helm-charts
```

Update repositories

```bash
helm repo update
```

---

# Create Monitoring Namespace

```bash
kubectl create namespace monitoring
```

---

# Install kube-prometheus-stack

```bash
helm install monitoring \
prometheus-community/kube-prometheus-stack \
-n monitoring
```

This installs:

- Prometheus
- Grafana
- AlertManager
- Node Exporter
- kube-state-metrics
- Prometheus Operator

---

# Verify Installation

```bash
kubectl get pods -n monitoring
```

Example

```
NAME

prometheus-server

Running

grafana

Running

alertmanager

Running

node-exporter

Running
```

---

# Verify Services

```bash
kubectl get svc -n monitoring
```

---

# Expose Grafana

```bash
kubectl patch svc monitoring-grafana \
-n monitoring \
-p '{"spec":{"type":"LoadBalancer"}}'
```

Verify

```bash
kubectl get svc -n monitoring
```

---

# Get Grafana Password

```bash
kubectl get secret monitoring-grafana \
-n monitoring \
-o jsonpath="{.data.admin-password}" | base64 -d
```

---

# Login

URL

```
http://<LoadBalancer-IP>
```

Username

```
admin
```

Password

```
<Generated Password>
```

---

# Prometheus Dashboard

Expose Prometheus

```bash
kubectl patch svc monitoring-kube-prometheus-prometheus \
-n monitoring \
-p '{"spec":{"type":"LoadBalancer"}}'
```

---

# Verify Targets

Inside Prometheus

```
Status

↓

Targets
```

All Kubernetes components should be UP.

---

# Grafana Dashboards

Recommended Dashboards

### Kubernetes Cluster Monitoring

ID

```
315
```

---

### Node Exporter Dashboard

ID

```
1860
```

---

### Kubernetes Pods

ID

```
6417
```

---

### Kubernetes Resource Usage

ID

```
7249
```

---

# Metrics Monitored

Cluster Metrics

- CPU Usage
- Memory Usage
- Disk Usage
- Network Traffic

---

Node Metrics

- CPU
- RAM
- Disk
- Load Average

---

Pod Metrics

- Restart Count
- CPU Usage
- Memory Usage
- Pod Status

---

Container Metrics

- CPU
- Memory
- Image Usage
- Restart Count

---

Application Metrics

- Availability
- Response Time
- Resource Consumption

---

# Useful Commands

Pods

```bash
kubectl get pods -n monitoring
```

Services

```bash
kubectl get svc -n monitoring
```

Deployments

```bash
kubectl get deploy -n monitoring
```

Secrets

```bash
kubectl get secrets -n monitoring
```

Helm Releases

```bash
helm list -n monitoring
```

---

# Upgrade Monitoring Stack

```bash
helm upgrade monitoring \
prometheus-community/kube-prometheus-stack \
-n monitoring
```

---

# Remove Monitoring Stack

```bash
helm uninstall monitoring \
-n monitoring
```

---

# Challenges Faced

## Grafana Not Accessible

Issue

```
Unable to access Grafana UI
```

Resolution

Changed the service type to LoadBalancer and verified firewall rules.

---

## Prometheus Targets Down

Issue

```
Targets showing DOWN
```

Resolution

Verified Prometheus Operator and node-exporter pods were running.

---

## Dashboard Showing No Data

Issue

Dashboards loaded but displayed no metrics.

Resolution

Verified Prometheus was configured as the Grafana data source and all scrape targets were healthy.

---

## Helm Installation Failed

Issue

Chart installation failed.

Resolution

Updated Helm repositories before installing the monitoring stack.

---

# Best Practices

- Deploy monitoring in a dedicated namespace
- Restrict dashboard access using authentication
- Enable HTTPS for Grafana
- Regularly update Helm charts
- Monitor both cluster and application metrics
- Configure alerting for production workloads

---

# Learning Outcomes

After completing this phase I learned:

- Kubernetes Monitoring
- Prometheus Architecture
- Grafana Dashboards
- Helm Chart Deployment
- Metrics Collection
- Cluster Observability
- Node Monitoring
- Pod Monitoring
- Kubernetes Health Monitoring

---

# Screenshots

Store screenshots in:

```
screenshots/
└── phase-11-monitoring/
```

Recommended screenshots:

- Helm repository added
- Monitoring namespace
- Helm installation
- Prometheus pods
- Grafana pods
- Services
- Grafana login page
- Grafana dashboard
- Prometheus targets
- Node Exporter dashboard
- Kubernetes dashboard
- Resource utilization graphs