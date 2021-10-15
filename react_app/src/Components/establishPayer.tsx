import React, {useEffect, useState} from 'react';
import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import yaml from 'yaml';
import * as borsh from 'borsh';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckProgram from '../Components/checkProgram';


const EstablishPayer = ({ connectionUrl }) => {

  const [payerUrl, setPayerUrl] = useState <any> (false);

  useEffect(() => {
    

    
    /**
 * Connection to the network
 */

/**
 * Keypair associated to the fees' payer
 */
let payer: Keypair;




    /**
       * The state of a greeting account managed by the hello mytoken program
       */
     class Component {
      opcode = 0;   // u8 as defined in schema
      id = 0;       // u8 as defined in schema
      description = new Uint8Array(64);
      name = new Uint8Array(16);
      serial_no = new Uint8Array(16);
      parent = 0;   // u8
      children = new Uint8Array(10); // only fixed size supported by borsh
      active = 1;

      constructor(fields: {opcode: number, id: number, description: Uint8Array, name: Uint8Array, serial_no: Uint8Array, parent: number, children: Uint8Array, active: number} | undefined = undefined) {
        if (fields) {
          this.opcode = fields.opcode;
          this.id = fields.id;
          this.description = fields.description;
          this.name = fields.name;
          this.serial_no = fields.serial_no;
          this.parent = fields.parent;
          this.children = fields.children;
          this.active = fields.active;
        }
      }
    }

    const ComponentSchema = new Map([
      [Component, {kind: 'struct', fields: [
        ['opcode', 'u8'],
        ['id', 'u8'],  // types must match that in program
        ['description', [64]],
        ['name', [16]],
        ['serial_no', [16]],
        ['parent', 'u8'],
        ['children', [10]],
        ['active', 'u8'],
      ]}],
    ]);
    
    const COMPONENT_SIZE = borsh.serialize(
      ComponentSchema,
      new Component(),
    ).length;
      
    establishPayer();
    
    async function establishPayer(): Promise<void> {
      let fees = 0;
      if (!payer) {
        const {feeCalculator} = await connectionUrl.getRecentBlockhash();
    
        // Calculate the cost to fund the greeter account
        fees += await connectionUrl.getMinimumBalanceForRentExemption(COMPONENT_SIZE);
    
        // Calculate the cost of sending transactions
        fees += feeCalculator.lamportsPerSignature * 100; // wag
    
        payer = await getPayer();
      }
    
      let lamports = await connectionUrl.getBalance(payer.publicKey);
      if (lamports < fees) {
        // If current balance is not enough to pay for fees, request an airdrop
        const sig = await connectionUrl.requestAirdrop(
          payer.publicKey,
          fees - lamports,
        );
        await connectionUrl.confirmTransaction(sig);
        lamports = await connectionUrl.getBalance(payer.publicKey);
      }

      console.log(
        'Using account',
        payer.publicKey.toBase58(),
        'containing',
        lamports / LAMPORTS_PER_SOL,
        'SOL to pay for fees',
      );

        if(payer.publicKey.toBase58() && lamports / LAMPORTS_PER_SOL){
          setPayerUrl(payer);
        }
      
    }

    /**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
      const getPayer : () => Promise<Keypair> = async () =>{
        try {
          const config = await getConfig();
          if (!config.keypair_path) throw new Error('Missing keypair path');
          return await createKeypairFromFile(config.keypair_path);
        } catch (err) {
          console.warn(
            'Failed to create keypair from CLI config file, falling back to new random keypair',
          );
          return Keypair.generate();
        }
      }

        /**
     * Create a Keypair from a secret key stored in file as bytes' array
     */
    const createKeypairFromFile = async(
      filePath: string,
    ): Promise<Keypair> => {
      //const secretKeyString = await fs.readFile(filePath, {encoding: 'utf8'});
      const secretKeyString = "[53,220,225,214,0,24,178,186,137,140,252,94,173,82,83,61,243,218,140,209,113,197,169,106,43,252,192,221,33,99,217,73,112,193,4,109,65,19,86,196,90,208,243,216,4,239,154,126,35,24,76,40,9,22,194,141,126,86,115,133,105,222,46,239]";
      const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      return Keypair.fromSecretKey(secretKey);
    }


     /**
     * @private
     */
      const getConfig : () => Promise<any> = async () => {
        // Path to Solana CLI config file
        const CONFIG_FILE_PATH = path.resolve(
          os.homedir(),
          '.config',
          'solana',
          'cli',
          'config.yml',
        );
        //const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
        const configYml = `---
      json_rpc_url: "https://api.devnet.solana.com"
      websocket_url: ""
      keypair_path: C:/Users/vasan/.config/solana/id.json
      address_labels:
        "11111111111111111111111111111111": System Program
      commitment: confirmed`
        return yaml.parse(configYml);
      }
        
  },[connectionUrl]);

    return (
        <> 
        {
          payerUrl &&
            <CheckProgram connectionUrl={connectionUrl} payerUrl={payerUrl} />   
        }
        </>
    );
  }
  
  export default EstablishPayer;
  