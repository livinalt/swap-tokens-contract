import { ethers } from "hardhat";

async function main() {
  
  const swapToken = await ethers.deployContract("SwapToken");
  await swapToken.waitForDeployment();

  console.log(
    `SwapToken Contract has been deployed to ${swapToken.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
