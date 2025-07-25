// src/lib/thirdweb.ts
import { createThirdwebClient } from "thirdweb";

// Get your client ID from thirdweb dashboard
const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

export const thirdwebClient = createThirdwebClient({
  clientId: CLIENT_ID,
});

// Contract configuration for your MerkleMinter
export const MERKLE_MINTER_ADDRESS = process.env.NEXT_PUBLIC_MERKLE_MINTER_ADDRESS || "0x86153A0d9c060BE48A0cfc2daEed3Eee957C9DD7";
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) : 1; // Default to Ethereum mainnet

// Kaiju NFT Contract configuration
export const KAIJU_NFT_ADDRESS = "0x102c527714ab7e652630cac7a30abb482b041fd0";

// Basic ERC721 ABI for totalSupply
export const ERC721_ABI = [
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Complete MerkleMinter ABI from the working app
export const MERKLE_MINTER_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract IKaijuNFT",
        "name": "_nft",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_pricePerNFTInETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_gatedMintPricePerNFTInETH",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "enum MerkleMinter.TreeType",
        "name": "treeType",
        "type": "uint8"
      }
    ],
    "name": "MerkleTreeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "nfcId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "enum MerkleMinter.TreeType",
        "name": "treeType",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "Purchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA",
        "name": "_dna",
        "type": "tuple"
      },
      {
        "internalType": "bytes32[]",
        "name": "_merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "canGatedMint",
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
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA",
        "name": "_dna",
        "type": "tuple"
      },
      {
        "internalType": "bytes32[]",
        "name": "_merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "canOpenMint",
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
    "name": "gatedMerkleTreeMetadata",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "root",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "dataIPFSHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA",
        "name": "_dna",
        "type": "tuple"
      },
      {
        "internalType": "bytes32[]",
        "name": "_merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "gatedMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gatedMintPricePerNFTInETH",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA[]",
        "name": "_dnas",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes32[][]",
        "name": "_merkleProofs",
        "type": "bytes32[][]"
      }
    ],
    "name": "multiGatedMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA[]",
        "name": "_dnas",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes32[][]",
        "name": "_merkleProofs",
        "type": "bytes32[][]"
      }
    ],
    "name": "multiOpenMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nft",
    "outputs": [
      {
        "internalType": "contract IKaijuNFT",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "openMerkleTreeMetadata",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "root",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "dataIPFSHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "nfcId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.KaijuDNA",
        "name": "_dna",
        "type": "tuple"
      },
      {
        "internalType": "bytes32[]",
        "name": "_merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "openMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
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
    "name": "pricePerNFTInETH",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "proofUsed",
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
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newPrice",
        "type": "uint256"
      }
    ],
    "name": "updateGatedPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "root",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "dataIPFSHash",
            "type": "string"
          }
        ],
        "internalType": "struct MerkleMinter.MerkleTreeMetadata",
        "name": "_metadata",
        "type": "tuple"
      },
      {
        "internalType": "enum MerkleMinter.TreeType",
        "name": "_treeType",
        "type": "uint8"
      }
    ],
    "name": "updateMerkleTree",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IKaijuNFT",
        "name": "_nft",
        "type": "address"
      }
    ],
    "name": "updateNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newPrice",
        "type": "uint256"
      }
    ],
    "name": "updatePrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawSaleProceeds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;