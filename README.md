
# 🏪 BaseMarket Smart Contract

A decentralized NFT marketplace smart contract for listing and purchasing ERC721 NFTs using ERC20 tokens. Built with security, extensibility, and OpenZeppelin best practices in mind.

## 🔧 Features

- NFT listing and purchasing with custom prices
- Platform fee support (configurable)
- Uses ERC20 tokens as currency
- Secure and gas-efficient with OpenZeppelin libraries
- Owner-only pause/unpause functionality
- Pagination support for listed assets
- Reentrancy guard and access control
- Built-in interface to accept safe NFT transfers

---

## 🛠️ Tech Stack

- Solidity `^0.8.28`
- OpenZeppelin Contracts `^5.0.0`

---

## 📦 Dependencies

Ensure you have the following OpenZeppelin contracts installed in your project:

```bash
npm install @openzeppelin/contracts@^5.0.0
```

Used contracts:
- `IERC721`
- `IERC20`
- `Ownable`
- `EnumerableSet`
- `ReentrancyGuard`
- `Pausable`

---

## 🚀 Deployment

```solidity
constructor(address initialOwner, address _nft, address _coin)
```

### Parameters:
- `initialOwner`: Address of the initial contract owner
- `_nft`: Address of the ERC721 NFT contract
- `_coin`: Address of the ERC20 token used for purchases

---

## 📘 Usage

### ✅ Listing an NFT

```solidity
function listNFT(uint256 id, uint128 price) external returns (bool)
```

- `id`: NFT Token ID to list
- `price`: Sale price (in smallest ERC20 unit)

**Requirements:**
- Sender must own the NFT
- Contract must be approved to transfer the NFT

---

### 🛒 Purchasing an NFT

```solidity
function purchaseNFT(uint256 id) external
```

- `id`: NFT Token ID to purchase

**Requirements:**
- Buyer must have sufficient ERC20 balance and allowance
- Buyer cannot be the NFT's original owner

**Platform Fee:**
- Configurable via `setPlatformFee`
- Expressed in basis points (e.g., `200` = 2%)

---

### 🔍 Viewing Assets

```solidity
function getAssetDetails(uint256 id) public view returns (NFTAsset memory)
```

```solidity
function getListedAssets(uint8 skip, uint8 limit) external view returns (NFTAsset[] memory)
```

- Supports pagination with `skip` and `limit` parameters

---

### 🔧 Admin Functions

```solidity
function setPlatformFee(uint256 _fee) external onlyOwner
```

- `_fee`: New platform fee in basis points (e.g., 200 = 2%)

```solidity
function pause() external onlyOwner
function unpause() external onlyOwner
```

---

## ⚠️ Security Notes

- Reentrancy protected using `nonReentrant`
- All critical state changes are wrapped in `whenNotPaused`
- Fallback `receive()` function prevents direct ETH deposits
- Only owner can update platform fee or pause/unpause contract

---

## 📑 Events

```solidity
event AssetListed(uint256 indexed id, uint128 price, address indexed seller)
event AssetPurchased(uint256 indexed id, uint128 price, address indexed seller, address indexed buyer)
```

---


# 🌐 BaseMarket Frontend

A modern decentralized NFT marketplace frontend for interacting with the `BaseMarket` smart contract. The frontend is built using Next.js, styled with TailwindCSS, and integrates Ether.js for blockchain interaction and Pinata for IPFS-based metadata storage.

## 🛠️ Tech Stack

- **Next.js** - React framework for server-side rendering (SSR) and static site generation (SSG)
- **TailwindCSS** - Utility-first CSS framework for fast styling
- **Ether.js** - JavaScript library for interacting with the Ethereum blockchain
- **Pinata IPFS** - Decentralized file storage solution for NFT metadata
- **React** - UI framework

---

## 📦 Installation

To get started, clone the repository and install dependencies:

```bash

cd frontend
pnpm install
```

---

## 🔧 Configuration

### 1. **Setting up Ether.js**

In the `utils/ether.js` file, configure your Ethereum provider and contract address:

```js
ETHERSCAN_API_KEY=<>
SEPOLIA_RPC_URL=<>
PRIVATE_KEY=<>
```

Make sure to fill it up

---

### 2. **Setting up Pinata for IPFS**

Create a Pinata account and get your API keys. Then, add the configuration to `config/pinata.ts`:

```js

PINATA_JWT=<>


```

Make sure to replace `<YOUR_PINATA_JWT>`
---

## 💻 Running the Application

Once the configuration is complete, you can run the app locally using:

```bash
pnpm dev
```

This will start the Next.js development server on `http://localhost:3000`.

---

## 🛍️ Key Features

### 1. **Listing an NFT**

- Users can list their NFTs by entering the token ID and price.
- NFTs are listed in a table with the details fetched from the blockchain.
- IPFS metadata can be uploaded via Pinata and associated with the NFT for decentralized storage.

### 2. **Purchasing an NFT**

- The user can browse listed NFTs and make purchases directly via the frontend.
- The frontend checks if the user has enough balance and the correct token allowance before initiating the transaction.
- After purchasing, the NFT is transferred to the buyer, and the contract is updated accordingly.

### 3. **IPFS Metadata Storage**

When listing an NFT, the frontend allows the user to upload metadata (like a title, description, and image) to Pinata, which is stored on IPFS. The IPFS link is then stored on the blockchain to provide decentralized access.

---

## 📖 Pages and Components

### Pages:

- **`/market`** - Home page listing all NFTs, their prices, and buttons to purchase
- **`/market/assets`** - page for managing your nfts
- **`/market/mint`** - page for minting NFT
- **`/market/transactions`** - page for tracking all your transactions 


### Components:

- **`NFTCard`** - Displays a preview of an NFT with its details
- **`SaleCard`** - Displays a paginated list of all NFTs
- **`MintForm`** - Form used to list an NFT
- **`ConnectButton`** - Button to connect to the user’s Ethereum wallet using MetaMask
- **`Transactions`** - Displays transaction status and errors

---

## 📚 How to Use

1. **Connect Wallet**: Click the "Connect Wallet" button, which will prompt MetaMask (or other Web3 wallets) to connect.
2. **Browse NFTs**: View the list of available NFTs. You can filter or paginate the results.
3. **List Your NFT**: Go to the "List NFT" page, upload your metadata to Pinata, and input your NFT's price. When you confirm, the smart contract will list the NFT.
4. **Purchase an NFT**: If you have enough tokens and the correct allowance, click the "Buy" button to complete the transaction.

---

## 🌍 UI/UX Design

### TailwindCSS

The app is styled using TailwindCSS for a clean and responsive design. The layout is mobile-first, ensuring the marketplace works across all devices.

- **Responsive Layout**: Tailwind classes like `sm:`, `md:`, and `lg:` are used to ensure the design adapts to different screen sizes.
- **Custom Themes**: Tailwind’s `theme` and `extend` functionality allow for easy theming and customization.


---

## ⚠️ Security Considerations

- **Wallet Integration**: Ensure the wallet is properly connected, and the user has granted necessary token allowances.
- **IPFS Upload**: Always validate the uploaded files (e.g., size, format) before pinning to Pinata.
- **Contract Interaction**: Always check transaction statuses and error handling for user-friendly feedback.
