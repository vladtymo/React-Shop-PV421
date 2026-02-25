import { BrowserProvider, Contract, ethers, Signer } from "ethers";

const contractAddress = "0x09F560573ae9a01044c6ED7943d8A18609973F81"; // Replace with your contract address
const abi = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "when",
          "type": "uint256"
        }
      ],
      "name": "PremiumPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "when",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "PREMIUM_PRICE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buyPremiumStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "hasPremiumStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isPremium",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

declare global {
  interface Window {
    ethereum?: any;
  }
}

const getProvider = (): BrowserProvider | null => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async (): Promise<Signer | null> => {
  try {
    const provider = getProvider();
    return provider ? await provider.getSigner() : null;
  } catch (error) {
    console.error("MetaMask connection error:", error);
    return null;
  }
};

export const getContract = async (): Promise<Contract | null> => {
  const signer = await getSigner();
  return signer ? new Contract(contractAddress, abi, signer) : null;
};

const withContract = async <T,>(
  action: (contract: Contract) => Promise<T>,
): Promise<T | null> => {
  const contract = await getContract();
  if (!contract) return null;
  try {
    return await action(contract);
  } catch (error) {
    console.error("Contract interaction error:", error);
    return null;
  }
};

// ---------- contract interaction functions
export const buyPremiumStatus = async (): Promise<boolean> => {
  const result = await withContract<boolean>(async (contract) => {
    const operationStatus = await contract.buyPremiumStatus.staticCall({
      value: ethers.parseEther("1"),
    });

    if (!operationStatus) {
      return false;
    }

    const tx = await contract.buyPremiumStatus({ value: ethers.parseEther("1") });
    const receipt = await tx.wait();

    return operationStatus && receipt?.status === 1;
  });

  return result ?? false;
};

export const getPremiumStatus = async (): Promise<boolean> => {
  const result = await withContract<boolean>(async (contract) => {
    const signer = await getSigner();
    if (!signer) {
      return false;
    }

    const walletAddress = await signer.getAddress();
    return await contract.hasPremiumStatus(walletAddress);
  });

  return result ?? false;
};

