# Phase 12 - Kubernetes Ingress with SSL/TLS

## Objective

In this phase, we expose the application running inside Google Kubernetes Engine (GKE) using Kubernetes Ingress. Instead of accessing the application through a LoadBalancer service, an Ingress Controller manages external traffic routing.

To provide secure HTTPS communication, SSL/TLS is configured so that all traffic between the client and the application is encrypted.

---

# Architecture

```
                    Internet
                        │
                        ▼
               HTTPS (Port 443)
                        │
                SSL/TLS Certificate
                        │
                        ▼
             Kubernetes Ingress
                        │
                        ▼
                Kubernetes Service
                        │
                        ▼
                 Nginx Application Pod
```

---

# Why Ingress?

Instead of exposing every application with its own LoadBalancer, Kubernetes Ingress provides:

- Single entry point
- HTTP/HTTPS routing
- SSL termination
- Host-based routing
- Path-based routing
- Lower cloud cost
- Better scalability

---

# Prerequisites

Before configuring Ingress, ensure:

- Google Kubernetes Engine cluster is running
- Application is deployed
- Kubernetes Service exists
- Ingress Controller installed
- Domain name (optional)
- SSL certificate available

---

# Verify Application Service

```
kubectl get svc
```

Example

```
NAME            TYPE        CLUSTER-IP      PORT(S)

hello-service   ClusterIP   10.32.1.15      80/TCP
```

---

# Install NGINX Ingress Controller

Example installation

```
kubectl apply -f \
https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

Verify

```
kubectl get pods -n ingress-nginx
```

Expected

```
ingress-nginx-controller
Running
```

---

# Verify Ingress Controller Service

```
kubectl get svc -n ingress-nginx
```

Example

```
NAME                        TYPE           EXTERNAL-IP

ingress-nginx-controller    LoadBalancer   xxx.xxx.xxx.xxx
```

---

# Create TLS Secret

If using a self-signed certificate

```
kubectl create secret tls app-secret \
--cert=tls.crt \
--key=tls.key
```

Verify

```
kubectl get secrets
```

---

# Ingress Configuration

Example

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: hello-ingress

spec:

  tls:
  - hosts:
      - app.example.com
    secretName: app-secret

  rules:
  - host: app.example.com

    http:

      paths:

      - path: /

        pathType: Prefix

        backend:

          service:

            name: hello-service

            port:

              number: 80
```

---

# Deploy Ingress

```
kubectl apply -f ingress.yaml
```

Verify

```
kubectl get ingress
```

Example

```
NAME              HOSTS

hello-ingress     app.example.com
```

---

# Verify HTTPS

Open browser

```
https://app.example.com
```

Expected

- Secure connection
- SSL certificate
- Application loads successfully

---

# Validate Resources

Check ingress

```
kubectl get ingress
```

Describe ingress

```
kubectl describe ingress hello-ingress
```

Check service

```
kubectl get svc
```

Check pods

```
kubectl get pods
```

---

# Security Benefits

- HTTPS encryption
- SSL termination
- Secure communication
- Centralized routing
- Reduced attack surface
- Production-ready architecture

---

# Outcome

✔ Kubernetes Ingress configured

✔ Application accessible externally

✔ SSL/TLS enabled

✔ HTTPS communication established

✔ Secure production-ready access configured

---

# Screenshots

Add the following screenshots:

- Ingress Controller Pods
- Ingress Service
- Ingress YAML
- TLS Secret
- kubectl get ingress
- Browser showing HTTPS
- SSL Certificate Details
- Final Application Running over HTTPS