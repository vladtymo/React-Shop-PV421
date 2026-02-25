import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        '0x763cd8d12324f7f5403116ac0b1c9d3366c05aa5e85f8dd792f2a315278d7e9c',
        '0xb535ef70b84723f406df35ef05d96ff773695c93713831eabbf349fc8cede030',
        '0x4288cf5e5d8b1f48492d3e33c73568ec3664a1d046c9e8ecbbac8b4b2e98df29'
      ],
    }
  },
};

export default config;
