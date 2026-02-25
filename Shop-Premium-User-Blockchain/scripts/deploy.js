const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("PremiumStatus");

  const premiumStatus = await Contract.deploy(); // deploy
  await premiumStatus.waitForDeployment();      // wait until mined

  console.log("PremiumStatus deployed to:", await premiumStatus.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });