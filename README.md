# Explorer Setup

This guide helps you set up the **Blockscout Explorer** for your private or test blockchain using Docker.

---

## 1. ✅ Install Docker and Dependencies

Run the following commands in your terminal:

```sh
sudo apt update
sudo apt install -y docker.io
sudo apt install -y docker-compose
sudo apt install -y make
```

Verify Docker is installed:

```sh
docker --version
```

## 2. 📦 Clone and Configure Blockscout

```sh
git clone https://github.com/blockscout/blockscout.git
cd blockscout/docker-compose
```

### ℹ️ Replace the Blockchain RPC URL

- Replace `http://host.docker.internal:8545/` with your blockchain RPC, for example:
  ```
  http://208.115.109.2024:8545/
  ```
- Replace `CHAIN_ID` from `1337` to your chain ID, e.g., `15323`, you can replace it with your own blockchain Chain ID..

---
 
## 3. ⚙️ Configuration File Changes

### Changes in `docker-compose.yml`
- Updated Ethereum RPC URLs to use `http://208.115.109.2024:8545/` instead of `http://host.docker.internal:8545/`.
- Updated `CHAIN_ID` from `1337` to `15323`, you can replace it with your own blockchain Chain ID.

### `envs/common-blockscout.env`

```env
ETHEREUM_JSONRPC_HTTP_URL=http://208.115.109.2024:8545/
ETHEREUM_JSONRPC_TRACE_URL=http://208.115.109.2024:8545/
INDEXER_BEACON_RPC_URL=http://208.115.109.2024:5052
CORS_ORIGIN=*
```

### `envs/common-frontend.env`

```env
NEXT_PUBLIC_API_HOST=208.115.109.2024
NEXT_PUBLIC_STATS_API_HOST=http://208.115.109.2024:8080
NEXT_PUBLIC_APP_HOST=208.115.109.2024
NEXT_PUBLIC_VISUALIZE_API_HOST=http://208.115.109.2024:8081
```

### `envs/common-smart-contract-verifier.env`

```env
SMART_CONTRACT_VERIFIER__JAEGER__AGENT_ENDPOINT=208.115.109.2024:6831
```

### `envs/common-stats.env`

```env
STATS__JAEGER__AGENT_ENDPOINT=208.115.109.2024:6831
STATS__BLOCKSCOUT_API_URL=http://208.115.109.2024
```

### `envs/common-user-ops-indexer.env`

```env
USER_OPS_INDEXER__JAEGER__AGENT_ENDPOINT=208.115.109.2024:6831
```

### `proxy/default.conf.template`

Ensure the following CORS line is present:

```nginx
add_header Access-Control-Allow-Origin *;
```

### Summary
- The primary update involves switching from `localhost` and `host.docker.internal` to `208.115.109.2024` for better connectivity within the network.
- Updated `CHAIN_ID` to `15323`, you can replace it with your own blockchain Chain ID .
- Relaxed CORS policies to allow all origins (`*`).


---

## 4. ▶️ Run Docker Services

```sh
cd docker-compose
docker-compose up --build
```

- Open the URL shown in terminal.
- Wait for the UI to load.
- Then stop the services with `Ctrl+C`.


---

## 5. 🔐 Set Permissions for Explorer to Work

```sh
cd services # inside the docker-compose folder
sudo chown -R 10001:10001 ./dets ./logs
sudo chmod -R 775 ./dets ./logs   
```

   - exit in the docker-compose folder and run the following commands

```sh
cd docker
sudo docker rm -f stats-db sig-provider db visualizer backend stats frontend proxy
sudo make start # To start explorer
sudo make stop # To stop explorer
```

---

## 7. 🧹 Configure Docker Log Rotation

To prevent storage issues, edit Docker log configuration:

```sh
vi /etc/docker/daemon.json
```

- paste the json in daemon.json file

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  }
}
```

Then restart Docker:

```sh
sudo systemctl restart docker
```

---

## 🛠️ Troubleshooting: UI Loads but No Data

If the UI is up but data is missing:

```sh
cd docker-compose/services
sudo chown -R 10001:10001 ./dets ./logs
sudo chmod -R 775 ./dets ./logs
```


---

## ✅ Summary

- ✅ Blockchain RPC: `http://208.115.109.2024:8545/`
- ✅ Chain ID: `15323`
- ✅ Permissions and Docker setup handled
- ✅ Log rotation to save disk space

---

➡️ **Next step:** Proceed to [`SMART-CONTRACT-SETUP`](../SMART_CONTRACT_SETUP/README.md) to configure the Smart Contract setup and deploy the contracts.