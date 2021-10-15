# Solana hackathon (Circular Economy)
We have developed a POC to solve the problem of asset tracking and provenance using Solana blockchain as a global distributed ledger. 

# Build and install Solana program (Smart contracts)
It is assumed that Solana development environment has already been setup. If not, see [here](https://github.com/solana-labs/example-helloworld)

Build Solana program: `cd circular_economy && build-rust-program.sh`

Connect to solana devnet: `solana config set --url devnet`

Install program to devnet: `solana program deploy circular_economy/ce/dist/program/ce.so`

Install and run client React app: `cd react_app && npm install && npm run start`


## POC Concept
NFTs (Non fungible tokens) are used as on-chain representation of real-world entities such as paintings or limited-edition sneakers. We take inspiration from Ethereum ERC721 NFT standard and use NFTs as on-chain representation of physical entities on the global supply chain. Example of such entities include Cpu chips, memory modules, LCD panels, Printed circuit boards (PCB) etc.

**We have also added capability to represent relationship among NFTs to accurately model real-world scenarios.** For example, a PCB component contains many sub-components like Cpu, RAM modules, Gpu etc. The PCB component itself maybe combined with others to create a final product such as a smartphone. Our Solana program (Smart contract) allows such relationships to be created or destroyed as components go through various stages of their life cycle in the global supply chain.

**We capture the key tenets of the Circular Economy as operations on the NFTs:**

| Circular economy tenet | Program instruction on-chain | NFT operation |
| ---------------------  | ---------------------------- | ------------- |
| Reduce | NFT Mint | NFT tokens are minted as components are manufactured and introduced into global supply chain |
| Reuse | NFT history | NFT tokens follow a lifecycle reflecting how components and products move through various ownerships during their lifecycle |
| Re-productize | NFT Relationship | NFT token relationships to reflect how products can be broken down into constituent components which can then be re-used to build new products |
| Recycle | NFT burn | NFT tokens are burned to reflect how products and components are recycled into raw materials

## Why blockchain and why Solana
Blockchain can be used as a global source of truth to track, analyse lineage and prove provenance of assets that move through today's global supply chains. Immutability as well as de-centralized nature of the blockchain protocol increases trust and transparency in such endeavours, enabling new business models that can address various challenges of today - one being Green and Sustainable practises with a goal towards [Circular Economy](https://en.wikipedia.org/wiki/Circular_economy).  

Solana blockchain was chosen specifically due to its desirable properties:
- Massive throughput
- Reduced fees

## Frontend and Program(Smart contract) interaction


### On-chain operations to manage component and product lifecycle
*Note: PDA (Program derived address), also called as pubkey, for a component can be derived during runtime from a seed. A component's unique component_id can be used as a seed to predictably derive PDAs for respective components.*

**Mint a component**

For each component to be minted on Solana:
- Parameters input by user:
  - Component ID (1 to 255)
  - Description (10 to 64 chars)
  - Name (5 to 16 chars)
  - Serial no. (5 to 16 chars)
- Parameters set by client code: 
  - Set opcode to 100

Use web3js to send the mint request. In request, set pubkey to PDA of the respective component.
Note that types (e.g uint8) and string lengths have to be exactly maintained. 

**Update a component**

Each minted component can be updated. Note, component's ID can't be updated on-chain.
For each component to be updated on Solana:
- Parameters input by user:
  - Component ID (1 to 255)
  - New description (10 to 64 chars)
  - Name (5 to 16 chars)
  - Serial no. (5 to 16 chars)
- Parameters set by client code: 
  - Set opcode to 101

Use web3js to send the mint request. In request, set pubkey to PDA of the respective component.


**Read a component**

Each component's latest state can be read from Solana.
To read a component's state:
- Parameters input by user:
  - Component ID (1 to 255)

Use web3js getAccountInfo to send the read request. In request, use PDAof the respective component. 

**Form child - parent relationship**

Two components can be linked as child and parent.
To link two components:
- Parameters input by user:
  - Component IDs of the two components
- Parameters set by client code:
  - Set opcode to 102 

Use web3js to send the link request. In request, set PDAsof the two components as follows:
```
// first PDA in array is child. second is parent.
[{pubkey: <PDA-of-child-component>, isSigner: false, isWritable: true},
      {pubkey: <PDA-of-parent-component>, isSigner: false, isWritable: true}],
```      

**Burn a component**

Component is burnt when its recycled into raw materials.
For component to be burnt on Solana:
- Parameters input by user:
  - Component ID (1 to 255)
- Parameters set by client code: 
  - Set opcode to 103

Use web3js to send the burn request. In request, set pubkey to PDAof the respective component.

---

## Interpret on-chain component data
Reading a component's state will return the following:
```
id;          // component's ID
description; // component's description
serial_no;   // component's serial no.
parent;      // component ID of the parent of this component
children;    // an array where each item is component ID of a child
acive;       // recycled if 0, not recycled if otherwise
```

*Note: A component can have only one parent (parent's ID 1 to 255), or no parent (parent's ID 0) at any given time. It can have multiple children (max 10 children at any time)*





