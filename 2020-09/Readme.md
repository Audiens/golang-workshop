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

## Step 5 

### Create a pod without a volume
Create a mysql5.7 deployment and apply it. Once the pod is up and running, run the command to login inside the Pod: 
```shell script
$ kubectl exec -it db-no-storage -- mysql -u root
# once logged in: 
$ create database pippo;
$ use pippo; 
$ create table paperino (name varchar(255));
$ insert into paperino (name) values ("ciao");
```
After the creation of database, logout from the container (ctrl+D) and delete the POD.
After pod deletion re-create the pod using the same yaml. login into the pod (the first command above) and run:   
```shell script
show databases; 
```
this command should return 0 results.

### Create a pod with a local volume
Mount a directory into minikube using this command: 
```shell script
$ minikube mount /tmp/data:/tmp/local-data
```
Modify the same yaml file in order to add a volume from the host. [Here](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)
the documentation about local volume.
Repeat the procedure above and, this time the show database command should return the database created before. 

### Solution
```yaml
## Without storage
apiVersion: apps/v1 
kind: Deployment
metadata:
  name: db-without-storage
spec:
  selector:
    matchLabels:
      app: db
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: db
        tier: mysql
    spec:
      containers:
      - image: mysql:5.7
        name: mysql
        env:
        - name: MYSQL_ALLOW_EMPTY_PASSWORD
          value: "true"    
        ports:
        - containerPort: 3306
          name: mysql        
---
## With storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: db
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1 
kind: Deployment
metadata:
  name: db-with-storage
  labels:
    app: db
spec:
  selector:
    matchLabels:
      app: db
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.7
        name: mysql
        env:
        - name: MYSQL_ALLOW_EMPTY_PASSWORD
          value: "true"
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim
```
