// Imports
// ========================================================
import { ethers } from 'hardhat';
import { config } from 'dotenv';

// Config Env Vars
// ========================================================
config();

// Helper Functions
// ========================================================
/**
 * 
 * @param key 
 * @returns 
 */
const getOperatorValue = (key: '$eq' | '$lt' | '$gt' | '$in' | '$nin') => {
    const op = {
        '$eq': 1,
        '$lt': 2,
        '$gt': 3,
        '$in': 4,
        '$nin': 5,
    }
    return op[key];
};

// Deployment Script
// ========================================================
/**
 * @dev The goal of this is to set the zero-knowledge proof request on the contract so that went you submit the proof the contract will validate it
 */
const main = async () => {
    // Main scope circuit identifier supported 
    // - avoid changing as it's currently the only one supported
    const circuitId = "credentialAtomicQuerySig";

    // Main validator address on mumbai - https://mumbai.polygonscan.com/address/0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB#code
    // - do not change for testnet
    const validatorAddress = `${process.env.VALIDATOR_CONTRACT_ADDRESS}`;

    // CHANGE THESE
    // Contract name when deployed
    const verifierContractName = "ERC20Verifier";
    // Schema has provided by the issuer
    // - typically found in https://platform-test.polygonid.com/claiming/created-schemas
    const schemaHash = `${process.env.SCHEMA_HASH}`; // extracted from PID Platform
    // Deployed contract address
    const ERC20VerifierContractAddress = `${process.env.CONTRACT_ADDRESS}`;
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));
    const query = {
        schema: ethers.BigNumber.from(schemaEnd),
        // slotIndex2 indicates the value stored for Attribute 1 inside the claim
        // slotIndex3 indicates the value stored for Attribute 2
        // There is a limit of only 2 attributes for now
        slotIndex: process.env.REQ_SLOT_INDEX || 2,
        // see - https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
        // 1 = equals / $eq
        // 2 = less-than / $lt
        // 3 = greater-than / $gt
        // 4 = in / $in
        // 5 = not-in / $nin
        operator: getOperatorValue(`${process.env.REQ_OPERATOR as '$eq' | '$lt' | '$gt' | '$in' | '$nin'}`),
        // 20020101 refers to the numerical date we're using for our proof request
        // - see proofRequestSchema.ts L53
        value: [parseInt(`${process.env.REQ_VALUE}`, 0), ...new Array(63).fill(0).map(i => 0)], // the value must be 20020101 = true
        circuitId,
    };

    // Retrieve contract to interact with it
    const erc20Verifier = await ethers.getContractAt(verifierContractName, ERC20VerifierContractAddress);

    // Set zkpRequest for contract
    try {
        // Use as a means to keep track in the contract for number of mints a person can perform from a specific wallet address
        const requestId = Number(await erc20Verifier.TRANSFER_REQUEST_ID());
        const tx = await erc20Verifier.setZKPRequest(
            requestId, // 1
            validatorAddress,
            query
        );

        tx.wait();
        console.log(`Request set at:\nNOTE: May take a little bit to show up\nhttps://mumbai.polygonscan.com/tx/${tx.hash}`);
    } catch (e) {
        console.error("Error: ", e);
    }
};

// Helper Functions
// ========================================================
/**
 * 
 * @param hex 
 * @returns array of bytes
 */
const hexToBytes = (hex: string) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        /**
         * @dev parseInt 16 = parsed as a hexadecimal number
         */
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
};

/**
 * @dev Little-Endian: https://learnmeabitcoin.com/technical/little-endian
 * "Little-endian" refers to the order in which bytes of information can be processed by a computer.
 * @param bytes array of numbers for bytes 
 * @returns number
 */
const fromLittleEndian = (bytes: number[]) => {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
        result += base * BigInt(byte);
        base = base * n256;
    });
    return result;
};

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
