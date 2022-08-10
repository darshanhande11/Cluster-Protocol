const hre = require("hardhat");

async function main() {
  const fundsManager = await hre.ethers.getContractFactory("FundsManager");
  const fundsManagerInstance = await fundsManager.deploy();

  await fundsManagerInstance.deployed();

  console.log("Funds manager deployed to !! ", fundsManagerInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
