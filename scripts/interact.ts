import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { ethers } from "ethers";
const hre = require("hardhat");
const votingJSON = require("./../artifacts/contracts/Voting.sol/Voting.json");

const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
const contractABI: any[] = votingJSON.abi;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_NODE_URL || "");
  const signer = await hre.ethers.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    // Call functions here
    //    function addCandidate(string memory _candidateName) public {
    const addcandidate = await contract.vote("xyz");
  await addcandidate.wait();
  console.log("product created");
  console.log("The transaction hash is:", addcandidate.hash);
  const receipt = await addcandidate.wait();
  console.log(
    "The transaction returned the following transaction receipt:\n",
    receipt,
  );
    /*const createAccountTx = await contract.createAccount();
    await createAccountTx.wait();

    console.log("Account Created", signer.getAddress());
    const accountBalance = await contract.accounts(signer.getAddress());
    console.log("Account Balance:", accountBalance.toString()); // Convert BigNumber to string

    const accountCount = await contract.getAccountCount();
    console.log("Account Count:", accountCount.toString()); // Convert BigNumber to string

    const accountAddresses = [];
    for (let i = 0; i < accountCount; i++) {
      const addressAtIndex = await contract.getAccountAtIndex(i);
      accountAddresses.push(addressAtIndex);
    }
    console.log("Account Addresses:", accountAddresses);
    console.log("Check your transaction on BBN Testnet:", `http://testnet.bharatblockchain.io/address/${contractAddress}`);
  */

  } catch (error) {
    console.error("Error:", error);
  }
}

main();