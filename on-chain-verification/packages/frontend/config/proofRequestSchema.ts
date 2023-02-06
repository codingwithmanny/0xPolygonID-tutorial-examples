// Imports
// ========================================================
/**
 * !!NOTE: This file is a base and is overwritten in ./frontend/src/App.tsx
 * This represents a template base that will be modified as needed in ./frontend/src/App.tsx
 * For additional reference to a schema see https://0xpolygonid.github.io/tutorials/wallet/wallet-sdk/polygonid-sdk/iden3comm/auth-requests/#structure-of-query-based-request
 */
const proofRequestSchema = {
    // 1. UUID for the request
    // - Identifier stored on the wallet SDK
    "id": "c811849d-6bfb-4d85-936e-3d9759c7f105",
    // 2. iden3comm Media Type, i.e. File format for the type field. (For example, JSON)
    // - needs to be constant / does not change
    "typ": "application/iden3comm-plain-json",
    // 3. Type of iden3comm Protocol Message; type of request; it could be an auth request, proof request, or a claim offer
    "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    // 4. Payload to send for proof request
    "body": {
        // Function to be executed from the contract for the zk response
        "transaction_data": {
            // - deployed contract address where it will call a specific function
            // (This will be overwritten by .env - CONTRACT_ADDRESS)
            "contract_address": "0xeD05AC777229866383bc0c2388472a21a0c1bE3c",
            // - hash of the function name from the ABI - b68967e2 = submitZKPResponse
            // (This will be overwritten by .env - METHOD_ID)
            "method_id": "b68967e2",
            // - chain id of the network
            // (This will be overwritten by .env - CHAIN_ID)
            "chain_id": 80001,
            // - network name
            // (This will be overwritten by .env - NETWORK)
            "network": "polygon-mumbai"
        },
        // Reason for the request
        // - Unknown if used or not
        "reason": "airdrop participation",
        // Scope of request and information required
        // - Currently only supports a single array request
        "scope": [
            {
                // - Integer to define if there multiple rules
                "id": 1,
                // - type of request currently supports `credentialAtomicQuerySig` and `credentialAtomicQueryMTP` (not currently used)
                "circuit_id": "credentialAtomicQuerySig",
                // - conditions of the request
                "rules": {
                    // - only accepts query
                    "query": {
                        // - whitelist of polygon ID platform identifier
                        // (This will be overwritten by .env - ALLOWED_ISSUERS)
                        "allowed_issuers": [
                            "*"
                        ],
                        // - conditions to be met with zk-query-language - see https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
                        "req": {
                            // (This will be overwritten by .env - REQ_ATTRIBUTE)
                            "Date": {
                                // NOTE: this value needs to match the erc20ZkpRequest.ts L34 or erc721ZkpRequest.ts L34
                                // (This will be overwritten by .env - REQ_OPERATOR + REQ_VALUE)
                                "$lt": 20020101
                            }
                        },
                        // - schema of the proof and type, type is case-sensitive
                        // (This will be overwritten by .env - SCHEMA_URL + SCHEMA_TYPE)
                        "schema": {
                            "url": "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/c79191fc-c84e-4203-bb72-4d354839cfb7.json-ld",
                            "type": "KYCagecredential"
                        }
                    }
                }
            }
        ]
    }
};

// Exports
// ========================================================
export default proofRequestSchema;