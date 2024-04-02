import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = "";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    //lukso_testnet: {
    //  url: "https://rpc.testnet.lukso.network",
    //  accounts: [PRIVATE_KEY],
    //},
    //lukso_mainnet: {
    //  url: "https://42.rpc.thirdweb.com",
    //  accounts: [PRIVATE_KEY],
    //},
  },
  solidity: "0.8.24",
};

export default config;
