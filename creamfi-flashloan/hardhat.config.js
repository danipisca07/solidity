/**
 * @type import('hardhat/config').HardhatUserConfig
 */


require("@nomiclabs/hardhat-ethers");

const ERC20ABI = [
  'function balanceOf(address) external view returns (uint)',
  'function transfer(address, uint) external returns (bool)',
]

const crAbi = [
  'function isCToken() external view returns (bool)',
  'function balanceOf(address) external view returns (uint256)'
]

async function flashloan(_, hre, walletAddr, USDCAddr, crUSDCAddr) {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [walletAddr]
  });

  const wallet = await hre.ethers.provider.getSigner(walletAddr);
  const factory = await hre.ethers.getContractFactory('FlashloanExample');

  // deploy flashloan example contract
  const flashloanExampleContract = await factory.deploy();

  // Send 100 USDC to flash loan example contract,
  // so that you have enough fund to pay the fee.
  const USDC = new ethers.Contract(USDCAddr, ERC20ABI, wallet);
  let tx = await USDC.transfer(flashloanExampleContract.address, 100 * 1e6)
  await tx.wait()

  console.log('contract:', flashloanExampleContract.address);

  // call the doFlashloan
  tx = await flashloanExampleContract.doFlashloan(crUSDCAddr, 10000 * 1e6, USDCAddr);
  const receipt = await tx.wait()

  // see the result
  console.log(receipt.events)


  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [walletAddr]
  });
}

// Run this task with mainnet fork,
// so that you can see play around your flashloan example contract
task("flashloan", async (_, hre) => {

  // The address that has USDC on mainnet
  const walletAddr = '0x6D5a7597896A703Fe8c85775B23395a48f971305'

  const crUSDCAddr = '0x44fbeBd2F576670a6C33f6Fc0B00aA8c5753b322' //cToken
  const USDCAddr = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' //underlying

  await flashloan(_, hre, walletAddr, USDCAddr, crUSDCAddr);
})


// Run this task with bsc fork,
// so that you can see play around your flashloan example contract
task("flashloan-bsc", async (_, hre) => {

  // The address that has USDC on bsc
  const walletAddr = '0xf977814e90da44bfa03b6295a0616a897441acec'

  const crUSDCAddr = '0xd83c88db3a6ca4a32fff1603b0f7ddce01f5f727'
  const USDCAddr = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'

  await flashloan(_, hre, walletAddr, USDCAddr, crUSDCAddr);
})



module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.5.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/d420267c83a24a58bb4f1835f58c553e"
        //url: "https://bsc-dataseed.binance.org/"
      }
    }
  }
};
