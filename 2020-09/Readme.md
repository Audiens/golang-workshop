# K8S day
Today we talk about Kubernetes (aka k8s) and how it works (more or less)
You can find the slides [here](https://slides.com/andreaquintino/kubernetes)

## Step 1

### Setup
Ensure that you don't have any container running:

```bash
$ docker ps
```
This will avoid any port collision.

### Install Kubectl
Kubectl is necessary to run the queries on our cluster. 
```shell script
$ sudo snap install --classic kubectl
$ kubectl version
```
If you don't have snap installed follow the official page with the instructions to install it. 

### Install Minikube 
After you finished the installation setup, start the installation of minikube:
```shell script
$ sudo curl -Lo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && sudo chmod +x /usr/local/bin/minikube

$ minikube start
# If everything is ok run
$ minikube dashboard
```

## Step 2 
Now everything is up and running, we start creating our first Pod.
Create a directory in you workspace, e.g. k8s_exercises, and create the a file called `pod.yaml`. Inside the file write
the configuration to run a Pod with nginx on board. After you write the code, you have to apply it with the following
command: 
```shell script
kubectl create -f pod.yaml 
```   

Check if it works looking the state in this way: 
```shell script
kubectl get pod
``` 

### Solution
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```