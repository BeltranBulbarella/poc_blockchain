# SupplyChain Tracker for Organic Coffee

## Overview

This project is a Proof of Concept (POC) for a blockchain-based supply chain tracker tailored for organic coffee. It leverages Ethereum smart contracts, Truffle, TypeScript, and Next.js to ensure transparency, traceability, and authenticity of products from origin to consumer.

## Features

- **Product Creation:** Initialize new organic coffee products.
- **Stage Addition:** Add various stages (e.g., harvesting, processing) to each product.
- **Stage Verification:** Authorized verifiers can confirm the authenticity of each stage.
- **Data Retrieval:** Fetch product and stage details.

## Setup Instructions

1. **Clone the Repository:**
```bash
   git clone <your-repo-url>
   cd your-project-directory
```

2. **Install Dependencies:**
```bash
   npm install
```

3. **Start Ganache:**
```bash
ganache
```

4. **Compile Contracts:**
```bash
truffle compile
```
5. **Deploy Contracts:**
```bash
truffle migrate --network development --reset
```

6. **Deploy Contracts:**
```bash
truffle console --network development
```

## Usage

### Creating a Product
```javascript
const supplyChain = await SupplyChain.deployed();
await supplyChain.createProduct("Organic Coffee", "Ethiopia", { from: accounts[0] });
```

### Adding a Stage
```javascript
await supplyChain.addStage(1, "Harvested by Farmer A", accounts[1], { from: accounts[0] });
```

### Verifying a Stage
```javascript
await supplyChain.verifyStage(1, 0, { from: accounts[1] });
```

### Retrieving Product Details
```javascript
const product = await supplyChain.products(1);
console.log(product);
```

### Retrieving Stage Details
```javascript
const stage = await supplyChain.getStage(1, 0);
console.log(stage);
```


## License
This project is licensed under the MIT License.
