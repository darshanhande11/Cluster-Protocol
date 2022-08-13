const hre = require("hardhat");

async function main() {
  const MarketPlaceManager = await hre.ethers.getContractFactory("MarketPlace");
  const MarketPlaceManagerInstance = await MarketPlaceManager.deploy("10");

  await MarketPlaceManagerInstance.deployed();

  console.log("Market Place deployed to !! ", MarketPlaceManagerInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
