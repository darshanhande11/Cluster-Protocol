const hre = require("hardhat");

async function main() {
  const fakeItToken = await hre.ethers.getContractFactory("FakeIt");
  const fakeItTokenInstance = await fakeItToken.deploy();

  await fakeItTokenInstance.deployed();

  console.log("Fake it token contract address !! ", fakeItTokenInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
