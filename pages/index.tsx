import { Button, Container, Text } from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MintForm } from "../components/MintForm";

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      // Fancy method to request access to account.
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Boom! This should print out public address once we authorize Metamask.
      console.log("Connected", accounts[0]);
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
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
          <MintForm />
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
