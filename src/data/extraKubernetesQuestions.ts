import type { QuizQuestion } from "./questions";

/**
 * Additional kubernetes questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const kubernetesExtraQuestions: QuizQuestion[] = [
  {
    id: "k8s-get-nodes",
    category: "kubernetes",
    level: "pareto",
    prompt: "List all nodes in the cluster.",
    answer: "kubectl get nodes",
    explanation:
      "`kubectl get nodes` shows each node with its status, role, and Kubernetes version.",
  },
  {
    id: "k8s-get-pods",
    category: "kubernetes",
    level: "pareto",
    prompt: "List all pods in the current namespace.",
    answer: "kubectl get pods",
    explanation:
      "`kubectl get pods` lists pods; add `-o wide` for nodes and IPs.",
  },
  {
    id: "k8s-get-pods-all-ns",
    category: "kubernetes",
    level: "core",
    prompt: "List pods in every namespace.",
    answer: "kubectl get pods -A",
    explanation:
      "`-A` (or `--all-namespaces`) shows pods across the whole cluster.",
  },
  {
    id: "k8s-get-pods-detail",
    category: "kubernetes",
    level: "core",
    prompt: "List pods with their node and IP addresses.",
    answer: "kubectl get pods -o wide",
    explanation:
      "`-o wide` adds the node name and pod IP to the default columns.",
  },
  {
    id: "k8s-get-services-1",
    category: "kubernetes",
    level: "core",
    prompt: "List all services in the current namespace.",
    answer: "kubectl get svc",
    explanation:
      "`svc` is the short form for services; shows type, cluster IP, and ports.",
  },
  {
    id: "k8s-get-deployments-1",
    category: "kubernetes",
    level: "core",
    prompt: "List all deployments in the current namespace.",
    answer: "kubectl get deploy",
    explanation:
      "`deploy` is short for deployments; shows desired/current/ready replica counts.",
  },
  {
    id: "k8s-get-events",
    category: "kubernetes",
    level: "core",
    prompt: "Show recent cluster events (the first place to look for failures).",
    answer: "kubectl get events",
    explanation:
      "`kubectl get events` (or `kubectl get ev`) shows warnings like ImagePullBackOff and CrashLoopBackOff.",
  },
  {
    id: "k8s-describe-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Show detailed information about the pod 'web-0'.",
    answer: "kubectl describe pod web-0",
    explanation:
      "`describe` shows events, container statuses, and why a pod is stuck.",
  },
  {
    id: "k8s-logs-1",
    category: "kubernetes",
    level: "pareto",
    prompt: "Print the logs of the pod 'web-0'.",
    answer: "kubectl logs web-0",
    explanation:
      "`kubectl logs` streams the pod's stdout. `-f` follows, `--tail 50` limits lines.",
  },
  {
    id: "k8s-logs-follow-1",
    category: "kubernetes",
    level: "core",
    prompt: "Follow the logs of pod 'web-0' live.",
    answer: "kubectl logs -f web-0",
    explanation:
      "`-f` (follow) streams new log lines like `tail -f`.",
  },
  {
    id: "k8s-logs-container-1",
    category: "kubernetes",
    level: "core",
    prompt: "Show logs from the 'sidecar' container in pod 'app-1'.",
    answer: "kubectl logs app-1 -c sidecar",
    explanation:
      "`-c` selects a specific container when a pod has several.",
  },
  {
    id: "k8s-logs-previous-1",
    category: "kubernetes",
    level: "workflow",
    prompt: "See the logs from the previous (crashed) run of pod 'app-1'.",
    answer: "kubectl logs app-1 --previous",
    explanation:
      "`--previous` shows the last container instance's output — essential for crash-loop debugging.",
  },
  {
    id: "k8s-logs-since",
    category: "kubernetes",
    level: "core",
    prompt: "Show pod 'app-1' logs from the last hour.",
    answer: "kubectl logs app-1 --since=1h",
    explanation:
      "`--since` filters by age; `--since-time` accepts an absolute timestamp.",
  },
  {
    id: "k8s-exec-1",
    category: "kubernetes",
    level: "core",
    prompt: "Open an interactive shell in the pod 'web-0'.",
    answer: "kubectl exec -it web-0 -- /bin/sh",
    explanation:
      "`exec -it … -- command` runs interactively in the pod's container (sh for minimal images).",
  },
  {
    id: "k8s-exec-command-1",
    category: "kubernetes",
    level: "core",
    prompt: "Run 'ls /app' inside the pod 'web-0'.",
    answer: "kubectl exec web-0 -- ls /app",
    explanation:
      "Everything after `--` runs inside the container, so flags aren't swallowed by kubectl.",
  },
  {
    id: "k8s-exec-container",
    category: "kubernetes",
    level: "core",
    prompt: "Run a command in the 'init' container of pod 'job-0'.",
    answer: "kubectl exec job-0 -c init -- cat /etc/config",
    explanation:
      "`-c` picks the container when a pod runs several.",
  },
  {
    id: "k8s-port-forward-1",
    category: "kubernetes",
    level: "core",
    prompt: "Forward local port 8080 to port 80 of pod 'web-0'.",
    answer: "kubectl port-forward web-0 8080:80",
    explanation:
      "`port-forward` opens a local tunnel to a pod — handy for debugging without exposing a Service.",
  },
  {
    id: "k8s-port-forward-svc",
    category: "kubernetes",
    level: "core",
    prompt: "Forward local port 5432 to the 'db' service's port 5432.",
    answer: "kubectl port-forward svc/db 5432:5432",
    explanation:
      "Services can be targeted with the `svc/` prefix for port forwarding.",
  },
  {
    id: "k8s-cp-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Copy a file from pod 'web-0' to the local machine.",
    answer: "kubectl cp web-0:/app/log.txt ./log.txt",
    explanation:
      "`kubectl cp pod:path localpath` pulls files out of a pod.",
  },
  {
    id: "k8s-cp-into-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Copy config.yaml into pod 'web-0' at /tmp/config.yaml.",
    answer: "kubectl cp config.yaml web-0:/tmp/config.yaml",
    explanation:
      "`kubectl cp localpath pod:path` pushes files into a running pod.",
  },
  {
    id: "k8s-apply-1",
    category: "kubernetes",
    level: "core",
    prompt: "Create or update resources defined in deploy.yaml.",
    answer: "kubectl apply -f deploy.yaml",
    explanation:
      "`apply` reconciles declarative state — the standard way to ship manifests.",
  },
  {
    id: "k8s-apply-dir",
    category: "kubernetes",
    level: "core",
    prompt: "Apply every manifest in the ./manifests directory.",
    answer: "kubectl apply -f ./manifests",
    explanation:
      "A directory argument applies all YAML/JSON files within.",
  },
  {
    id: "k8s-delete",
    category: "kubernetes",
    level: "core",
    prompt: "Delete the pod 'web-0'.",
    answer: "kubectl delete pod web-0",
    explanation:
      "Deleting a pod managed by a Deployment just reschedules a replacement.",
  },
  {
    id: "k8s-delete-manifest",
    category: "kubernetes",
    level: "core",
    prompt: "Delete all resources defined in deploy.yaml.",
    answer: "kubectl delete -f deploy.yaml",
    explanation:
      "Deleting by file removes exactly what the manifest declares.",
  },
  {
    id: "k8s-delete-ns-all",
    category: "kubernetes",
    level: "workflow",
    prompt: "Delete every pod in the 'testing' namespace.",
    answer: "kubectl delete pods -n testing --all",
    explanation:
      "`--all` targets every pod in the namespace.",
  },
  {
    id: "k8s-delete-force-1",
    category: "kubernetes",
    level: "workflow",
    prompt: "Force-delete a pod stuck in Terminating.",
    answer: "kubectl delete pod web-0 --force --grace-period=0",
    explanation:
      "`--force --grace-period=0` bypasses graceful termination for stuck pods.",
  },
  {
    id: "k8s-namespaces",
    category: "kubernetes",
    level: "core",
    prompt: "List all namespaces.",
    answer: "kubectl get namespaces",
    explanation:
      "Namespaces partition cluster resources; `kubectl get ns` is the short form.",
  },
  {
    id: "k8s-create-namespace-1",
    category: "kubernetes",
    level: "core",
    prompt: "Create a namespace called 'staging'.",
    answer: "kubectl create namespace staging",
    explanation:
      "`kubectl create ns staging` makes the namespace; work inside with `-n staging`.",
  },
  {
    id: "k8s-namespace-context",
    category: "kubernetes",
    level: "core",
    prompt: "See the namespace your current context is using.",
    answer: "kubectl config view --minify | grep namespace",
    explanation:
      "The minified config shows the active context's namespace. `kubectl config current-context` names the context.",
  },
  {
    id: "k8s-run-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Run a one-off nginx pod named 'nginx-test'.",
    answer: "kubectl run nginx-test --image=nginx",
    explanation:
      "`kubectl run` creates a standalone pod (in older versions, a Deployment).",
  },
  {
    id: "k8s-run-command",
    category: "kubernetes",
    level: "core",
    prompt: "Run a one-off pod that executes 'echo hello'.",
    answer: "kubectl run hello --image=alpine --restart=Never -- echo hello",
    explanation:
      "`--restart=Never` makes it a pod (not a job); args after `--` become the command.",
  },
  {
    id: "k8s-create-deployment-1",
    category: "kubernetes",
    level: "core",
    prompt: "Create a deployment named 'web' running nginx.",
    answer: "kubectl create deployment web --image=nginx",
    explanation:
      "`kubectl create deployment` scaffolds a Deployment with one replica.",
  },
  {
    id: "k8s-create-deployment-replicas",
    category: "kubernetes",
    level: "core",
    prompt: "Create a deployment 'web' with 3 replicas.",
    answer: "kubectl create deployment web --image=nginx --replicas=3",
    explanation:
      "`--replicas` sets the initial desired count.",
  },
  {
    id: "k8s-scale-deployment",
    category: "kubernetes",
    level: "core",
    prompt: "Scale the deployment 'web' to 5 replicas.",
    answer: "kubectl scale deployment web --replicas=5",
    explanation:
      "`scale` changes the desired replica count immediately.",
  },
  {
    id: "k8s-autoscale",
    category: "kubernetes",
    level: "workflow",
    prompt: "Auto-scale deployment 'api' between 2 and 10 replicas at 70% CPU.",
    answer: "kubectl autoscale deployment api --min=2 --max=10 --cpu-percent=70",
    explanation:
      "Creates a HorizontalPodAutoscaler that adjusts replicas on CPU load.",
  },
  {
    id: "k8s-rollout-status-1",
    category: "kubernetes",
    level: "core",
    prompt: "Check the status of the deployment 'web' rollout.",
    answer: "kubectl rollout status deployment/web",
    explanation:
      "Waits/prints until the rollout completes — the deploy-watcher command.",
  },
  {
    id: "k8s-rollout-history-1",
    category: "kubernetes",
    level: "core",
    prompt: "Show the rollout history of deployment 'web'.",
    answer: "kubectl rollout history deployment/web",
    explanation:
      "Lists each revision with its change cause; `--revision=2` shows details.",
  },
  {
    id: "k8s-rollout-undo-1",
    category: "kubernetes",
    level: "workflow",
    prompt: "Roll back the deployment 'web' to its previous revision.",
    answer: "kubectl rollout undo deployment/web",
    explanation:
      "`undo` reverts to the last revision; `--to-revision=2` targets a specific one.",
  },
  {
    id: "k8s-rollout-restart-1",
    category: "kubernetes",
    level: "workflow",
    prompt: "Force a rolling restart of deployment 'web' (e.g. to pick up new config).",
    answer: "kubectl rollout restart deployment/web",
    explanation:
      "Restart cycles pods without changing the image — handy after ConfigMap updates.",
  },
  {
    id: "k8s-set-image-1",
    category: "kubernetes",
    level: "core",
    prompt: "Update deployment 'web' to image nginx:1.25.",
    answer: "kubectl set image deployment/web nginx=nginx:1.25",
    explanation:
      "`set image deployment/name container=newimage` triggers a rolling update.",
  },
  {
    id: "k8s-edit-deployment-1",
    category: "kubernetes",
    level: "core",
    prompt: "Edit the deployment 'web' in your editor.",
    answer: "kubectl edit deployment web",
    explanation:
      "`edit` opens the live manifest; saving applies the change.",
  },
  {
    id: "k8s-expose-deployment",
    category: "kubernetes",
    level: "core",
    prompt: "Create a ClusterIP service exposing deployment 'web' on port 80.",
    answer: "kubectl expose deployment web --port=80",
    explanation:
      "`expose` generates a Service targeting the deployment's selector.",
  },
  {
    id: "k8s-expose-nodeport",
    category: "kubernetes",
    level: "core",
    prompt: "Expose deployment 'web' as a NodePort service.",
    answer: "kubectl expose deployment web --type=NodePort --port=80",
    explanation:
      "NodePort allocates a port on every node (default 30000-32767).",
  },
  {
    id: "k8s-create-service-lb",
    category: "kubernetes",
    level: "core",
    prompt: "Create a LoadBalancer service named 'web' on port 80.",
    answer: "kubectl create service loadbalancer web --tcp=80:80",
    explanation:
      "`kubectl create service loadbalancer` hands you a cloud load balancer (where supported).",
  },
  {
    id: "k8s-create-service-clusterip",
    category: "kubernetes",
    level: "core",
    prompt: "Create a ClusterIP service 'db' on port 5432.",
    answer: "kubectl create service clusterip db --tcp=5432:5432",
    explanation:
      "ClusterIP is the default service type — cluster-internal only.",
  },
  {
    id: "k8s-endpoints",
    category: "kubernetes",
    level: "core",
    prompt: "List the endpoints backing service 'web'.",
    answer: "kubectl get endpoints web",
    explanation:
      "Endpoints show which pod IPs the service routes to — mismatches mean no traffic.",
  },
  {
    id: "k8s-configmap-create",
    category: "kubernetes",
    level: "core",
    prompt: "Create a ConfigMap 'app-config' from a literal key-value.",
    answer: "kubectl create configmap app-config --from-literal=LOG_LEVEL=info",
    explanation:
      "`--from-literal` inlines values; `--from-file` reads files.",
  },
  {
    id: "k8s-configmap-from-file",
    category: "kubernetes",
    level: "core",
    prompt: "Create a ConfigMap 'app-config' from the file config.yaml.",
    answer: "kubectl create configmap app-config --from-file=config.yaml",
    explanation:
      "`--from-file` stores the file contents as a key named after the file.",
  },
  {
    id: "k8s-configmap-env",
    category: "kubernetes",
    level: "core",
    prompt: "Show all ConfigMaps in the current namespace.",
    answer: "kubectl get configmaps",
    explanation:
      "`kubectl get cm` is the short form; `kubectl get cm name -o yaml` shows contents.",
  },
  {
    id: "k8s-secret-create",
    category: "kubernetes",
    level: "core",
    prompt: "Create a secret 'db-secret' with literal password.",
    answer: "kubectl create secret generic db-secret --from-literal=password=hunter2",
    explanation:
      "Generic secrets store opaque data; values are base64-encoded at rest.",
  },
  {
    id: "k8s-secret-file",
    category: "kubernetes",
    level: "core",
    prompt: "Create a secret from the file tls.key.",
    answer: "kubectl create secret generic tls-secret --from-file=tls.key",
    explanation:
      "`--from-file` stores the file under its basename as a key.",
  },
  {
    id: "k8s-secret-tls",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a TLS secret for cert.pem and key.pem.",
    answer: "kubectl create secret tls my-tls --cert=cert.pem --key=key.pem",
    explanation:
      "The `tls` secret type is purpose-built for ingress certificates.",
  },
  {
    id: "k8s-secret-decode",
    category: "kubernetes",
    level: "workflow",
    prompt: "View the plaintext value of key 'password' in secret 'db-secret'.",
    answer: "kubectl get secret db-secret -o jsonpath='{.data.password}' | base64 -d",
    explanation:
      "Secret values are base64; decode to inspect (or use `--decode` in newer kubectl).",
  },
  {
    id: "k8s-label-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Add the label env=prod to pod 'web-0'.",
    answer: "kubectl label pod web-0 env=prod",
    explanation:
      "Labels drive selectors — services and deployments route by them.",
  },
  {
    id: "k8s-label-overwrite",
    category: "kubernetes",
    level: "core",
    prompt: "Change the env label on pod 'web-0' to 'staging'.",
    answer: "kubectl label pod web-0 env=staging --overwrite",
    explanation:
      "`--overwrite` is required when the label already exists.",
  },
  {
    id: "k8s-label-remove",
    category: "kubernetes",
    level: "core",
    prompt: "Remove the env label from pod 'web-0'.",
    answer: "kubectl label pod web-0 env-",
    explanation:
      "A trailing dash on the key deletes the label.",
  },
  {
    id: "k8s-get-by-label",
    category: "kubernetes",
    level: "core",
    prompt: "List pods with the label app=web.",
    answer: "kubectl get pods -l app=web",
    explanation:
      "`-l` (label selector) filters pods; `-l 'app=web,env=prod'` combines conditions.",
  },
  {
    id: "k8s-annotate-1",
    category: "kubernetes",
    level: "core",
    prompt: "Add the annotation owner=platform to pod 'web-0'.",
    answer: "kubectl annotate pod web-0 owner=platform",
    explanation:
      "Annotations store metadata for tooling; selectors can't match on them.",
  },
  {
    id: "k8s-label-nodes",
    category: "kubernetes",
    level: "workflow",
    prompt: "Label node 'node-1' with disktype=ssd for scheduling.",
    answer: "kubectl label node node-1 disktype=ssd",
    explanation:
      "Node labels pair with nodeSelector to pin workloads to specific hardware.",
  },
  {
    id: "k8s-node-selector",
    category: "kubernetes",
    level: "workflow",
    prompt: "In a pod spec, run only on nodes labeled disktype=ssd.",
    answer: "nodeSelector: {disktype: ssd}",
    explanation:
      "nodeSelector schedules the pod onto matching nodes.",
  },
  {
    id: "k8s-taint-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Mark node 'node-3' as unschedulable for regular pods (dedicated to GPU).",
    answer: "kubectl taint nodes node-3 gpu=true:NoSchedule",
    explanation:
      "Taints repel pods; pods with a matching toleration can still schedule.",
  },
  {
    id: "k8s-drain-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Safely evict all pods from node 'node-2' before maintenance.",
    answer: "kubectl drain node-2",
    explanation:
      "`drain` evicts pods (respecting PDBs) and marks the node unschedulable.",
  },
  {
    id: "k8s-cordon-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Prevent new pods from scheduling onto node 'node-1'.",
    answer: "kubectl cordon node-1",
    explanation:
      "`cordon` marks the node unschedulable without evicting existing pods.",
  },
  {
    id: "k8s-uncordon-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Allow pods to schedule on node 'node-1' again.",
    answer: "kubectl uncordon node-1",
    explanation:
      "`uncordon` reverses a cordon, re-enabling scheduling.",
  },
  {
    id: "k8s-top-pods-1",
    category: "kubernetes",
    level: "core",
    prompt: "Show CPU and memory usage of pods (requires metrics server).",
    answer: "kubectl top pods",
    explanation:
      "`kubectl top` reports live usage; `kubectl top nodes` covers the cluster.",
  },
  {
    id: "k8s-top-nodes-1",
    category: "kubernetes",
    level: "core",
    prompt: "Show resource usage per node.",
    answer: "kubectl top nodes",
    explanation:
      "Node-level CPU/memory from the metrics pipeline.",
  },
  {
    id: "k8s-explain-1",
    category: "kubernetes",
    level: "core",
    prompt: "Show the fields a Deployment resource accepts.",
    answer: "kubectl explain deployment",
    explanation:
      "`explain` documents resource schemas; `kubectl explain deployment.spec` drills deeper.",
  },
  {
    id: "k8s-api-resources-1",
    category: "kubernetes",
    level: "core",
    prompt: "List all resource types the cluster supports.",
    answer: "kubectl api-resources",
    explanation:
      "Shows the API groups, kinds, and short names (svc, deploy, cm, …).",
  },
  {
    id: "k8s-get-yaml",
    category: "kubernetes",
    level: "core",
    prompt: "Print the full YAML of deployment 'web'.",
    answer: "kubectl get deployment web -o yaml",
    explanation:
      "`-o yaml` dumps the object; `-o json` gives JSON.",
  },
  {
    id: "k8s-get-jsonpath",
    category: "kubernetes",
    level: "workflow",
    prompt: "Print just the image of deployment 'web'.",
    answer: "kubectl get deployment web -o jsonpath='{.spec.template.spec.containers[0].image}'",
    explanation:
      "jsonpath extracts single fields for scripting.",
  },
  {
    id: "k8s-get-custom-columns",
    category: "kubernetes",
    level: "workflow",
    prompt: "List pods showing only name and IP as custom columns.",
    answer: "kubectl get pods -o custom-columns=NAME:.metadata.name,IP:.status.podIP",
    explanation:
      "`custom-columns` builds table output from jsonpath expressions.",
  },
  {
    id: "k8s-diff-manifest",
    category: "kubernetes",
    level: "workflow",
    prompt: "Preview what 'kubectl apply -f' would change.",
    answer: "kubectl diff -f deploy.yaml",
    explanation:
      "`diff` shows the planned changes without applying them (needs server-side apply support).",
  },
  {
    id: "k8s-dry-run",
    category: "kubernetes",
    level: "workflow",
    prompt: "Validate deploy.yaml against the API without creating anything.",
    answer: "kubectl apply --dry-run=client -f deploy.yaml",
    explanation:
      "`--dry-run=client` validates locally; `=server` asks the API server too.",
  },
  {
    id: "k8s-apply-validate",
    category: "kubernetes",
    level: "core",
    prompt: "Check a manifest's syntax before applying.",
    answer: "kubectl apply --dry-run=client --validate=true -f deploy.yaml",
    explanation:
      "Combines schema validation with a no-op apply.",
  },
  {
    id: "k8s-context-list",
    category: "kubernetes",
    level: "core",
    prompt: "List all contexts in your kubeconfig.",
    answer: "kubectl config get-contexts",
    explanation:
      "Contexts bundle cluster + user + namespace; the `*` marks the current one.",
  },
  {
    id: "k8s-context-use",
    category: "kubernetes",
    level: "core",
    prompt: "Switch to the 'prod' context.",
    answer: "kubectl config use-context prod",
    explanation:
      "`use-context` changes which cluster subsequent commands target.",
  },
  {
    id: "k8s-context-current",
    category: "kubernetes",
    level: "core",
    prompt: "Print the name of the current context.",
    answer: "kubectl config current-context",
    explanation:
      "Quick sanity check before running commands against the wrong cluster.",
  },
  {
    id: "k8s-context-namespace-1",
    category: "kubernetes",
    level: "workflow",
    prompt: "Set the default namespace for the current context to 'dev'.",
    answer: "kubectl config set-context --current --namespace=dev",
    explanation:
      "Pins the namespace so `-n` isn't needed for every command.",
  },
  {
    id: "k8s-create-context",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a context 'admin' from the current cluster with user 'me'.",
    answer: "kubectl config set-context admin --cluster=$(kubectl config current-context) --user=me",
    explanation:
      "`set-context` composes a new context from cluster/user/namespace.",
  },
  {
    id: "k8s-ingress-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create an ingress rule routing app.example.com to service 'web' on port 80.",
    answer: "kubectl create ingress web-ingress --rule='app.example.com/=web:80'",
    explanation:
      "The create ingress one-liner generates an Ingress object; an ingress controller must be installed.",
  },
  {
    id: "k8s-ingress-list",
    category: "kubernetes",
    level: "core",
    prompt: "List all ingresses in the namespace.",
    answer: "kubectl get ingress",
    explanation:
      "`kubectl get ing` shows host, paths, and backend services.",
  },
  {
    id: "k8s-pvc-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "In a PVC manifest, request 10Gi of storage.",
    answer: "storage: 10Gi",
    explanation:
      "`storage: 10Gi` inside `resources.requests` is what a PVC requests; a StorageClass or PV must satisfy it.",
  },
  {
    id: "k8s-pvc-list",
    category: "kubernetes",
    level: "core",
    prompt: "List persistent volume claims.",
    answer: "kubectl get pvc",
    explanation:
      "`pvc` shows capacity, status (Bound/Pending), and access mode.",
  },
  {
    id: "k8s-pv-list",
    category: "kubernetes",
    level: "core",
    prompt: "List persistent volumes.",
    answer: "kubectl get pv",
    explanation:
      "`pv` lists cluster storage; `kubectl get sc` lists storage classes.",
  },
  {
    id: "k8s-storage-class-list",
    category: "kubernetes",
    level: "core",
    prompt: "List storage classes.",
    answer: "kubectl get storageclass",
    explanation:
      "StorageClasses define provisioners (e.g. gp2, standard); PVCs reference them.",
  },
  {
    id: "k8s-job-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Run a one-off job that computes something then exits.",
    answer: "kubectl create job my-job --image=alpine -- echo done",
    explanation:
      "Jobs run to completion; check results with `kubectl get jobs` and `kubectl logs`. ",
  },
  {
    id: "k8s-job-from-cron",
    category: "kubernetes",
    level: "workflow",
    prompt: "Run a cronjob's job immediately (on-demand).",
    answer: "kubectl create job --from=cronjob/backup backup-manual",
    explanation:
      "`--from=cronjob/name` spawns a job with the cronjob's spec — handy for manual runs.",
  },
  {
    id: "k8s-cronjob-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a cronjob that runs 'echo hi' every hour.",
    answer: "kubectl create cronjob hourly-hi --image=alpine --schedule='0 * * * *' -- echo hi",
    explanation:
      "`--schedule` takes a cron expression; the job runs on that interval.",
  },
  {
    id: "k8s-jobs-list",
    category: "kubernetes",
    level: "core",
    prompt: "List all jobs in the namespace.",
    answer: "kubectl get jobs",
    explanation:
      "Jobs show completions/successes; failed ones need `kubectl describe` or logs.",
  },
  {
    id: "k8s-daemonset-list",
    category: "kubernetes",
    level: "core",
    prompt: "List all daemonsets in the cluster.",
    answer: "kubectl get daemonsets -A",
    explanation:
      "Daemonsets run one pod per node (e.g. log shippers, node agents).",
  },
  {
    id: "k8s-statefulset-list",
    category: "kubernetes",
    level: "core",
    prompt: "List statefulsets in the namespace.",
    answer: "kubectl get statefulsets",
    explanation:
      "`kubectl get sts` shows stable, ordered workloads like databases.",
  },
  {
    id: "k8s-replicaset-list",
    category: "kubernetes",
    level: "core",
    prompt: "List replica sets managed by deployments.",
    answer: "kubectl get rs",
    explanation:
      "ReplicaSets are the deployment's worker mechanism; each rollout makes a new one.",
  },
  {
    id: "k8s-sa-list",
    category: "kubernetes",
    level: "core",
    prompt: "List service accounts in the namespace.",
    answer: "kubectl get serviceaccounts",
    explanation:
      "Service accounts identify pods to the API server; `kubectl get sa` is short.",
  },
  {
    id: "k8s-create-sa",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a service account 'deployer'.",
    answer: "kubectl create serviceaccount deployer",
    explanation:
      "Pods can assume this identity via `serviceAccountName`.",
  },
  {
    id: "k8s-rbac-role",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a role granting pod read access in the current namespace.",
    answer: "kubectl create role pod-reader --verb=get,list --resource=pods",
    explanation:
      "Roles authorize verbs on resources within a namespace.",
  },
  {
    id: "k8s-rbac-clusterrole",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a cluster role allowing nodes to be read.",
    answer: "kubectl create clusterrole node-reader --verb=get --resource=nodes",
    explanation:
      "ClusterRoles span all namespaces — needed for node-level access.",
  },
  {
    id: "k8s-rbac-binding",
    category: "kubernetes",
    level: "workflow",
    prompt: "Bind the 'pod-reader' role to the 'deployer' service account.",
    answer: "kubectl create rolebinding deployer-pods --role=pod-reader --serviceaccount=default:deployer",
    explanation:
      "RoleBinding grants the role to a user/SA/group in a namespace.",
  },
  {
    id: "k8s-quota-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Limit a namespace to 2 CPU and 4Gi of memory.",
    answer: "kubectl create quota my-quota --hard=cpu=2,memory=4Gi",
    explanation:
      "ResourceQuotas cap namespace totals; pods exceeding them are rejected.",
  },
  {
    id: "k8s-limit-range",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply default memory limits of 512Mi per pod in the namespace.",
    answer: "kubectl create limitrange mem-limit --max=memory=512Mi --default=memory=512Mi",
    explanation:
      "LimitRanges set defaults and bounds for pods that don't specify resources.",
  },
  {
    id: "k8s-resource-requests",
    category: "kubernetes",
    level: "workflow",
    prompt: "In a pod spec, request 256Mi of memory.",
    answer: "resources: {requests: {memory: 256Mi}}",
    explanation:
      "Requests guarantee scheduling; limits cap usage.",
  },
  {
    id: "k8s-probe-liveness",
    category: "kubernetes",
    level: "workflow",
    prompt: "Add a liveness probe hitting /healthz on port 8080.",
    answer: "livenessProbe: {httpGet: {path: /healthz, port: 8080}}",
    explanation:
      "A failing liveness probe restarts the container.",
  },
  {
    id: "k8s-probe-readiness",
    category: "kubernetes",
    level: "workflow",
    prompt: "Add a readiness probe that runs 'cat /tmp/ready'.",
    answer: "readinessProbe: {exec: {command: [cat, /tmp/ready]}}",
    explanation:
      "A failing readiness probe removes the pod from service endpoints.",
  },
  {
    id: "k8s-requests-limits-yaml",
    category: "kubernetes",
    level: "workflow",
    prompt: "Set both a CPU request of 100m and a limit of 500m.",
    answer: "resources: {requests: {cpu: 100m}, limits: {cpu: 500m}}",
    explanation:
      "100m = 0.1 CPU; requests schedule it, limits throttle it.",
  },
  {
    id: "k8s-get-all-1",
    category: "kubernetes",
    level: "core",
    prompt: "List every common resource kind in the namespace at once.",
    answer: "kubectl get all",
    explanation:
      "Shows pods, services, deployments, and more — a namespace overview.",
  },
  {
    id: "k8s-get-all-ns",
    category: "kubernetes",
    level: "workflow",
    prompt: "See all workloads across every namespace.",
    answer: "kubectl get all -A",
    explanation:
      "The cluster-wide sweep — great for finding things in unexpected namespaces.",
  },
  {
    id: "k8s-watch",
    category: "kubernetes",
    level: "core",
    prompt: "Watch pods live as they are created and deleted.",
    answer: "kubectl get pods -w",
    explanation:
      "`-w` (watch) streams updates until you Ctrl+C.",
  },
  {
    id: "k8s-watch-events",
    category: "kubernetes",
    level: "workflow",
    prompt: "Follow events live while you deploy.",
    answer: "kubectl get events -w",
    explanation:
      "Streaming events lets you watch the rollout react in real time.",
  },
  {
    id: "k8s-logout-check",
    category: "kubernetes",
    level: "core",
    prompt: "Print your current user and cluster from the kubeconfig.",
    answer: "kubectl config view --minify",
    explanation:
      "The minified view shows just the active context's cluster, user, and namespace.",
  },
  {
    id: "k8s-namespace-shortcut",
    category: "kubernetes",
    level: "core",
    prompt: "Run a command in the 'kube-system' namespace without switching context.",
    answer: "kubectl get pods -n kube-system",
    explanation:
      "`-n` overrides the namespace per command — no context change needed.",
  },
  {
    id: "k8s-system-pods",
    category: "kubernetes",
    level: "core",
    prompt: "List the control-plane pods (API server, etcd, scheduler).",
    answer: "kubectl get pods -n kube-system",
    explanation:
      "kube-system hosts the control plane and cluster add-ons.",
  },
  {
    id: "k8s-kubeconfig-path",
    category: "kubernetes",
    level: "core",
    prompt: "Show which kubeconfig file kubectl is using.",
    answer: "kubectl config view --raw | grep -m1 '^users:'",
    explanation:
      "`kubectl config view` shows the merged config; `echo $KUBECONFIG` names the files.",
  },
  {
    id: "k8s-version-check",
    category: "kubernetes",
    level: "core",
    prompt: "Show the client and server Kubernetes versions.",
    answer: "kubectl version",
    explanation:
      "A big client/server mismatch (or 'connection refused') points to config problems.",
  },
  {
    id: "k8s-api-check",
    category: "kubernetes",
    level: "workflow",
    prompt: "Check the API server is reachable and healthy.",
    answer: "kubectl cluster-info",
    explanation:
      "`cluster-info` prints the control-plane endpoints; `kubectl cluster-info dump` exports debugging data.",
  },
  {
    id: "k8s-proxy",
    category: "kubernetes",
    level: "workflow",
    prompt: "Start a local proxy to the Kubernetes API.",
    answer: "kubectl proxy",
    explanation:
      "Serves the API at localhost:8001 — handy for curl-ing the API directly.",
  },
  {
    id: "k8s-auth-check",
    category: "kubernetes",
    level: "workflow",
    prompt: "Verify you can access the 'pods' resource.",
    answer: "kubectl auth can-i get pods",
    explanation:
      "`auth can-i` answers RBAC questions without trying a real call.",
  },
  {
    id: "k8s-api-versions",
    category: "kubernetes",
    level: "core",
    prompt: "List the API versions the cluster serves.",
    answer: "kubectl api-versions",
    explanation:
      "Shows groups/versions like apps/v1, networking.k8s.io/v1 — useful for manifest upgrades.",
  },
  {
    id: "k8s-config-view",
    category: "kubernetes",
    level: "core",
    prompt: "Print the full merged kubeconfig.",
    answer: "kubectl config view",
    explanation:
      "`config view` shows contexts, clusters, and users (values masked with --raw).",
  },
  {
    id: "k8s-pod-restart-count",
    category: "kubernetes",
    level: "workflow",
    prompt: "See restart counts to spot crash-looping pods.",
    answer: "kubectl get pods",
    explanation:
      "The RESTARTS column rising fast signals a crash loop; check with logs --previous.",
  },
  {
    id: "k8s-wait-ready",
    category: "kubernetes",
    level: "workflow",
    prompt: "Wait until the deployment 'web' is fully rolled out.",
    answer: "kubectl rollout status deployment/web --timeout=120s",
    explanation:
      "Blocks (up to the timeout) until the rollout completes — the CI-friendly version.",
  },
  {
    id: "k8s-wait-condition",
    category: "kubernetes",
    level: "workflow",
    prompt: "Wait for a specific pod to become Ready.",
    answer: "kubectl wait --for=condition=Ready pod/web-0",
    explanation:
      "`kubectl wait` blocks on a condition — ready for scripting.",
  },
  {
    id: "k8s-delete-ns",
    category: "kubernetes",
    level: "workflow",
    prompt: "Delete the entire 'staging' namespace and everything in it.",
    answer: "kubectl delete namespace staging",
    explanation:
      "Namespace deletion removes all contained resources — a big hammer.",
  },
  {
    id: "k8s-cleanup-terminating",
    category: "kubernetes",
    level: "workflow",
    prompt: "Force-remove a namespace stuck in Terminating.",
    answer: "kubectl delete namespace stuck --grace-period=0 --force",
    explanation:
      "For stuck namespaces, force delete — the finalizers may still need manual cleanup.",
  },
  {
    id: "k8s-multi-doc-manifest",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply a manifest file containing several YAML documents separated by ---.",
    answer: "kubectl apply -f multi.yaml",
    explanation:
      "kubectl handles multi-document YAML files natively.",
  },
  {
    id: "k8s-apply-stdin",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply a manifest piped from a command.",
    answer: "cat deploy.yaml | kubectl apply -f -",
    explanation:
      "The `-` argument reads the manifest from stdin.",
  },
  {
    id: "k8s-helm-check",
    category: "kubernetes",
    level: "workflow",
    prompt: "See which Helm releases are deployed in the cluster.",
    answer: "helm list",
    explanation:
      "Helm manages packaged apps; `helm list -A` shows all namespaces.",
  },
  {
    id: "k8s-kustomize-build",
    category: "kubernetes",
    level: "workflow",
    prompt: "Render the kustomization.yaml in ./kustomize as final YAML.",
    answer: "kubectl kustomize ./kustomize",
    explanation:
      "`kubectl kustomize` builds the overlay; `kubectl apply -k ./kustomize` applies it.",
  },
  {
    id: "k8s-apply-kustomize",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply a kustomize overlay directory.",
    answer: "kubectl apply -k ./overlays/prod",
    explanation:
      "`-k` renders and applies the kustomization in one step.",
  },
  {
    id: "k8s-fields-owner",
    category: "kubernetes",
    level: "core",
    prompt: "Show which controller owns the replicaset 'web-6b7f5'.",
    answer: "kubectl get rs web-6b7f5 -o jsonpath='{.metadata.ownerReferences[0].name}'",
    explanation:
      "ownerReferences link ReplicaSets to their Deployment.",
  },
  {
    id: "k8s-delete-by-label",
    category: "kubernetes",
    level: "workflow",
    prompt: "Delete all pods with the label run=cleanup.",
    answer: "kubectl delete pods -l run=cleanup",
    explanation:
      "Label selectors make targeted bulk deletion safe.",
  },
  {
    id: "k8s-get-watch-events-filter",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show events for just the pod 'web-0'.",
    answer: "kubectl get events --field-selector involvedObject.name=web-0",
    explanation:
      "Field selectors narrow events to a specific object.",
  },
  {
    id: "k8s-describe-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show a node's capacity and conditions.",
    answer: "kubectl describe node node-1",
    explanation:
      "Node capacity, allocatable resources, taints, and conditions live in the describe output.",
  },
  {
    id: "k8s-pod-phase",
    category: "kubernetes",
    level: "core",
    prompt: "List pods and their phase only.",
    answer: "kubectl get pods -o custom-columns=NAME:.metadata.name,PHASE:.status.phase",
    explanation:
      "Custom columns isolate the phase (Running/Pending/…) for quick triage.",
  },
  {
    id: "k8s-restart-policy",
    category: "kubernetes",
    level: "core",
    prompt: "In a pod spec, never restart the container automatically.",
    answer: "restartPolicy: Never",
    explanation:
      "Pods default to Always; Never suits one-shot tasks.",
  },
  {
    id: "k8s-command-args",
    category: "kubernetes",
    level: "workflow",
    prompt: "Override the container's command to run 'sleep 100'.",
    answer: "command: [\"sleep\", \"100\"]",
    explanation:
      "`command` replaces ENTRYPOINT; `args` overrides CMD.",
  },
  {
    id: "k8s-image-pull-policy",
    category: "kubernetes",
    level: "workflow",
    prompt: "Always pull the image, even if it exists locally.",
    answer: "imagePullPolicy: Always",
    explanation:
      "Useful with `latest` tags so nodes don't run stale images.",
  },
  {
    id: "k8s-init-container",
    category: "kubernetes",
    level: "workflow",
    prompt: "Add an init container that waits for the db service before the app starts.",
    answer: "initContainers: [{name: wait-db, image: busybox, command: [\"sh\", \"-c\", \"until nc -z db 5432; do sleep 1; done\"]}]",
    explanation:
      "Init containers run to completion before main containers start.",
  },
  {
    id: "k8s-sidecar-share",
    category: "kubernetes",
    level: "workflow",
    prompt: "Which volume type lets two containers in the same pod share files?",
    answer: "emptyDir",
    explanation:
      "An emptyDir volume lives for the pod's lifetime and can be mounted by every container — the standard way sidecars share files.",
  },
  {
    id: "k8s-empty-dir",
    category: "kubernetes",
    level: "workflow",
    prompt: "Use a temporary emptyDir volume for scratch space in a pod.",
    answer: "emptyDir: {}",
    explanation:
      "emptyDir lives only as long as the pod — ideal for caches and shared temp files.",
  },
  {
    id: "k8s-host-path",
    category: "kubernetes",
    level: "workflow",
    prompt: "Mount the node's /var/log into a pod at /var/log.",
    answer: "hostPath: {path: /var/log}",
    explanation:
      "hostPath exposes a node directory — used by log agents but risky for general use.",
  },
  {
    id: "k8s-pod-security-context",
    category: "kubernetes",
    level: "workflow",
    prompt: "Run the pod's containers as non-root (uid 1000).",
    answer: "securityContext: {runAsUser: 1000}",
    explanation:
      "Pod/container securityContext hardens workloads; add readOnlyRootFilesystem for more.",
  },
  {
    id: "k8s-network-policy-isolation",
    category: "kubernetes",
    level: "workflow",
    prompt: "Deny all ingress traffic to pods labeled app=web.",
    answer: "kubectl create networkpolicy deny-all --pod-selector=app=web",
    explanation:
      "A NetworkPolicy with no ingress rules blocks all inbound — `kubectl create networkpolicy` generates exactly that.",
  },
  {
    id: "k8s-network-policy-allow",
    category: "kubernetes",
    level: "workflow",
    prompt: "Allow ingress to app=web only from app=frontend pods.",
    answer: "ingress: [{from: [{podSelector: {matchLabels: {app: frontend}}}]}]",
    explanation:
      "The from clause with a podSelector whitelists specific source pods.",
  },
  {
    id: "k8s-storage-class-name",
    category: "kubernetes",
    level: "workflow",
    prompt: "Request a specific storage class 'fast-ssd' in a PVC.",
    answer: "storageClassName: fast-ssd",
    explanation:
      "The PVC field selects which provisioner creates its volume.",
  },
  {
    id: "k8s-pod-affinity",
    category: "kubernetes",
    level: "workflow",
    prompt: "Prefer scheduling a pod near other pods labeled app=cache.",
    answer: "affinity: {podAffinity: {preferredDuringSchedulingIgnoredDuringExecution: []}}",
    explanation:
      "Affinity rules steer scheduling; anti-affinity spreads replicas for HA.",
  },
  {
    id: "k8s-toleration",
    category: "kubernetes",
    level: "workflow",
    prompt: "Allow a pod to schedule on tainted nodes with gpu=true:NoSchedule.",
    answer: "tolerations: [{key: gpu, operator: Exists, effect: NoSchedule}]",
    explanation:
      "Tolerations let pods onto tainted nodes; the taint still repels everything else.",
  },
  {
    id: "k8s-multicontainer-logs",
    category: "kubernetes",
    level: "workflow",
    prompt: "Get the previous run's logs from the 'app' container specifically.",
    answer: "kubectl logs app-1 -c app --previous",
    explanation:
      "Combine `-c` and `--previous` to debug a specific crashing container.",
  },
  {
    id: "k8s-copy-secret-to-pod",
    category: "kubernetes",
    level: "workflow",
    prompt: "In a pod spec, declare the volume that mounts secret 'db-secret' under the name 'db'.",
    answer: "volumes: [{name: db, secret: {secretName: db-secret}}]",
    explanation:
      "The volume entry sources a secret by name; a matching volumeMount then exposes it at a path.",
  },
  {
    id: "k8s-configmap-env-from",
    category: "kubernetes",
    level: "workflow",
    prompt: "Load every key of ConfigMap 'app-config' as environment variables.",
    answer: "envFrom: [{configMapRef: {name: app-config}}]",
    explanation:
      "envFrom injects all ConfigMap keys as env vars at once.",
  },
  {
    id: "k8s-secret-env",
    category: "kubernetes",
    level: "workflow",
    prompt: "Expose the secret key 'password' as the env var DB_PASSWORD.",
    answer: "env: [{name: DB_PASSWORD, valueFrom: {secretKeyRef: {name: db-secret, key: password}}}]",
    explanation:
      "secretKeyRef maps one secret key to one environment variable.",
  },
  {
    id: "k8s-debug-ephemeral",
    category: "kubernetes",
    level: "workflow",
    prompt: "Start a temporary debug container alongside a crashing pod.",
    answer: "kubectl debug -it web-0 --image=busybox -- /bin/sh",
    explanation:
      "`kubectl debug` adds an ephemeral container to inspect a pod without modifying it.",
  },
  {
    id: "k8s-debug-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Debug a node by running a diagnostic pod on it.",
    answer: "kubectl debug node/node-1 -it --image=busybox",
    explanation:
      "Node debug targets a specific node from your workstation.",
  },
  {
    id: "k8s-copy-many-files",
    category: "kubernetes",
    level: "workflow",
    prompt: "Copy an entire directory from a pod to local ./backup.",
    answer: "kubectl cp web-0:/app/data ./backup",
    explanation:
      "kubectl cp handles directories recursively (requires tar in the container).",
  },
  {
    id: "k8s-logs-all-containers",
    category: "kubernetes",
    level: "workflow",
    prompt: "Stream logs from every container in a multi-container pod.",
    answer: "kubectl logs app-1 --all-containers",
    explanation:
      "`--all-containers` (or -A) follows all containers in the pod.",
  },
  {
    id: "k8s-restart-deployment-config",
    category: "kubernetes",
    level: "workflow",
    prompt: "After editing a ConfigMap, make pods pick it up without changing the image.",
    answer: "kubectl rollout restart deployment web",
    explanation:
      "Rollout restart cycles pods so mounted ConfigMaps/secrets re-read.",
  },
  {
    id: "k8s-batch-processing",
    category: "kubernetes",
    level: "workflow",
    prompt: "Run a batch of 4 parallel pods for a job that processes data.",
    answer: "kubectl create job batch --image=worker --parallelism=4",
    explanation:
      "`--parallelism` runs several pods concurrently until the job completes.",
  },
  {
    id: "k8s-cronjob-suspend",
    category: "kubernetes",
    level: "workflow",
    prompt: "Pause a cronjob so it stops firing.",
    answer: "kubectl patch cronjob backup -p '{\"spec\":{\"suspend\":true}}'",
    explanation:
      "`suspend: true` halts future runs while keeping the cronjob object.",
  },
  {
    id: "k8s-hpa-list",
    category: "kubernetes",
    level: "core",
    prompt: "List horizontal pod autoscalers.",
    answer: "kubectl get hpa",
    explanation:
      "HPAs show current vs desired replicas and the CPU target.",
  },
  {
    id: "k8s-pdb-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Ensure at least 2 replicas of 'web' stay available during disruptions.",
    answer: "kubectl create poddisruptionbudget web-pdb --selector=app=web --min-available=2",
    explanation:
      "PDBs constrain voluntary disruptions like drains and node maintenance.",
  },
  {
    id: "k8s-pdb-list",
    category: "kubernetes",
    level: "core",
    prompt: "List pod disruption budgets.",
    answer: "kubectl get pdb",
    explanation:
      "Shows min-available/max-unavailable and current disruptions.",
  },
  {
    id: "k8s-leader-election-pod",
    category: "kubernetes",
    level: "workflow",
    prompt: "Ensure only one replica of a deployment runs at a time.",
    answer: "kubectl scale deployment worker --replicas=1",
    explanation:
      "Scaling to one replica guarantees a single instance (or use a leader-election lib).",
  },
  {
    id: "k8s-deployment-strategy",
    category: "kubernetes",
    level: "workflow",
    prompt: "Use a Recreate deployment strategy for a stateful app.",
    answer: "strategy: {type: Recreate}",
    explanation:
      "Recreate kills old pods before starting new ones — no overlap, brief downtime.",
  },
  {
    id: "k8s-max-unavailable",
    category: "kubernetes",
    level: "workflow",
    prompt: "Roll out a deployment allowing at most 25% downtime.",
    answer: "strategy: {rollingUpdate: {maxUnavailable: 25%}}",
    explanation:
      "maxUnavailable bounds how many pods can be down during a rolling update.",
  },
  {
    id: "k8s-termination-grace",
    category: "kubernetes",
    level: "workflow",
    prompt: "Give pods 60 seconds to shut down gracefully.",
    answer: "terminationGracePeriodSeconds: 60",
    explanation:
      "The window before SIGKILL after SIGTERM — drain hooks need this.",
  },
  {
    id: "k8s-pre-stop-hook",
    category: "kubernetes",
    level: "workflow",
    prompt: "Deregister a pod from the load balancer before it stops.",
    answer: "lifecycle: {preStop: {exec: {command: [\"/bin/sh\", \"-c\", \"curl -X POST http://localhost/offline\"]}}}",
    explanation:
      "preStop hooks run before SIGTERM, giving apps a clean offline step.",
  },
  {
    id: "k8s-service-session-affinity",
    category: "kubernetes",
    level: "workflow",
    prompt: "Pin a client to one pod for the life of its session.",
    answer: "sessionAffinity: ClientIP",
    explanation:
      "ClientIP affinity routes requests from one IP to the same pod.",
  },
  {
    id: "k8s-external-name",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a service that points to an external hostname (legacy DB).",
    answer: "kubectl create service externalname legacy-db --external-name=db.legacy.example.com",
    explanation:
      "ExternalName services map a cluster DNS name to an external FQDN.",
  },
  {
    id: "k8s-external-ip-service",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a service reachable via the node's IP on port 30080.",
    answer: "kubectl create service nodeport web --tcp=80:30080",
    explanation:
      "NodePort services open a port on every node's IP.",
  },
  {
    id: "k8s-headless-service",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a service without a cluster IP for direct pod DNS.",
    answer: "clusterIP: None",
    explanation:
      "Headless services return pod IPs directly — used by StatefulSets.",
  },
  {
    id: "k8s-secret-registry",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a docker-registry secret to pull private images.",
    answer: "kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=user --docker-password=pass",
    explanation:
      "Image pull secrets let pods authenticate to private registries.",
  },
  {
    id: "k8s-attach-secret-pull",
    category: "kubernetes",
    level: "workflow",
    prompt: "Attach the 'regcred' image pull secret to a service account.",
    answer: "kubectl patch serviceaccount default -p '{\"imagePullSecrets\":[{\"name\":\"regcred\"}]}'",
    explanation:
      "Patching the SA makes every pod using it able to pull private images.",
  },
  {
    id: "k8s-pod-security-psa",
    category: "kubernetes",
    level: "workflow",
    prompt: "Enforce the restricted Pod Security Standard on a namespace.",
    answer: "kubectl label ns default pod-security.kubernetes.io/enforce=restricted",
    explanation:
      "PSA labels gate admission based on pod security levels.",
  },
  {
    id: "k8s-logs-color",
    category: "kubernetes",
    level: "core",
    prompt: "Colorize kubectl logs output for readability.",
    answer: "kubectl logs web-0 --color",
    explanation:
      "`--color` (newer kubectl) tints output; `kubectl logs -f` plus `| ccze` also works.",
  },
  {
    id: "k8s-short-names",
    category: "kubernetes",
    level: "core",
    prompt: "Get nodes using the short resource name.",
    answer: "kubectl get no",
    explanation:
      "`no` is the short name for nodes, like svc, deploy, cm, sa, ing.",
  },
  {
    id: "k8s-kind-list",
    category: "kubernetes",
    level: "workflow",
    prompt: "List all pods along with their resource kind names.",
    answer: "kubectl get pods -o custom-columns=KIND:.kind,NAME:.metadata.name",
    explanation:
      "Custom columns reveal the API kind of returned objects.",
  },
  {
    id: "k8s-run-curl",
    category: "kubernetes",
    level: "workflow",
    prompt: "Run a temporary curl pod to test a service endpoint.",
    answer: "kubectl run curl-test --rm -it --image=curlimages/curl -- curl http://web:80",
    explanation:
      "`--rm` deletes the pod after it exits — a disposable network tester.",
  },
  {
    id: "k8s-attach-pod",
    category: "kubernetes",
    level: "core",
    prompt: "Attach to the running process in pod 'web-0'.",
    answer: "kubectl attach web-0",
    explanation:
      "`attach` connects to the container's main process stdout/stderr.",
  },
  {
    id: "k8s-cp-pod-to-pod",
    category: "kubernetes",
    level: "workflow",
    prompt: "Copy a file from pod A to pod B (via your machine).",
    answer: "kubectl cp a-pod:/src b-pod:/dst",
    explanation:
      "kubectl cp between two pods streams through your local machine.",
  },
  {
    id: "k8s-token-create",
    category: "kubernetes",
    level: "workflow",
    prompt: "Create a token for the 'deployer' service account.",
    answer: "kubectl create token deployer",
    explanation:
      "`create token` mints a short-lived bearer token for a service account.",
  },
  {
    id: "k8s-context-set-user",
    category: "kubernetes",
    level: "workflow",
    prompt: "Point the current context's user at 'ops-user'.",
    answer: "kubectl config set-context --current --user=ops-user",
    explanation:
      "Swapping the user on a context changes credentials without touching the cluster.",
  },
  {
    id: "k8s-apply-last-applied",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show the last-applied configuration of a deployment.",
    answer: "kubectl get deployment web -o jsonpath='{.metadata.annotations.kubectl\\.kubernetes\\.io/last-applied-configuration}'",
    explanation:
      "The last-applied annotation powers three-way apply merges.",
  },
  {
    id: "k8s-prune",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply manifests and delete resources no longer present in them.",
    answer: "kubectl apply --prune -f ./manifests",
    explanation:
      "`--prune` removes objects that the manifests no longer define (use with labels).",
  },
  {
    id: "k8s-server-apply",
    category: "kubernetes",
    level: "workflow",
    prompt: "Apply a manifest using server-side apply.",
    answer: "kubectl apply --server-side -f deploy.yaml",
    explanation:
      "Server-side apply stores ownership per field, reducing conflicts.",
  },
  {
    id: "k8s-managed-fields",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show who owns each field of an object.",
    answer: "kubectl get deployment web -o jsonpath='{.metadata.managedFields[*].manager}'",
    explanation:
      "managedFields records which controller/client last set each field.",
  },
  {
    id: "k8s-finalizers",
    category: "kubernetes",
    level: "workflow",
    prompt: "List the finalizers on a namespace (why it's stuck).",
    answer: "kubectl get namespace stuck -o jsonpath='{.metadata.finalizers}'",
    explanation:
      "Remaining finalizers block deletion; removing them un-sticks the object.",
  },
  {
    id: "k8s-resource-quota-usage",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show how much of a namespace's quota is used.",
    answer: "kubectl describe resourcequota my-quota",
    explanation:
      "describe shows used vs hard limits for each resource.",
  },
  {
    id: "k8s-events-namespace",
    category: "kubernetes",
    level: "core",
    prompt: "Show events from the 'staging' namespace.",
    answer: "kubectl get events -n staging",
    explanation:
      "Namespace-scoped event listing keeps triage focused.",
  },
  {
    id: "k8s-jsonpath-items",
    category: "kubernetes",
    level: "workflow",
    prompt: "Print the name of every pod as a list.",
    answer: "kubectl get pods -o jsonpath='{.items[*].metadata.name}'",
    explanation:
      "The wildcard `.items[*]` iterates all returned objects.",
  },
  {
    id: "k8s-yaml-output",
    category: "kubernetes",
    level: "core",
    prompt: "Get pod 'web-0' as clean YAML.",
    answer: "kubectl get pod web-0 -o yaml",
    explanation:
      "`-o yaml` prints the object — the starting point for understanding spec fields.",
  },
  {
    id: "k8s-watch-node",
    category: "kubernetes",
    level: "workflow",
    prompt: "Watch node status changes live.",
    answer: "kubectl get nodes -w",
    explanation:
      "Streams node updates — useful during cluster maintenance.",
  },
  {
    id: "k8s-debug-all-cond",
    category: "kubernetes",
    level: "workflow",
    prompt: "Show each pod's conditions to spot scheduling issues.",
    answer: "kubectl get pods -o custom-columns=NAME:.metadata.name,READY:.status.conditions[?(@.type==\"Ready\")].status",
    explanation:
      "Condition jsonpath reveals PodScheduled/Ready state at a glance.",
  },
];
