import { Button, Container, Text } from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MintForm } from "../components/MintForm";
import { networks } from "../utils/networks";

// Reload the page when they change networks
function handleChainChanged() {
  window.location.reload();
}
const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
    const chainId = (await ethereum.request({
      method: "eth_chainId",
    })) as keyof typeof networks;
    setNetwork(networks[chainId] || "Unknown");

    ethereum.on("chainChanged", handleChainChanged);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error: any & { code: number }) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container css={{ marginBottom: "$10" }}>
        <Text h2>⚒️ Builder Name Service</Text>
        <Text h3>Show the things you have built!</Text>
      </Container>
      <Container>
        {currentAccount ? (
          <>
            <Text>
              You are connected to {network} with account {currentAccount}
            </Text>
            {network !== "Polygon Mumbai Testnet" ? (
              <>
                <Text>You can mint domains on the Polygon Mumbai Testnet.</Text>
                <Button onClick={switchNetwork}>Switch to Mumbai</Button>
              </>
            ) : (
              <MintForm />
            )}
          </>
        ) : (
          <Button color="gradient" onClick={connectWallet}>
            Connect wallet
          </Button>
        )}
      </Container>
    </>
  );
};

export default Home;
