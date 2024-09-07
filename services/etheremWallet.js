import { polyfillWebCrypto } from "expo-standard-web-crypto";
import * as ExpoCrypto from "expo-crypto";
import { ethers } from "ethers";

// Ensure WebCrypto is polyfilled
polyfillWebCrypto();

// export const checkUSDTBalance = async (walletAddress) => {
//   const ERC20_ABI = ["function balanceOf(address) view returns (uint)"];

//   const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//   const provider = new ethers.InfuraProvider(
//     "mainnet",
//     "<YOUR_INFURA_PROJECT_ID>"
//   );
//   const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, provider);
//   const balance = await contract.balanceOf(walletAddress);
//   const result = ethers.formatUnits(balance, 6);
//   console.log("USDT Balance:", result);
// };

export const createWallet = async () => {
  try {
    const randomBytes = await ExpoCrypto.getRandomBytesAsync(16);
    const entropyHex = ethers.hexlify(randomBytes);
    const mnemonic = ethers.Mnemonic.entropyToPhrase(entropyHex);
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    return wallet;
  } catch (error) {
    console.error("Error creating wallet", error);
    return null;
  }
};

export const retrieveWallet = async (privateKey) => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
};

//TODO
// Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura project ID
const providerAPIKey = "2533cd1b955c4d9d919b788bd7b59f70";
const providerUrl = "https://mainnet.infura.io/v3/";

const provider = new ethers.JsonRpcProvider(`${providerUrl}${providerAPIKey}`);

export const checkUSDTBalance = async (walletAddress) => {
  try {
    // USDT contract address on Ethereum
    const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    // Instantiate the contract object
    const contract = new ethers.Contract(
      USDT_ADDRESS,
      ["function balanceOf(address) view returns (uint)"],
      provider
    );

    // Call the balanceOf function on the contract
    const balance = await contract.balanceOf(walletAddress);

    // Format the balance to human-readable units (USDT has 6 decimals)
    const result = ethers.formatUnits(balance.toString(), 6);

    // Log the balance to console
    console.log("USDT Balance:", result);

    // Return the formatted balance
    return result;
  } catch (error) {
    console.error("Error checking USDT balance:", error);
    throw error;
  }
};

// Function to check USDC balance
export const checkUSDCBalance = async (walletAddress) => {
  try {
    // USDC contract address on Ethereum with correct checksum
    const USDC_ADDRESS = ethers.getAddress(
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    );

    // Instantiate the contract object
    const contract = new ethers.Contract(
      USDC_ADDRESS,
      ["function balanceOf(address) view returns (uint)"],
      provider
    );

    // Call the balanceOf function on the contract
    const balance = await contract.balanceOf(walletAddress);

    // Format the balance to human-readable units (USDC has 6 decimals)
    const result = ethers.formatUnits(balance.toString(), 6);

    // Log the balance to console
    console.log("USDC Balance:", result);

    // Return the formatted balance
    return result;
  } catch (error) {
    console.error("Error checking USDC balance:", error);
    throw error;
  }
};

// // Function to check USDC balance
// export const checkUSDCBalance = async (walletAddress) => {
//   try {
//     // USDC contract address on Ethereum
//     const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9EB0cE3606EB48";

//     // Instantiate the contract object
//     const contract = new ethers.Contract(
//       USDC_ADDRESS,
//       ["function balanceOf(address) view returns (uint)"],
//       provider
//     );

//     // Call the balanceOf function on the contract
//     const balance = await contract.balanceOf(walletAddress);

//     // Format the balance to human-readable units (USDC has 6 decimals)
//     const result = ethers.formatUnits(balance.toString(), 6);

//     // Log the balance to console
//     console.log("USDC Balance:", result);

//     // Return the formatted balance
//     return result;
//   } catch (error) {
//     console.error("Error checking USDC balance:", error);
//     throw error;
//   }
// };

// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// export const checkUSDTBalance = async (walletAddress) => {
//   try {
//     // USDT contract address on Ethereum
//     const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

//     // Instantiate the contract object
//     const contract = new ethers.Contract(
//       USDT_ADDRESS,
//       ["function balanceOf(address) view returns (uint)"],
//       provider
//     );

//     // Call the balanceOf function on the contract
//     const balance = await contract.balanceOf(walletAddress);

//     // Format the balance to human-readable units (USDT has 6 decimals)
//     const result = ethers.formatUnits(balance.toString(), 6);

//     // Log the balance to console
//     console.log("USDT Balance:", result);

//     // Return the formatted balance
//     return result;
//   } catch (error) {
//     console.error("Error checking USDT balance:", error);
//     throw error;
//   }
// };
