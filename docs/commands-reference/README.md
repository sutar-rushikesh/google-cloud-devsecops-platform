# 💻 Commands Reference

## Git

```bash
git clone <repo>
git status
git add .
git commit -m "message"
git push
```

---

## Docker

```bash
docker build -t app .
docker images
docker ps
docker logs <container>
docker exec -it <container> sh
```

---

## Kubernetes

```bash
kubectl get pods
kubectl get svc
kubectl get nodes
kubectl describe pod <pod>
kubectl logs <pod>
kubectl apply -f file.yaml
kubectl delete -f file.yaml
```

---

## Helm

```bash
helm install
helm upgrade
helm uninstall
helm list
```

---

## ArgoCD

```bash
argocd login
argocd app list
argocd app sync app-name
argocd app get app-name
```

---

## Terraform

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
terraform destroy
```

---

## Jenkins

```bash
systemctl status jenkins
systemctl restart jenkins
```

---

## Docker Cleanup

```bash
docker system prune -a
docker image prune
docker volume prune
```

---

## Trivy

```bash
trivy fs .
trivy image image-name
```

---

## Google Cloud

```bash
gcloud auth login
gcloud config list
gcloud container clusters list
gcloud artifacts repositories list
```