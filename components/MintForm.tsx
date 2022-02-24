import { Button, Card, Input, Text } from "@nextui-org/react";
import { ethers } from "ethers";
import { FormEventHandler, useState } from "react";
import contractABI from "../utils/ContractABI.json";
const CONTRACT_ADDRESS = "0x87061dB3CB124826Ee1742C4fcd3767f9441A45D";
export function MintForm() {
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");

  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) {
      return;
    }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.005" : domain.length === 4 ? "0.003" : "0.001";
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          // Set the record for the domain
          tx = contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mintDomain();
  };
  return (
    <Card as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Text h3>Builder DNS</Text>
      </Card.Header>
      <Card.Body>
        <Input
          label="Domain"
          placeholder="builder"
          name="domain"
          type="text"
          labelRight=".build"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <Input
          label="Link"
          placeholder="https://tomimoreno.com"
          name="link"
          type="text"
          value={record}
          onChange={(e) => setRecord(e.target.value)}
        />
      </Card.Body>
      <Card.Footer>
        <Button type="submit">Mint</Button>
      </Card.Footer>
    </Card>
  );
}
