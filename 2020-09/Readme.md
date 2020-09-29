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

## Step 3 
Now we know that pod itself are quite useless so delete existing POD (find the command with Google :) )

### Create deployment
Create a new file called `deployment.yaml` and create a k8s deployment with ReplicaSet 3, the container use the image 
`wardviaene/k8s-demo:latest` and expose the port 3000.

### Expose the deployment 
Until know the pod is up and running but, we don't know how it works. Expose the deployment in this way (after we see
the correct method): 
```shell script
$ kubectl expose deployment helloworld-deployment --type=NodePort
# get address exposed by minikube
$ minikube service helloworld-deployment --url
```

### Update the image
Using the command line update the deployment container with the image `wardviaene/k8s-demo:2` and see what happens.
PS: use Google to find the command 

### Solution
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloworld-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
```     

## Step 4
With the previous exercise kubectl select a random port to expose our application. Delete the existing service (Google 
is your friend) and create a file `services.yaml` with a configuration that help us to reach the application to the port
30000

### Solution
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-service
spec:
  type: NodePort
  selector:
    app: helloworld
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30000
```