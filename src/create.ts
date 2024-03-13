import {
    Keypair
  } from '@solana/web3.js';
import { readFileSync, writeFileSync } from 'fs';
import argio = require("argio");

function create() {
    const payer = Keypair.generate()
    const params = argio();
    const path = params.subcommand || "new_keypair"
    console.log(`Creating wallet ${path}`)
    console.log(`Public key ${payer.publicKey.toString()} base58 ${payer.publicKey.toBase58()}`)
    const privKeyStr = JSON.stringify(Array.from(payer.secretKey))
    writeFileSync(path + ".priv.json", privKeyStr)
    writeFileSync(path + ".pub.txt", payer.publicKey.toString())
    // const check = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privKeyStr)))
    const check = Keypair.fromSecretKey(
        Uint8Array.from(
          JSON.parse(readFileSync(path + ".priv.json", 'utf-8')),
        ),
    );
    console.log("Checking public key, same:", check.publicKey.toString() === payer.publicKey.toString())
    console.log("Done!")
}

create()