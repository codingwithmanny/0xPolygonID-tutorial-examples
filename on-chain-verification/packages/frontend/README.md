# On-Chain Verification Frontend

This is the frontend that generates a QR code to interact with the Polygon ID App.

![../../README/on-chain-verification-frontend.png](../../README/on-chain-verification-frontend.png)

## Requirements

- NVM or Node `v18.12.1`
- Yarn `v1.22.19`
- Polygon ID Mobile App
    - [Polygon ID iOS](https://apps.apple.com/us/app/polygon-id/id1629870183)
    - [Polygon ID Android](https://play.google.com/store/apps/details?id=com.polygonid.wallet&gl=US)

## Quick Start

### Install Depencies

**NOTE:** Do this from the root of the repository and not this package directory.

```bash
# FROM ./on-chain-verification

yarn install;
```

### Configure Environment Variables

**NOTE:** The `.env` file is found in the root of this tutorial example.

```bash
# FROM ./on-chain-verification

cp .env.example .env
```

**File:** `.env`

```txt
ETHERSCAN_API_KEY=<OPTIONAL_POLYGONSCAN_API_KEY>
RPC_MUMBAI_URL="https://rpc-mumbai.maticvigil.com"
WALLET_PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY_DO_NOT_SHARE>
CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ER20_OR_ERC721>
VALIDATOR_CONTRACT_ADDRESS=0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB

# hash name of function 'submitZKPResponse'
# How do I hash function names?
# - https://codingwithmanny.medium.com/how-to-hash-your-solidity-function-names-in-etherjs-d1597eaad26
METHOD_ID=b68967e2 
CHAIN_ID=80001
NETWORK="polygon-mumbai"

# For multiple use ; Ex: 123;456
ALLOWED_ISSUERS="*"
REQ_ATTRIBUTE="Date"
# 2 or 3 - Attribute 2 & 3 from the claim attributes in the issuer
REQ_SLOT_INDEX=2
# https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
REQ_OPERATOR="$lt"
REQ_VALUE=20020101
SCHEMA_ID="<YOUR_SCHEMA_ID>"
SCHEMA_HASH="<YOUR_SCHEMA_HAS>"
SCHEMA_URL="<YOUR_SCHEMA_URL>"
SCHEMA_TYPE="<YOUR_SCHEMA_TYPE>"

# MUMBAI RPCS
# https://matic-testnet-archive-rpc.bwarelabs.com
# https://polygon-testnet.public.blastapi.io
# https://matic-mumbai.chainstacklabs.com
# https://rpc-mumbai.maticvigil.com
# https://polygon-mumbai.g.alchemy.com/v2/demo
# https://polygontestapi.terminet.io/rpc
```

### Running Scripts

**NOTE:** Scripts need to take advantage of an `.env` file which is in the root of the repository.
Scripts will not work without these being set.

```bash
# FROM ./on-chain-verification

yarn dev;

# Expected Output:
# > on-chain-verification-frontend:dev
# 
# $ vite
#   VITE v4.0.1  ready in 289 ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h to show help
```