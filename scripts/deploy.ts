import { ethers } from "hardhat";

async function main() {
  
  const swapToken = await ethers.deployContract("SwapToken");
  await swapToken.waitForDeployment();

  console.log(
    `SwapToken Contract has been deployed to ${swapToken.target}` 
  );

  // contract address: 0xb8a18404a113F1f6f3Ced615a841546125D4E63f
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
