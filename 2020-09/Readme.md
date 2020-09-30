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
Delete the deployment just created and modify the yaml adding the PersistentVolumeClaim information. Mount the pvc to
the container and repeat the procedure above. This time when you delete the pod you should not lose your data.  
Hint: mysql directory to mount is /var/lib/mysql

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
## Step 6
We have to configure NGINX as reverse proxy to the application saw in the step 1. In this way from browser we call the 
application to the 80 port and NGINX redirect internally the traffic to http://127.0.0.1:3000 .

### Create the ConfigMap
Create a config map with this nginx configuration: 
```
server {
    listen       80;
    server_name  localhost;

    location / {
        proxy_bind 127.0.0.1;
        proxy_pass http://127.0.0.1:3000;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### Create the Pod
Create a Pod with 2 containers: 1 with nginx and the other with the image `wardviaene/k8s-demo:latest`. Nginx exposes the
port 80 and k8s-demo the 3000. The Nginx container will mount the configMap create before in the path `/etc/nginx/conf.d`.

### Create the Service
Create a Service of type `NodePort` that expose the port 80. Ask to minikube the address of the service and check if it
works :) 

### Hint
You can write all the stuffs in the same file, just at the end of the configuration add `---`. In this the YAML
interpreter recognize the end of the configuration. 

### Solution
```yaml 
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  reverseproxy.conf: |
    server {
        listen       80;
        server_name  localhost;
    
        location / {
            proxy_bind 127.0.0.1;
            proxy_pass http://127.0.0.1:3000;
        }
    
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }

---
apiVersion: v1
kind: Pod
metadata:
  name: helloworld-nginx
  labels:
    app: helloworld-nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    volumeMounts:
    - name: config-volume
      mountPath: /etc/nginx/conf.d
  - name: k8s-demo
    image: wardviaene/k8s-demo
    ports:
    - containerPort: 3000
  volumes:
    - name: config-volume
      configMap:
        name: nginx-config
        items:
        - key: reverseproxy.conf
          path: reverseproxy.conf
---
apiVersion: v1
kind: Service
metadata:
  name: helloworld-nginx-service
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    app: helloworld-nginx
  type: NodePort
```

## Step 7
### Setup
Delete all the deployment from the cluster (you know how) and enable the metric-server in minikube using this command: 
```shell script
$ minikube addons enable metrics-server
``` 
### Create deployment and service
Create a new deployment with replicas = 1 that use the image `gcr.io/google_containers/hpa-example` and a service of type
NodePort that expose the port 31001. The deployment container capacity is limited to 100 mCPU. Check on google how to limit
container resources.

### Create hpa
Create an HorizontalPodAutoscaler with min capacity 1 and max capacity 10 linked to deployment created before.

### Blast the cluster
Run this command: 
```shell script
$ kubectl run -it load-generator --image=busybox /bin/sh
```
once logged in run: 
```shell script
$ while true; do wget -q -O- http://hpa-example.default.svc.cluster.local:31001; done;
```

and looks the pod numbers increase.