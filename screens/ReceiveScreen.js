import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { retrieveData, storeData } from "../utils/asyncStorage";
import { createWallet, retrieveWallet } from "../services/etheremWallet";

export default function ReceiveScreen() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        //TODO: find a secure saving method
        // Check if private key is already stored
        const key = "testPrivateKey";

        const storedPrivateKey = await retrieveData(key);

        if (storedPrivateKey) {
          const wallet = await retrieveWallet(storedPrivateKey);
          setAddress(wallet.address);
        } else {
          // Generate a new wallet
          // const wallet = ethers.Wallet.createRandom();
          const wallet = await createWallet();
          setAddress(wallet.address);
          await storeData(key, wallet.privateKey);
        }
      } catch (error) {
        console.error("Error loading wallet", error);
      }
    };

    loadWallet();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Address: {address}</Text>
      {address && <QRCode value={address} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
