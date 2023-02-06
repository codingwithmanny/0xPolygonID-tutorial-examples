// Imports
// ========================================================
import { ethers } from "hardhat";

// Deployment Script
// ========================================================
const main = async () => {
  // Replace these variables as needed  
  const verifierContract = "ERC20Verifier";
  const verifierName = "ERC20zkAirdrop";
  const verifierSymbol = "zkERC20";

  // Deploy contract
  const Contract = await ethers.getContractFactory(verifierContract);
  const contract = await Contract.deploy(
    verifierName,
    verifierSymbol
  );
  await contract.deployed();

  // Output result
  console.log(`${verifierName} deployed to ${contract.address}`);
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
