import * as bitcoin from "bitcoinjs-lib";

export const sendBitcoin = async (recipientAddress, amount, privateKey) => {
  const keyPair = bitcoin.ECPair.fromWIF(privateKey);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  // Fetch unspent transaction outputs (UTXOs) for this address
  const utxos = await fetchUTXOs(address);

  const psbt = new bitcoin.Psbt();

  let inputValue = 0;
  for (const utxo of utxos) {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      nonWitnessUtxo: Buffer.from(utxo.rawTx, "hex"),
    });
    inputValue += utxo.value;
  }

  const fee = 1000; // Set a suitable fee rate
  const outputValue = inputValue - fee - amount;

  psbt.addOutput({ address: recipientAddress, value: amount });
  psbt.addOutput({ address, value: outputValue }); // Change output

  psbt.signAllInputs(keyPair);
  psbt.finalizeAllInputs();

  const tx = psbt.extractTransaction();
  const txHex = tx.toHex();

  // Broadcast the transaction
  await broadcastTransaction(txHex);
};

const fetchUTXOs = async (address) => {
  // Fetch UTXOs for a given address using a third-party service
  // Return an array of UTXOs with their transaction details
};

const broadcastTransaction = async (txHex) => {
  // Broadcast the transaction using a third-party service
};
