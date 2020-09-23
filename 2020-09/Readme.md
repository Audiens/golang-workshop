## Step 1

Ensure that you don't have any container running:

```bash
$ docker ps
```
This will avoid any port collision.

Follow the instruction [here](https://kubernetes.io/docs/tasks/tools/install-minikube/) to install Minikube locally.

After you finished the installation setup, start the installation of kubectl. Kubectl is necessary to run the queries on our cluster. [Here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-using-other-package-management) the instructions to follow. 