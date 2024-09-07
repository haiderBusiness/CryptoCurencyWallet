// export const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9EB0cE3606EB48";

// export const sendERC20 = async (
//   recipientAddress,
//   amount,
//   privateKey,
//   tokenAddress
// ) => {
//   const provider = ethers.getDefaultProvider("mainnet"); // or 'ropsten' for testnet
//   const wallet = new ethers.Wallet(privateKey, provider);

//   // ERC-20 Token Contract ABI
//   const erc20ABI = [
//     "function transfer(address to, uint amount) returns (bool)",
//   ];

//   const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
//   const tx = await tokenContract.transfer(
//     recipientAddress,
//     ethers.utils.parseUnits(amount, 18)
//   ); // 18 decimals for USDT/USDC

//   await tx.wait();
//   console.log(`Transaction Hash: ${tx.hash}`);
// };

// import { ethers } from "ethers";

// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// export const testGethConnection = async () => {
//   try {
//     const blockNumber = await provider.getBlockNumber();
//     console.log("Current Block Number:", blockNumber);
//   } catch (error) {
//     console.error("Error connecting to Geth:", error);
//   }
// };

import { ethers } from "ethers";

const providerAPIKey = "2533cd1b955c4d9d919b788bd7b59f70";
const providerUrl = "https://mainnet.infura.io/v3/";

const provider = new ethers.JsonRpcProvider(`${providerUrl}${providerAPIKey}`);

export const testProviderConnection = async () => {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Current Block Number:", blockNumber);
  } catch (error) {
    console.error("Error connecting to Geth:", error);
  }
};

// USDT and USDC contract addresses on Ethereum Mainnet
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9EB0cE3606EB48";

// ERC20 ABI to interact with the token contracts
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

// Function to send ETH
export const sendETH = async (fromWallet, toWalletAddress, amountInEth) => {
  try {
    const tx = {
      toWalletAddress,
      value: ethers.parseUnits(amountInEth, "ether"),
    };
    const transactionResponse = await fromWallet.sendTransaction(tx);
    console.log("Transaction Response:", transactionResponse);
    await transactionResponse.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error sending ETH:", error);
    throw error;
  }
};

// Function to send USDT
export const sendUSDT = async (fromWallet, toWalletAddress, amountInUsdt) => {
  try {
    const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, fromWallet);
    const amount = ethers.parseUnits(amountInUsdt, 6); // USDT has 6 decimals
    const transactionResponse = await contract.transfer(
      toWalletAddress,
      amount
    );
    console.log("Transaction Response:", transactionResponse);
    await transactionResponse.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error sending USDT:", error);
    throw error;
  }
};

// Function to send USDC
export const sendUSDC = async (fromWallet, toWalletAddress, amountInUsdc) => {
  try {
    const contract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, fromWallet);
    const amount = ethers.parseUnits(amountInUsdc, 6); // USDC has 6 decimals
    const transactionResponse = await contract.transfer(
      toWalletAddress,
      amount
    );
    console.log("Transaction Response:", transactionResponse);
    await transactionResponse.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error sending USDC:", error);
    throw error;
  }
};

// // Example usage
// (async () => {
//   const recipientAddress = 'RECIPIENT_WALLET_ADDRESS';

//   // Sending ETH
//   await sendETH(recipientAddress, '0.1'); // Sending 0.1 ETH

//   // Sending USDT
//   await sendUSDT(recipientAddress, '100'); // Sending 100 USDT

//   // Sending USDC
//   await sendUSDC(recipientAddress, '100'); // Sending 100 USDC
// })();
