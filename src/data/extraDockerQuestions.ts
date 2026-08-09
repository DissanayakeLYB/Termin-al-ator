import type { QuizQuestion } from "./questions";

/**
 * Additional docker questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const dockerExtraQuestions: QuizQuestion[] = [
  {
    id: "docker-run-interactive",
    category: "docker",
    level: "pareto",
    prompt: "Run an Ubuntu container with an interactive shell.",
    answer: "docker run -it ubuntu bash",
    explanation:
      "`-i` keeps stdin open, `-t` allocates a TTY; the image is pulled automatically if missing.",
  },
  {
    id: "docker-run-detached-1",
    category: "docker",
    level: "pareto",
    prompt: "Run an nginx container in the background.",
    answer: "docker run -d nginx",
    explanation:
      "`-d` detaches, returning a container id. Check it with `docker ps`.",
  },
  {
    id: "docker-run-name-1",
    category: "docker",
    level: "core",
    prompt: "Run a container named 'web' from the nginx image.",
    answer: "docker run --name web nginx",
    explanation:
      "`--name` gives the container a predictable handle for later commands.",
  },
  {
    id: "docker-run-remove",
    category: "docker",
    level: "core",
    prompt: "Run a quick alpine container that deletes itself on exit.",
    answer: "docker run --rm alpine echo hi",
    explanation:
      "`--rm` removes the container automatically when it exits — perfect for one-shot commands.",
  },
  {
    id: "docker-run-port-1",
    category: "docker",
    level: "core",
    prompt: "Expose container port 80 as host port 8080.",
    answer: "docker run -p 8080:80 nginx",
    explanation:
      "`-p host:container` maps ports. `-P` publishes all exposed ports on random host ports.",
  },
  {
    id: "docker-run-env-1",
    category: "docker",
    level: "core",
    prompt: "Run a container with the environment variable MODE=prod.",
    answer: "docker run -e MODE=prod image",
    explanation:
      "`-e` sets an env var inside the container; repeat for more variables.",
  },
  {
    id: "docker-run-env-file",
    category: "docker",
    level: "core",
    prompt: "Load environment variables from .env into a container.",
    answer: "docker run --env-file .env image",
    explanation:
      "`--env-file` reads KEY=VALUE lines from a file into the container environment.",
  },
  {
    id: "docker-run-volume-1",
    category: "docker",
    level: "core",
    prompt: "Mount the local ./data directory into a container at /data.",
    answer: "docker run -v ./data:/data image",
    explanation:
      "`-v host:container` bind-mounts a host directory (absolute paths work too).",
  },
  {
    id: "docker-run-workdir",
    category: "docker",
    level: "core",
    prompt: "Start a container whose working directory is /app.",
    answer: "docker run -w /app image",
    explanation:
      "`-w` sets the initial working directory, overriding the image's WORKDIR.",
  },
  {
    id: "docker-run-user",
    category: "docker",
    level: "core",
    prompt: "Run a container as a non-root user with uid 1000.",
    answer: "docker run -u 1000 image",
    explanation:
      "`-u` runs with the given uid — avoids root-owned files when bind-mounting.",
  },
  {
    id: "docker-run-restart",
    category: "docker",
    level: "core",
    prompt: "Run a container that restarts automatically unless explicitly stopped.",
    answer: "docker run --restart unless-stopped image",
    explanation:
      "`--restart unless-stopped` survives daemon restarts and crashes but not explicit stops.",
  },
  {
    id: "docker-ps-all-1",
    category: "docker",
    level: "pareto",
    prompt: "List all containers including stopped ones.",
    answer: "docker ps -a",
    explanation:
      "`docker ps` shows running containers; `-a` includes exited ones.",
  },
  {
    id: "docker-ps-format",
    category: "docker",
    level: "core",
    prompt: "List only container names and their ports.",
    answer: "docker ps --format '{{.Names}} {{.Ports}}'",
    explanation:
      "`--format` uses Go templates to pick fields like {{.Names}}, {{.Image}}, {{.Status}}.",
  },
  {
    id: "docker-exec-shell",
    category: "docker",
    level: "core",
    prompt: "Open a shell inside the running container 'web'.",
    answer: "docker exec -it web bash",
    explanation:
      "`docker exec -it web bash` runs a new process inside a running container.",
  },
  {
    id: "docker-exec-command",
    category: "docker",
    level: "core",
    prompt: "Run 'ls /app' inside the container 'web'.",
    answer: "docker exec web ls /app",
    explanation:
      "`docker exec` runs a command in the container without a TTY.",
  },
  {
    id: "docker-stop-1",
    category: "docker",
    level: "pareto",
    prompt: "Stop the running container 'web'.",
    answer: "docker stop web",
    explanation:
      "`docker stop` sends SIGTERM and waits; `docker kill` sends SIGKILL immediately.",
  },
  {
    id: "docker-kill",
    category: "docker",
    level: "core",
    prompt: "Immediately kill the container 'web'.",
    answer: "docker kill web",
    explanation:
      "`docker kill` force-kills without a grace period — for containers that ignore SIGTERM.",
  },
  {
    id: "docker-start-1",
    category: "docker",
    level: "core",
    prompt: "Restart a stopped container 'web'.",
    answer: "docker start web",
    explanation:
      "`docker start` re-runs an existing stopped container (state preserved).",
  },
  {
    id: "docker-restart-1",
    category: "docker",
    level: "core",
    prompt: "Restart the container 'web'.",
    answer: "docker restart web",
    explanation:
      "`docker restart` stops and starts the container, keeping its config.",
  },
  {
    id: "docker-rm-container",
    category: "docker",
    level: "core",
    prompt: "Delete the stopped container 'old'.",
    answer: "docker rm old",
    explanation:
      "`docker rm` removes a stopped container. `docker rm -f` also removes running ones.",
  },
  {
    id: "docker-rm-force-1",
    category: "docker",
    level: "core",
    prompt: "Force-delete the running container 'web'.",
    answer: "docker rm -f web",
    explanation:
      "`-f` kills and removes in one step, skipping the separate stop.",
  },
  {
    id: "docker-rm-all-containers",
    category: "docker",
    level: "core",
    prompt: "Remove every stopped container.",
    answer: "docker container prune",
    explanation:
      "`docker container prune` (or `docker system prune`) clears stopped containers; `-f` skips the prompt.",
  },
  {
    id: "docker-logs-1",
    category: "docker",
    level: "pareto",
    prompt: "Show the logs of the container 'web'.",
    answer: "docker logs web",
    explanation:
      "`docker logs web` prints stdout/stderr. `docker logs -f web` follows like tail -f.",
  },
  {
    id: "docker-logs-tail",
    category: "docker",
    level: "core",
    prompt: "Show the last 50 lines of the container 'web' logs.",
    answer: "docker logs --tail 50 web",
    explanation:
      "`--tail N` limits output. `docker logs -t` adds timestamps.",
  },
  {
    id: "docker-logs-since",
    category: "docker",
    level: "core",
    prompt: "Show logs from 'web' since 10 minutes ago.",
    answer: "docker logs --since 10m web",
    explanation:
      "`--since` accepts durations like 10m, 1h, or absolute timestamps.",
  },
  {
    id: "docker-inspect-1",
    category: "docker",
    level: "core",
    prompt: "Show detailed configuration of the container 'web' as JSON.",
    answer: "docker inspect web",
    explanation:
      "`docker inspect` dumps container metadata. `--format '{{.State.Status}}'` extracts fields.",
  },
  {
    id: "docker-inspect-ip",
    category: "docker",
    level: "core",
    prompt: "Show the IP address of the container 'web'.",
    answer: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web",
    explanation:
      "The template walks the networks map to print the container's IP.",
  },
  {
    id: "docker-top-1",
    category: "docker",
    level: "core",
    prompt: "Show the running processes inside the container 'web'.",
    answer: "docker top web",
    explanation:
      "`docker top` lists processes in the container, similar to `ps` on the host.",
  },
  {
    id: "docker-stats-1",
    category: "docker",
    level: "core",
    prompt: "Show live CPU and memory usage of all running containers.",
    answer: "docker stats",
    explanation:
      "`docker stats` streams resource usage; `docker stats --no-stream` prints one snapshot.",
  },
  {
    id: "docker-cp-host-to-container",
    category: "docker",
    level: "core",
    prompt: "Copy local.conf into the container 'web' at /etc/app/local.conf.",
    answer: "docker cp local.conf web:/etc/app/local.conf",
    explanation:
      "`docker cp` copies between host and container paths in either direction.",
  },
  {
    id: "docker-cp-container-to-host",
    category: "docker",
    level: "core",
    prompt: "Copy /app/data.db out of container 'web' to the current directory.",
    answer: "docker cp web:/app/data.db .",
    explanation:
      "The container path comes first when pulling files out: `docker cp web:/path .`",
  },
  {
    id: "docker-port-map",
    category: "docker",
    level: "core",
    prompt: "Show the host port mapping for container 'web'.",
    answer: "docker port web",
    explanation:
      "`docker port` prints the published port bindings for the container.",
  },
  {
    id: "docker-events",
    category: "docker",
    level: "core",
    prompt: "Stream real-time docker events as containers start and stop.",
    answer: "docker events",
    explanation:
      "`docker events` streams daemon events; add `--filter container=web` to narrow it.",
  },
  {
    id: "docker-diff",
    category: "docker",
    level: "core",
    prompt: "Show files changed in the container 'web' since it started.",
    answer: "docker diff web",
    explanation:
      "`docker diff` lists added/modified/deleted paths in the container's writable layer.",
  },
  {
    id: "docker-images-1",
    category: "docker",
    level: "pareto",
    prompt: "List all locally downloaded images.",
    answer: "docker images",
    explanation:
      "`docker images` shows repo, tag, id, and size. `docker image ls` is the newer alias.",
  },
  {
    id: "docker-pull-1",
    category: "docker",
    level: "core",
    prompt: "Download the postgres:16 image without running it.",
    answer: "docker pull postgres:16",
    explanation:
      "`docker pull` fetches the image and its layers from the registry.",
  },
  {
    id: "docker-push-1",
    category: "docker",
    level: "core",
    prompt: "Upload the local image myapp:v1 to the registry.",
    answer: "docker push myapp:v1",
    explanation:
      "`docker push` uploads; the image name must include the registry/account for public registries.",
  },
  {
    id: "docker-tag-1",
    category: "docker",
    level: "core",
    prompt: "Tag image myapp:v1 as myapp:latest.",
    answer: "docker tag myapp:v1 myapp:latest",
    explanation:
      "`docker tag` creates an additional reference to the same image id.",
  },
  {
    id: "docker-rmi-1",
    category: "docker",
    level: "core",
    prompt: "Remove the local image nginx:latest.",
    answer: "docker rmi nginx:latest",
    explanation:
      "`docker rmi` deletes an image. `docker image prune` cleans dangling ones.",
  },
  {
    id: "docker-build-1",
    category: "docker",
    level: "core",
    prompt: "Build an image from the Dockerfile in the current directory.",
    answer: "docker build -t myapp .",
    explanation:
      "`-t` tags the result; the trailing `.` is the build context.",
  },
  {
    id: "docker-build-file",
    category: "docker",
    level: "core",
    prompt: "Build using a Dockerfile named Dockerfile.dev.",
    answer: "docker build -f Dockerfile.dev -t myapp .",
    explanation:
      "`-f` selects the Dockerfile when it isn't named Dockerfile.",
  },
  {
    id: "docker-build-no-cache",
    category: "docker",
    level: "core",
    prompt: "Rebuild an image ignoring the layer cache.",
    answer: "docker build --no-cache -t myapp .",
    explanation:
      "`--no-cache` forces every instruction to re-run — useful when stale cache hides problems.",
  },
  {
    id: "docker-build-arg",
    category: "docker",
    level: "core",
    prompt: "Pass the build-time variable VERSION=1.2 during a build.",
    answer: "docker build --build-arg VERSION=1.2 -t myapp .",
    explanation:
      "`--build-arg` feeds ARG values declared in the Dockerfile.",
  },
  {
    id: "docker-history-1",
    category: "docker",
    level: "core",
    prompt: "Show the layer-by-layer history of image myapp.",
    answer: "docker history myapp",
    explanation:
      "`docker history` lists each image layer with its size and the command that created it.",
  },
  {
    id: "docker-save-1",
    category: "docker",
    level: "core",
    prompt: "Save image myapp to a tar file for transfer.",
    answer: "docker save -o myapp.tar myapp",
    explanation:
      "`docker save` exports image layers to a tar; `docker load` imports it.",
  },
  {
    id: "docker-load-1",
    category: "docker",
    level: "core",
    prompt: "Load an image from myapp.tar.",
    answer: "docker load -i myapp.tar",
    explanation:
      "`docker load` imports a tar produced by `docker save`.",
  },
  {
    id: "docker-export-1",
    category: "docker",
    level: "core",
    prompt: "Export a container's filesystem to a tar file.",
    answer: "docker export web -o web-fs.tar",
    explanation:
      "`docker export` snapshots the container's filesystem (no layers, no history).",
  },
  {
    id: "docker-import-1",
    category: "docker",
    level: "core",
    prompt: "Import web-fs.tar as a new image named fsimage.",
    answer: "docker import web-fs.tar fsimage",
    explanation:
      "`docker import` creates an image from a filesystem tar (the counterpart of export).",
  },
  {
    id: "docker-login-1",
    category: "docker",
    level: "core",
    prompt: "Log in to a container registry.",
    answer: "docker login",
    explanation:
      "`docker login` authenticates with the registry (default Docker Hub); `docker logout` clears it.",
  },
  {
    id: "docker-network-ls-1",
    category: "docker",
    level: "core",
    prompt: "List all docker networks.",
    answer: "docker network ls",
    explanation:
      "`docker network ls` shows bridge, host, none, and any custom networks.",
  },
  {
    id: "docker-network-create-1",
    category: "docker",
    level: "core",
    prompt: "Create a custom bridge network named 'app-net'.",
    answer: "docker network create app-net",
    explanation:
      "Custom networks let containers resolve each other by name.",
  },
  {
    id: "docker-network-connect-1",
    category: "docker",
    level: "core",
    prompt: "Attach the running container 'web' to network 'app-net'.",
    answer: "docker network connect app-net web",
    explanation:
      "`docker network connect` adds a container to a network; `disconnect` removes it.",
  },
  {
    id: "docker-run-network",
    category: "docker",
    level: "core",
    prompt: "Run a container attached to the 'app-net' network.",
    answer: "docker run --network app-net image",
    explanation:
      "`--network` selects the network; `--network host` shares the host's network stack.",
  },
  {
    id: "docker-network-inspect-1",
    category: "docker",
    level: "core",
    prompt: "Show the containers attached to network 'app-net'.",
    answer: "docker network inspect app-net",
    explanation:
      "`docker network inspect` lists members and config; the Containers map shows connected endpoints.",
  },
  {
    id: "docker-volume-ls-1",
    category: "docker",
    level: "core",
    prompt: "List all docker volumes.",
    answer: "docker volume ls",
    explanation:
      "`docker volume ls` lists named volumes that persist independently of containers.",
  },
  {
    id: "docker-volume-create-1",
    category: "docker",
    level: "core",
    prompt: "Create a named volume 'db-data'.",
    answer: "docker volume create db-data",
    explanation:
      "Named volumes survive container deletion; attach with `-v db-data:/var/lib/postgresql`.",
  },
  {
    id: "docker-volume-inspect-1",
    category: "docker",
    level: "core",
    prompt: "Show where the volume 'db-data' lives on the host.",
    answer: "docker volume inspect db-data",
    explanation:
      "`docker volume inspect` reports the mountpoint on the host filesystem.",
  },
  {
    id: "docker-volume-prune-1",
    category: "docker",
    level: "core",
    prompt: "Delete all unused volumes.",
    answer: "docker volume prune",
    explanation:
      "`docker volume prune` removes volumes not referenced by any container — data loss risk.",
  },
  {
    id: "docker-run-volume-named",
    category: "docker",
    level: "core",
    prompt: "Mount the named volume 'db-data' at /var/lib/postgresql/data.",
    answer: "docker run -v db-data:/var/lib/postgresql/data postgres",
    explanation:
      "Named-volume mounts are `-v volname:/container/path` (no leading ./ or /).",
  },
  {
    id: "docker-system-df-1",
    category: "docker",
    level: "core",
    prompt: "Show how much disk space docker images, containers, and volumes use.",
    answer: "docker system df",
    explanation:
      "`docker system df` summarizes disk usage across all docker objects.",
  },
  {
    id: "docker-system-prune-1",
    category: "docker",
    level: "workflow",
    prompt: "Clean up all unused images, containers, networks, and build cache.",
    answer: "docker system prune -a",
    explanation:
      "`-a` also removes unused images, not just dangling ones. Add `--volumes` to include volumes.",
  },
  {
    id: "docker-compose-up",
    category: "docker",
    level: "pareto",
    prompt: "Start all services defined in docker-compose.yml.",
    answer: "docker compose up",
    explanation:
      "`docker compose up` builds and starts the stack. Add `-d` to detach.",
  },
  {
    id: "docker-compose-up-detach",
    category: "docker",
    level: "core",
    prompt: "Start the compose stack in the background.",
    answer: "docker compose up -d",
    explanation:
      "`-d` runs services detached; `docker compose ps` shows their status.",
  },
  {
    id: "docker-compose-down",
    category: "docker",
    level: "core",
    prompt: "Stop and remove the compose stack's containers and networks.",
    answer: "docker compose down",
    explanation:
      "`docker compose down` tears down; `-v` also deletes named volumes.",
  },
  {
    id: "docker-compose-down-volumes",
    category: "docker",
    level: "core",
    prompt: "Stop the compose stack and delete its volumes too.",
    answer: "docker compose down -v",
    explanation:
      "`-v` removes volumes — the nuclear option that wipes database data.",
  },
  {
    id: "docker-compose-build",
    category: "docker",
    level: "core",
    prompt: "Build images for the compose services without starting them.",
    answer: "docker compose build",
    explanation:
      "`docker compose build` compiles images per the build section of each service.",
  },
  {
    id: "docker-compose-logs",
    category: "docker",
    level: "core",
    prompt: "Show logs from all compose services.",
    answer: "docker compose logs",
    explanation:
      "`docker compose logs -f` follows all services; `-f <service>` follows one.",
  },
  {
    id: "docker-compose-ps",
    category: "docker",
    level: "core",
    prompt: "Show the running status of compose services.",
    answer: "docker compose ps",
    explanation:
      "`docker compose ps` lists each service with its container and health.",
  },
  {
    id: "docker-compose-exec",
    category: "docker",
    level: "core",
    prompt: "Open a shell in the running compose service 'api'.",
    answer: "docker compose exec api bash",
    explanation:
      "`docker compose exec` runs inside the service's primary container.",
  },
  {
    id: "docker-compose-restart",
    category: "docker",
    level: "core",
    prompt: "Restart all compose services.",
    answer: "docker compose restart",
    explanation:
      "`docker compose restart` restarts the stack; `docker compose restart api` targets one service.",
  },
  {
    id: "docker-compose-config",
    category: "docker",
    level: "core",
    prompt: "Validate and print the resolved compose configuration.",
    answer: "docker compose config",
    explanation:
      "`docker compose config` expands variables and validates the file — check before applying.",
  },
  {
    id: "docker-compose-pull",
    category: "docker",
    level: "core",
    prompt: "Pull images for all compose services.",
    answer: "docker compose pull",
    explanation:
      "`docker compose pull` fetches images defined with `image:` for every service.",
  },
  {
    id: "docker-compose-specific-file",
    category: "docker",
    level: "core",
    prompt: "Run a compose stack using docker-compose.override.yml explicitly.",
    answer: "docker compose -f docker-compose.override.yml up",
    explanation:
      "`-f` selects the compose file; multiple `-f` flags merge them in order.",
  },
  {
    id: "dockerfile-from-1",
    category: "docker",
    level: "core",
    prompt: "Start a Dockerfile from the node:20 image.",
    answer: "FROM node:20",
    explanation:
      "`FROM` defines the base image — the first instruction of every Dockerfile.",
  },
  {
    id: "dockerfile-run-1",
    category: "docker",
    level: "core",
    prompt: "Run 'npm install' during a build.",
    answer: "RUN npm install",
    explanation:
      "`RUN` executes commands at build time, creating a new layer.",
  },
  {
    id: "dockerfile-cmd-1",
    category: "docker",
    level: "core",
    prompt: "Set the default command for a container to run node server.js.",
    answer: "CMD [\"node\", \"server.js\"]",
    explanation:
      "`CMD` (exec form) is the default command; it can be overridden by `docker run` arguments.",
  },
  {
    id: "dockerfile-entrypoint-1",
    category: "docker",
    level: "core",
    prompt: "Set the entrypoint so containers run 'npm start' by default.",
    answer: "ENTRYPOINT [\"npm\", \"start\"]",
    explanation:
      "`ENTRYPOINT` is the fixed command; `CMD` or CLI args append as its arguments.",
  },
  {
    id: "dockerfile-workdir-1",
    category: "docker",
    level: "core",
    prompt: "Set the working directory inside the image to /app.",
    answer: "WORKDIR /app",
    explanation:
      "`WORKDIR` sets the directory for RUN/CMD/COPY; creates it if missing.",
  },
  {
    id: "dockerfile-copy-1",
    category: "docker",
    level: "core",
    prompt: "Copy package.json from the build context into the image.",
    answer: "COPY package.json .",
    explanation:
      "`COPY` copies files from the build context into the image filesystem.",
  },
  {
    id: "dockerfile-add",
    category: "docker",
    level: "core",
    prompt: "Copy a local tarball into the image and extract it automatically.",
    answer: "ADD app.tar.gz /opt/",
    explanation:
      "`ADD` auto-extracts tarballs and can fetch URLs; prefer COPY for plain files.",
  },
  {
    id: "dockerfile-env-1",
    category: "docker",
    level: "core",
    prompt: "Set the environment variable NODE_ENV=production in the image.",
    answer: "ENV NODE_ENV=production",
    explanation:
      "`ENV` sets env vars for all subsequent RUN instructions and the running container.",
  },
  {
    id: "dockerfile-expose-1",
    category: "docker",
    level: "core",
    prompt: "Document that the container listens on port 3000.",
    answer: "EXPOSE 3000",
    explanation:
      "`EXPOSE` is documentation; actual port publishing needs `-p` at run time.",
  },
  {
    id: "dockerfile-user-1",
    category: "docker",
    level: "core",
    prompt: "Run the container as the non-root user 'node'.",
    answer: "USER node",
    explanation:
      "`USER` switches the user for all following instructions — a security best practice.",
  },
  {
    id: "dockerfile-healthcheck",
    category: "docker",
    level: "core",
    prompt: "Add a health check that curls /health every 30 seconds.",
    answer: "HEALTHCHECK --interval=30s CMD curl -f http://localhost/health || exit 1",
    explanation:
      "`HEALTHCHECK` tells docker how to probe the container; `docker ps` shows health status.",
  },
  {
    id: "dockerfile-multistage-1",
    category: "docker",
    level: "workflow",
    prompt: "In a multi-stage build, copy the compiled binary from the 'builder' stage.",
    answer: "COPY --from=builder /app/dist .",
    explanation:
      "`COPY --from=stage` pulls files from a previous build stage — the key to slim images.",
  },
  {
    id: "dockerignore-file",
    category: "docker",
    level: "workflow",
    prompt: "Prevent node_modules from being sent to the docker build context.",
    answer: "echo 'node_modules' > .dockerignore",
    explanation:
      "`.dockerignore` excludes files from the build context, speeding builds and shrinking layers.",
  },
  {
    id: "docker-compose-ports",
    category: "docker",
    level: "core",
    prompt: "In compose, publish the service's port 3000 as host port 8080.",
    answer: "ports: [\"8080:3000\"]",
    explanation:
      "Compose `ports` uses the same host:container syntax as `docker run -p`.",
  },
  {
    id: "docker-compose-volumes",
    category: "docker",
    level: "core",
    prompt: "In compose, mount ./src to /app/src for live reload.",
    answer: "volumes: [\"./src:/app/src\"]",
    explanation:
      "Compose `volumes` entries bind-mount host paths into the service container.",
  },
  {
    id: "docker-compose-depends",
    category: "docker",
    level: "core",
    prompt: "In compose, make service 'app' wait for 'db' to start.",
    answer: "depends_on: [db]",
    explanation:
      "`depends_on` orders startup; add `condition: service_healthy` to wait for health.",
  },
  {
    id: "docker-compose-scale",
    category: "docker",
    level: "core",
    prompt: "Run 3 replicas of the 'worker' service in compose.",
    answer: "docker compose up --scale worker=3",
    explanation:
      "`--scale` runs multiple instances (the service must not publish a fixed host port).",
  },
  {
    id: "docker-swarm-init",
    category: "docker",
    level: "core",
    prompt: "Initialize this host as a swarm manager.",
    answer: "docker swarm init",
    explanation:
      "`docker swarm init` enables swarm mode; `docker swarm join` adds workers with the token.",
  },
  {
    id: "docker-swarm-service-create",
    category: "docker",
    level: "core",
    prompt: "Deploy 2 replicas of nginx as a swarm service 'web'.",
    answer: "docker service create --replicas 2 --name web nginx",
    explanation:
      "`docker service create` defines a replicated service managed by swarm.",
  },
  {
    id: "docker-swarm-service-ls",
    category: "docker",
    level: "core",
    prompt: "List swarm services.",
    answer: "docker service ls",
    explanation:
      "`docker service ls` shows services and their replica counts.",
  },
  {
    id: "docker-stack-deploy",
    category: "docker",
    level: "workflow",
    prompt: "Deploy the compose file as a swarm stack named 'prod'.",
    answer: "docker stack deploy -c docker-compose.yml prod",
    explanation:
      "`docker stack deploy` turns compose services into swarm services.",
  },
  {
    id: "docker-stack-ls",
    category: "docker",
    level: "core",
    prompt: "List deployed stacks.",
    answer: "docker stack ls",
    explanation:
      "`docker stack ls` shows stacks and their services; `docker stack rm name` removes one.",
  },
  {
    id: "docker-node-ls",
    category: "docker",
    level: "core",
    prompt: "List the nodes in the swarm cluster.",
    answer: "docker node ls",
    explanation:
      "`docker node ls` shows manager/worker nodes and their roles and status.",
  },
  {
    id: "docker-secret-create",
    category: "docker",
    level: "core",
    prompt: "Create a swarm secret 'db-pass' from the file password.txt.",
    answer: "docker secret create db-pass password.txt",
    explanation:
      "`docker secret create name file` stores a secret; services mount it at /run/secrets.",
  },
  {
    id: "docker-run-hostname",
    category: "docker",
    level: "core",
    prompt: "Give a container the hostname 'app-1'.",
    answer: "docker run --hostname app-1 image",
    explanation:
      "`--hostname` sets the container's internal hostname (visible via `hostname`).",
  },
  {
    id: "docker-run-readonly",
    category: "docker",
    level: "core",
    prompt: "Make a container's filesystem read-only.",
    answer: "docker run --read-only image",
    explanation:
      "`--read-only` prevents writes to the container fs; mount a tmpfs for /tmp if needed.",
  },
  {
    id: "docker-run-cap-drop",
    category: "docker",
    level: "core",
    prompt: "Run a container without the NET_RAW capability.",
    answer: "docker run --cap-drop NET_RAW image",
    explanation:
      "Dropping capabilities is a hardening step; `--cap-drop ALL` drops everything.",
  },
  {
    id: "docker-run-privileged",
    category: "docker",
    level: "core",
    prompt: "Run a container with full host privileges.",
    answer: "docker run --privileged image",
    explanation:
      "`--privileged` grants all capabilities — powerful but a security risk; avoid unless needed.",
  },
  {
    id: "docker-run-label",
    category: "docker",
    level: "core",
    prompt: "Tag a container with the label team=platform.",
    answer: "docker run -l team=platform image",
    explanation:
      "`-l` sets a label for filtering: `docker ps --filter label=team=platform`.",
  },
  {
    id: "docker-filter-label",
    category: "docker",
    level: "workflow",
    prompt: "List containers that have the label team=platform.",
    answer: "docker ps --filter label=team=platform",
    explanation:
      "`--filter` narrows listing; label filters match the `-l` labels set at run time.",
  },
  {
    id: "docker-ps-filter-status",
    category: "docker",
    level: "core",
    prompt: "List containers whose status is 'exited'.",
    answer: "docker ps -a --filter status=exited",
    explanation:
      "Status filters: exited, running, dead, created. Useful before pruning.",
  },
  {
    id: "docker-update-restart",
    category: "docker",
    level: "core",
    prompt: "Change the restart policy of container 'web' to unless-stopped.",
    answer: "docker update --restart unless-stopped web",
    explanation:
      "`docker update` adjusts a running container's settings like restart policy.",
  },
  {
    id: "docker-commit-image",
    category: "docker",
    level: "workflow",
    prompt: "Save the current state of container 'web' as image web-snapshot.",
    answer: "docker commit web web-snapshot",
    explanation:
      "`docker commit` freezes a container into an image — prefer Dockerfiles, but handy for snapshots.",
  },
  {
    id: "docker-attach-1",
    category: "docker",
    level: "core",
    prompt: "Attach your terminal to the running container 'web'.",
    answer: "docker attach web",
    explanation:
      "`docker attach` connects to the container's main process; `Ctrl+p q` detaches safely.",
  },
  {
    id: "docker-wait",
    category: "docker",
    level: "core",
    prompt: "Block until the container 'job' exits, then print its exit code.",
    answer: "docker wait job",
    explanation:
      "`docker wait` waits for a container to stop and prints its exit status — good in scripts.",
  },
  {
    id: "docker-container-run-rm-overview",
    category: "docker",
    level: "workflow",
    prompt: "Run a one-off database migration and clean up the container after.",
    answer: "docker run --rm -v .:/app -w /app image npm run migrate",
    explanation:
      "`--rm` removes the container when done, so one-off jobs leave no residue.",
  },
  {
    id: "docker-login-private",
    category: "docker",
    level: "workflow",
    prompt: "Pull an image from a private registry that requires authentication.",
    answer: "docker login myregistry.example.com",
    explanation:
      "Log in to the private registry first; then `docker pull` works for its images.",
  },
  {
    id: "docker-run-link-env",
    category: "docker",
    level: "core",
    prompt: "Pass the host's PATH value into a container.",
    answer: "docker run -e PATH=$PATH image",
    explanation:
      "The shell expands $PATH before docker runs, passing the host PATH into the container.",
  },
  {
    id: "docker-build-context-exclude",
    category: "docker",
    level: "workflow",
    prompt: "Speed up a build by keeping .git and logs out of the build context.",
    answer: "echo -e '.git\\n*.log' >> .dockerignore",
    explanation:
      "Excluded files never reach the daemon, shrinking the context transfer.",
  },
  {
    id: "docker-cleanup-everything",
    category: "docker",
    level: "workflow",
    prompt: "Free up space by removing all stopped containers, unused networks, and dangling images.",
    answer: "docker system prune",
    explanation:
      "The default prune handles containers, networks, and dangling images — safe daily cleanup.",
  },
  {
    id: "docker-logs-error-grep",
    category: "docker",
    level: "workflow",
    prompt: "Search the live logs of 'web' for 'ERROR'.",
    answer: "docker logs -f web 2>&1 | grep ERROR",
    explanation:
      "`-f` follows, `2>&1` merges stderr, and grep filters — a classic debugging pipeline.",
  },
  {
    id: "docker-run-shell-override",
    category: "docker",
    level: "core",
    prompt: "Run the alpine image overriding its default command with 'sh'.",
    answer: "docker run -it alpine sh",
    explanation:
      "Arguments after the image name override CMD — here giving an interactive shell.",
  },
  {
    id: "docker-inspect-health",
    category: "docker",
    level: "workflow",
    prompt: "Check the health status of the container 'web'.",
    answer: "docker inspect -f '{{.State.Health.Status}}' web",
    explanation:
      "The health template prints starting/healthy/unhealthy; requires a HEALTHCHECK in the image.",
  },
  {
    id: "docker-run-tmpfs",
    category: "docker",
    level: "core",
    prompt: "Give a container a memory-backed /tmp (cleared on restart).",
    answer: "docker run --tmpfs /tmp image",
    explanation:
      "`--tmpfs` mounts a RAM-backed filesystem — good with `--read-only`.",
  },
  {
    id: "docker-swarm-leave",
    category: "docker",
    level: "core",
    prompt: "Leave the swarm as a worker node.",
    answer: "docker swarm leave",
    explanation:
      "`docker swarm leave` removes the node; add `--force` on a manager.",
  },
  {
    id: "docker-service-update",
    category: "docker",
    level: "workflow",
    prompt: "Update the 'web' swarm service to use image nginx:1.25.",
    answer: "docker service update --image nginx:1.25 web",
    explanation:
      "`docker service update` rolls out a new image to the service's replicas.",
  },
  {
    id: "docker-service-scaling",
    category: "docker",
    level: "workflow",
    prompt: "Scale the 'worker' swarm service up to 5 replicas.",
    answer: "docker service scale worker=5",
    explanation:
      "`docker service scale` changes replica counts on the fly.",
  },
  {
    id: "docker-secret-ls",
    category: "docker",
    level: "core",
    prompt: "List all swarm secrets.",
    answer: "docker secret ls",
    explanation:
      "`docker secret ls` lists secrets; `docker secret rm name` deletes one.",
  },
  {
    id: "docker-config-create",
    category: "docker",
    level: "core",
    prompt: "Create a swarm config 'nginx-conf' from nginx.conf.",
    answer: "docker config create nginx-conf nginx.conf",
    explanation:
      "Swarm configs mount read-only files into services, unlike secrets.",
  },
  {
    id: "docker-run-pid-host",
    category: "docker",
    level: "core",
    prompt: "Run a container sharing the host's PID namespace.",
    answer: "docker run --pid host image",
    explanation:
      "`--pid host` lets the container see host processes — used for debugging tools.",
  },
  {
    id: "docker-run-ipc",
    category: "docker",
    level: "core",
    prompt: "Run a container sharing the host's IPC namespace.",
    answer: "docker run --ipc host image",
    explanation:
      "`--ipc host` shares memory/semaphores with the host, often used with databases.",
  },
  {
    id: "docker-stop-timeout",
    category: "docker",
    level: "core",
    prompt: "Stop container 'web' giving it 30 seconds to shut down gracefully.",
    answer: "docker stop -t 30 web",
    explanation:
      "`-t` sets the SIGTERM grace period before SIGKILL.",
  },
  {
    id: "docker-run-log-driver",
    category: "docker",
    level: "core",
    prompt: "Run a container writing logs in JSON format (default driver).",
    answer: "docker run --log-driver json-file image",
    explanation:
      "The json-file driver is the default; others include syslog, gelf, and journald.",
  },
  {
    id: "docker-inspect-mounts",
    category: "docker",
    level: "workflow",
    prompt: "Show the volumes and bind mounts of container 'web'.",
    answer: "docker inspect -f '{{json .Mounts}}' web",
    explanation:
      "The Mounts field lists each mount's type, source, and destination as JSON.",
  },
  {
    id: "docker-builder-prune-1",
    category: "docker",
    level: "core",
    prompt: "Clear the BuildKit build cache.",
    answer: "docker builder prune",
    explanation:
      "`docker builder prune` frees cache from BuildKit; add `-a` to clear everything.",
  },
  {
    id: "docker-build-target",
    category: "docker",
    level: "workflow",
    prompt: "Build only up to the 'builder' stage of a multi-stage Dockerfile.",
    answer: "docker build --target builder -t myapp-build .",
    explanation:
      "`--target` stops at a named stage — handy for dev images that skip the final stage.",
  },
  {
    id: "docker-run-cpus",
    category: "docker",
    level: "core",
    prompt: "Limit a container to 1.5 CPUs.",
    answer: "docker run --cpus 1.5 image",
    explanation:
      "`--cpus` caps CPU usage; `--memory` caps RAM, e.g. `--memory 512m`.",
  },
  {
    id: "docker-run-memory",
    category: "docker",
    level: "core",
    prompt: "Limit a container to 512MB of memory.",
    answer: "docker run --memory 512m image",
    explanation:
      "`--memory` (or `-m`) sets the memory limit; combine with `--cpus` for full quotas.",
  },
  {
    id: "docker-run-shm-size",
    category: "docker",
    level: "core",
    prompt: "Give a container 1GB of shared memory (/dev/shm).",
    answer: "docker run --shm-size 1g image",
    explanation:
      "Larger `/dev/shm` fixes crashes in Chromium-based tools and some databases.",
  },
  {
    id: "docker-run-dns",
    category: "docker",
    level: "core",
    prompt: "Use a custom DNS server (8.8.8.8) for a container.",
    answer: "docker run --dns 8.8.8.8 image",
    explanation:
      "`--dns` overrides the daemon's DNS; `--dns-search` sets search domains.",
  },
  {
    id: "docker-compose-env-interpolation",
    category: "docker",
    level: "workflow",
    prompt: "In compose, read the value of the host variable TAG for an image tag.",
    answer: "image: myapp:${TAG}",
    explanation:
      "Compose interpolates `${TAG}` from the shell or a .env file at parse time.",
  },
  {
    id: "docker-compose-profiles",
    category: "docker",
    level: "workflow",
    prompt: "Start only the services tagged with the 'debug' profile.",
    answer: "docker compose --profile debug up",
    explanation:
      "Profile-gated services start only when their profile is requested.",
  },
  {
    id: "docker-run-tty-only",
    category: "docker",
    level: "core",
    prompt: "Run a container with a TTY but no stdin attached.",
    answer: "docker run -t image",
    explanation:
      "`-t` alone allocates a pseudo-TTY; combine with `-i` for interactive input.",
  },
  {
    id: "docker-images-filter",
    category: "docker",
    level: "core",
    prompt: "List only images tagged with 'latest'.",
    answer: "docker images --filter reference=*:latest",
    explanation:
      "`--filter reference=*:latest` matches images by repo/tag pattern.",
  },
  {
    id: "docker-prune-images",
    category: "docker",
    level: "core",
    prompt: "Remove dangling (untagged) images only.",
    answer: "docker image prune",
    explanation:
      "Without `-a`, `docker image prune` removes only dangling images — a safe cleanup.",
  },
  {
    id: "docker-run-init",
    category: "docker",
    level: "core",
    prompt: "Run a container with an init process to reap zombie processes.",
    answer: "docker run --init image",
    explanation:
      "`--init` runs a tiny init (tini) that handles signal forwarding and zombie reaping.",
  },
  {
    id: "docker-run-gpus",
    category: "docker",
    level: "core",
    prompt: "Give a container access to all GPUs.",
    answer: "docker run --gpus all image",
    explanation:
      "`--gpus all` exposes host GPUs (requires the NVIDIA container runtime).",
  },
  {
    id: "docker-cp-dir",
    category: "docker",
    level: "core",
    prompt: "Copy the whole logs dir out of container 'web' to ./logs.",
    answer: "docker cp web:/var/log ./logs",
    explanation:
      "`docker cp` handles directories recursively.",
  },
  {
    id: "docker-exec-env",
    category: "docker",
    level: "core",
    prompt: "Run a command inside 'web' with an extra environment variable.",
    answer: "docker exec -e DEBUG=1 web printenv",
    explanation:
      "`-e` sets vars for the exec'd process only; the container's own env is unchanged.",
  },
  {
    id: "docker-run-add-host",
    category: "docker",
    level: "core",
    prompt: "Map the hostname 'db.local' to 127.0.0.1 inside a container.",
    answer: "docker run --add-host db.local:127.0.0.1 image",
    explanation:
      "`--add-host` adds an /etc/hosts entry inside the container.",
  },
  {
    id: "docker-build-ssh",
    category: "docker",
    level: "workflow",
    prompt: "Let a build use your SSH agent to clone a private repo.",
    answer: "docker build --ssh default -t myapp .",
    explanation:
      "`--ssh default` forwards the SSH agent to RUN instructions that use BuildKit's ssh mount.",
  },
  {
    id: "docker-tag-remote-push",
    category: "docker",
    level: "workflow",
    prompt: "Tag local image app as your registry path and push it.",
    answer: "docker tag app user/app:v1 && docker push user/app:v1",
    explanation:
      "Tag with the registry/owner prefix, then push — the standard release flow.",
  },
];
