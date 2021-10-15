import React, {useEffect, useState} from 'react';
import {
    Keypair,
    PublicKey,
    SystemProgram,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Transaction,
  } from '@solana/web3.js';
  import fs from 'mz/fs';
  import path from 'path';
  import * as borsh from 'borsh';
  import CreateComponentQcom from '../Components/createComponentQcom';
  import { useHistory } from "react-router-dom";
  import type { RootState } from '../redux/store';
  import { useDispatch, useSelector} from "react-redux";
  import {mintResponse, enableAddAsaChildButton, burnResponse} from '../redux/actions/loginUser';

const CheckProgram = ({connectionUrl, payerUrl}) => {

  const [qCOM, setQCOM] = useState ("");

  const [nVD, setNvd] = useState ("");

  const [programIdVal , setProgramId] = useState ({});

  let mintDataValue;

  const mintData = useSelector((state: RootState) => state.mintReducer.mintDataValues);

  const mintProductData = useSelector((state: RootState) => state.mintReducer.mintProductDataValues);
  
  const addAsAChildValue = useSelector((state: RootState) => state.mintReducer.addAsAChildValue);
  
  const burnComponentData = useSelector((state: RootState) => state.mintReducer.burnComponentData);

  const addAsAChildReproduceValue = useSelector((state: RootState) => state.mintReducer.addAsAChildReproduceValue);
  
  const mintProductProductDataValues = useSelector((state: RootState) => state.mintReducer.mintProductProductDataValues);


  if(mintProductProductDataValues && mintProductProductDataValues[1] === 'mintAReproduceProduct'){
    mintDataValue = mintProductProductDataValues && mintProductProductDataValues[0];
  } else if(mintProductData && mintProductData[1] === 'mintAProduct'){
    mintDataValue = mintProductData && mintProductData[0];
  } else {
    mintDataValue = mintData && mintData[0];
  }



  const dispatch = useDispatch();


  useEffect(() => {
    /**
 * Hello mytoken's program id
 */
let programId: PublicKey;


/**
 * The public keys of the accounts the components belong to
 */
 let qcom: PublicKey;
 let nvd: PublicKey;
 


/**
 * Path to program files
 */
 const PROGRAM_PATH = path.resolve(__dirname, '../dist/program');


 /**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'hellomytoken.so');

    /**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/hellomytoken.so`
 */
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'hellomytoken-keypair.json');



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
    

/**
 * Check if the hello mytoken BPF program has been deployed
 */

checkProgram();
 
 async function checkProgram(): Promise<void>  {
    // Read program id from keypair file
    try {
       // const secretKeyString = await fs.readFile(filePath, {encoding: 'utf8'});
      //  const secretKeyString = "[57,100,218,123,226,126,220,74,57,153,83,45,55,167,40,238,12,253,218,191,224,103,208,99,64,206,158,79,114,15,137,12,215,80,224,181,85,34,9,137,151,96,239,101,230,29,109,172,255,255,200,11,97,70,45,77,205,48,207,109,110,184,244,182]"
      //   const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      //   const programKeypair = Keypair.fromSecretKey(secretKey);
      const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
       programId = programKeypair.publicKey;
       setProgramId(programId);
    } catch (err) {
      const errMsg = (err as Error).message;
      throw new Error(
        `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/hellomytoken.so\``,
      );
    }
  
    // Check if the program has been deployed
  const programInfo = await connectionUrl.getAccountInfo(programId);
  if (programInfo === null) {
    if (fs.existsSync(PROGRAM_SO_PATH)) {
      throw new Error(
        'Program needs to be deployed with `solana program deploy dist/program/hellomytoken.so`',
      );
    } else {
      throw new Error('Program needs to be built and deployed');
    }
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }
  console.log(`Using program ${programId.toBase58()}`);
  
    // Derive the address (public key) of a component account from the program so that it's easy to find later.
  
    let COMPONENT_SEED_QCOM = mintDataValue && mintDataValue.componentid;

  if(mintProductProductDataValues && mintProductProductDataValues[1] === "mintAReproduceProduct"){
      COMPONENT_SEED_QCOM = mintProductProductDataValues[0] && mintProductProductDataValues[0].componentid;
  } else if(addAsAChildReproduceValue && addAsAChildReproduceValue[0] === "addAsAChildReProduce"){
    COMPONENT_SEED_QCOM = addAsAChildReproduceValue[1];
  }  else if(burnComponentData && burnComponentData[0] === "BurnAProduct"){
    COMPONENT_SEED_QCOM = burnComponentData[1];
  } else if (addAsAChildValue && addAsAChildValue[0] === "addAsAChild" ){
    COMPONENT_SEED_QCOM = addAsAChildValue[1];
  } 
  qcom = await PublicKey.createWithSeed(
    payerUrl.publicKey,
    COMPONENT_SEED_QCOM,
    programId,
  );

  
   // Check if the greeting account has already been created
  const greetedAccount_qcom = await connectionUrl.getAccountInfo(qcom);
  if (greetedAccount_qcom === null) {
    console.log(
      'Creating account',
      qcom.toBase58(),
      'to store component',
      'with storage size: ',
      COMPONENT_SIZE
    );
    const lamports = await connectionUrl.getMinimumBalanceForRentExemption(
      COMPONENT_SIZE,
    );
  
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: payerUrl.publicKey,
        basePubkey: payerUrl.publicKey,
        seed: COMPONENT_SEED_QCOM,
        newAccountPubkey: qcom,
        lamports,
        space: COMPONENT_SIZE,
        programId,
      }),
    );
    await sendAndConfirmTransaction(connectionUrl, transaction, [payerUrl]);
    } else {
      console.log(
        'account already created',
        qcom.toBase58(),
        'to store component',
        'with storage size: ',
        COMPONENT_SIZE
      );
    }
  
    // Derive the address (public key) of a greeting account from the program so that it's easy to find later.
    let COMPONENT_SEED_NVD = mintDataValue && mintDataValue.componentid;

  if(mintProductProductDataValues && mintProductProductDataValues[1] === "mintAReproduceProduct"){
    COMPONENT_SEED_NVD = mintProductProductDataValues[0] && mintProductProductDataValues[0].componentid;
  } else if(addAsAChildReproduceValue && addAsAChildReproduceValue[0] === "addAsAChildReProduce"){
    COMPONENT_SEED_NVD = addAsAChildReproduceValue[1];
  }  else if(burnComponentData && burnComponentData[0] === "BurnAProduct"){
    COMPONENT_SEED_NVD = burnComponentData[1];
  } else if (addAsAChildValue && addAsAChildValue[0] === "addAsAChild" ){
    COMPONENT_SEED_NVD = addAsAChildValue[1];
  } 
    //const COMPONENT_SEED_NVD = mintDataValue && mintDataValue.componentid;
    nvd = await PublicKey.createWithSeed(
      payerUrl.publicKey,
      COMPONENT_SEED_NVD,
      programId,
    );

    // Check if the greeting account has already been created
    const greetedAccount_nvd = await connectionUrl.getAccountInfo(nvd);
    if (greetedAccount_nvd === null) {
      console.log(
        'Creating account',
        nvd.toBase58(),
        'to store component',
        'with storage size: ',
        COMPONENT_SIZE
      );
      const lamports = await connectionUrl.getMinimumBalanceForRentExemption(
        COMPONENT_SIZE,
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payerUrl.publicKey,
          basePubkey: payerUrl.publicKey,
          seed: COMPONENT_SEED_NVD,
          newAccountPubkey: nvd,
          lamports,
          space: COMPONENT_SIZE,
          programId,
        }),
      );
      await sendAndConfirmTransaction(connectionUrl, transaction, [payerUrl]);
    }

    setQCOM(qcom.toBase58());
    //setNvd(nvd.toBase58());
  
    console.log("Component Qcom PDA: ", qcom.toBase58());
    //console.log("Component Nvd PDA: ", nvd.toBase58());
    if(burnComponentData && burnComponentData[0] === "BurnAProduct"){
      burnQcom();
    } else {
      createComponentQcom();
    }
  }

  
   /**
     * Create a Keypair from a secret key stored in file as bytes' array
     */
    async function createKeypairFromFile(
      filePath: string,
    ): Promise<Keypair> {
        //const secretKeyString = await fs.readFile(filePath, {encoding: 'utf8'});
       const secretKeyString = "[57,100,218,123,226,126,220,74,57,153,83,45,55,167,40,238,12,253,218,191,224,103,208,99,64,206,158,79,114,15,137,12,215,80,224,181,85,34,9,137,151,96,239,101,230,29,109,172,255,255,200,11,97,70,45,77,205,48,207,109,110,184,244,182]"
        const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
        return Keypair.fromSecretKey(secretKey);
      }

    
      //QCOM ///////////////////////////////////////////////////////////////////////////////////////
      async function createComponentQcom(): Promise<void> {
          console.log('Creating component for account:', qcom.toBase58());
        
              let this_component = new Component()
              this_component.opcode = 100; // u8
              this_component.id = mintDataValue && mintDataValue.componentid; //u8
              this_component.description = new TextEncoder().encode((mintDataValue && mintDataValue.description).substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
              this_component.name = new TextEncoder().encode(( mintDataValue && mintDataValue.name).substring(0, 16).padEnd(16,'*')); // len exactly 16bytes
              this_component.serial_no = new TextEncoder().encode(( mintDataValue && mintDataValue.serielNo).substring(0, 16).padEnd(16,'0')); // len exactly 16bytes
              this_component.active = 1;
              // parent and children array initialized to 0 and program will set it on ledger
              
              let this_component_s = borsh.serialize(
                ComponentSchema,
                this_component,
              );
      
              const instruction = new TransactionInstruction({
                keys: [{pubkey: qcom, isSigner: false, isWritable: true}],
                 programId,
                data: Buffer.from(this_component_s),
              });
      
              let tx = await sendAndConfirmTransaction(
                connectionUrl,
                new Transaction().add(instruction),
                [payerUrl],
              );
              console.log("Transaction receipt: ", tx);
            if(addAsAChildReproduceValue && addAsAChildReproduceValue[0] === "addAsAChildReProduce"){
                addAsChild();
             } else if(addAsAChildValue && addAsAChildValue[0] === "addAsAChild" &&
             addAsAChildReproduceValue && addAsAChildReproduceValue[0] !== "addAsAChildReProduce" && 
             mintProductProductDataValues && mintProductProductDataValues[1] !== "mintAReproduceProduct"){
                addAsChild();
             } else if(burnComponentData && burnComponentData[0] === "BurnAProduct" 
             && mintProductProductDataValues && mintProductProductDataValues[1] !== "mintAReproduceProduct" &&
             addAsAChildReproduceValue && addAsAChildReproduceValue[0] !== "addAsAChildReProduce"){
                burnQcom();
             } else if(mintProductData && mintProductData[1] === 'mintAProduct'){
                dispatch(enableAddAsaChildButton(true));
             }
              // if(mintProductData && mintProductData[1] === 'mintAProduct'){
              //  for(let i=0; i < mintProductData[2].length; i++){
              //   addAsChild();
              //  }
              // }
              // if(burnComponentData && burnComponentData[0] === "BurnAProduct"){
              //   for(let i=0; i < burnComponentData[1].length; i++){
              //     burnQcom();
              //   }
              //  }
              dispatch(mintResponse(tx));
          }

                // Update
       async function updateComponentQcom(): Promise<void> {
          console.log('Updating component for account:', qcom.toBase58());

          let this_component = new Component()
          this_component.opcode = 101; // u8
          this_component.description = new TextEncoder().encode("Mobile CPU (8nm technology), 6 core, 8GB, 16MB cache. Made in SG.".substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
          this_component.name = new TextEncoder().encode("SnapGodzilla-900".substring(0, 16).padEnd(16,'*')); // len exactly 16bytes
          this_component.serial_no = new TextEncoder().encode("QPUA-QW-10009".substring(0, 16).padEnd(16,'0')); // len exactly 16bytes
          this_component.active = 1;
          // parent and children can be updated if needed.
          // id cant be changed and will be ignored by program


          let this_component_s = borsh.serialize(
            ComponentSchema,
            this_component,
          );

          const instruction = new TransactionInstruction({
            keys: [{pubkey: qcom, isSigner: false, isWritable: true}],
            programId,
            data: Buffer.from(this_component_s),
          });
          let tx = await sendAndConfirmTransaction(
            connectionUrl,
            new Transaction().add(instruction),
            [payerUrl],
          );
          console.log("Transaction receipt: ", tx);
          reportComponentQcom();
        }

            // Report Qcom state from ledger
      async function reportComponentQcom(): Promise<void> {
        const accountInfo = await connectionUrl.getAccountInfo(qcom);
        if (accountInfo === null) {
          throw 'Error: cannot find the greeted account';
        }
        const component = borsh.deserialize(
          ComponentSchema,
          Component,
          accountInfo.data,
        );

        let res_status = "No";
        if (component.active == 0) {
          res_status = "Yes";
        }

        console.log(
          'Account:',
          qcom.toBase58(),
          '\n',
          'ID:',
          component.id,
          '\n',
          'Description:',
          new TextDecoder().decode(component.description),
          '\n',
          'Name:',
          new TextDecoder().decode(component.name),
          '\n',
          'Serial No.:',
          new TextDecoder().decode(component.serial_no),
          '\n',
          'Parent component ID:',
          component.parent,
          '\n',
          'Children components IDs:',
          component.children,
          '\n',
          'Recycled?:',
          res_status,
          '\n'
        );
        createComponentNvd();
      }

// NVD////////////////////////////////////////////////////////////////////////////////////////
// Mint
async function createComponentNvd(): Promise<void> {
  console.log('Creating component for account:', nvd.toBase58());

  let this_component = new Component()
  this_component.opcode = 100; // u8
  this_component.id = 201; //u8
  this_component.description = new TextEncoder().encode("Integrated GPU, 512 stream cores, 1GB VRAM. Made in TW.".substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
  this_component.name = new TextEncoder().encode("Einstein".substring(0, 16).padEnd(16,'*')); // len exactly 16bytes
  this_component.serial_no = new TextEncoder().encode("NVD-NN-88-UYTRE".substring(0, 16).padEnd(16,'0')); // len exactly 64bytes
  this_component.active = 1;
  // parent and children array initialized to 0 and program will set it on ledger
  
  let this_component_s = borsh.serialize(
    ComponentSchema,
    this_component,
  );

  const instruction = new TransactionInstruction({
    keys: [{pubkey: nvd, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.from(this_component_s),
  });
  let tx = await sendAndConfirmTransaction(
    connectionUrl,
    new Transaction().add(instruction),
    [payerUrl],
  );
  console.log("Transaction receipt: ", tx);
  updateComponentNvd();
}


// Update
 async function updateComponentNvd(): Promise<void> {
  console.log('Updating component for account:', nvd.toBase58());

  let this_component = new Component()
  this_component.opcode = 101; // u8
  this_component.description = new TextEncoder().encode("Integrated GPU on chip, 512 stream cores, 1GB VRAM. Made in TW.".substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
  this_component.name = new TextEncoder().encode("Einstein-1000111".substring(0, 16).padEnd(16,'*')); // len exactly 16bytes
  this_component.serial_no = new TextEncoder().encode("NVD-NN-88-UYTRE".substring(0, 16).padEnd(16,'0')); // len exactly 16bytes
  this_component.active = 1;
  // parent and children can be updated if needed.
  // id cant be changed and will be ignored by program
  
  let this_component_s = borsh.serialize(
    ComponentSchema,
    this_component,
  );

  const instruction = new TransactionInstruction({
    keys: [{pubkey: nvd, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.from(this_component_s),
  });
  let tx = await sendAndConfirmTransaction(
    connectionUrl,
    new Transaction().add(instruction),
    [payerUrl],
  );
  console.log("Transaction receipt: ", tx);
  reportComponentNvd();
}

// Report Nvd state from ledger
async function reportComponentNvd(): Promise<void> {
  const accountInfo = await connectionUrl.getAccountInfo(nvd);
  if (accountInfo === null) {
    throw 'Error: cannot find the greeted account';
  }
  const component = borsh.deserialize(
    ComponentSchema,
    Component,
    accountInfo.data,
  );

  let res_status = "No";
  if (component.active == 0) {
    res_status = "Yes";
  }

  console.log(
    'Account:',
    nvd.toBase58(),
    '\n',
    'ID:',
    component.id,
    '\n',
    'Description:',
    new TextDecoder().decode(component.description),
    '\n',
    'Name:',
    new TextDecoder().decode(component.name),
    '\n',
    'Serial No.:',
    new TextDecoder().decode(component.serial_no),
    '\n',
    'Parent component ID:',
    component.parent,
    '\n',
    'Children components IDs:',
    component.children,
    '\n',
    'Recycled?:',
    res_status,
    '\n'
  );
  addAsChild();
}

// Link QCOM to NVD as child ///////////////////////////////////////////////////////////////////////////////////
 async function addAsChild(): Promise<void> {
  console.log("Adding child to parent:");
  console.log('Child:', qcom.toBase58());
  console.log('Parent:', nvd.toBase58());

  let this_component = new Component()
  this_component.opcode = 102; // u8
  
  let this_component_s = borsh.serialize(
    ComponentSchema,
    this_component,
  );

  const instruction = new TransactionInstruction({
    keys: [{pubkey: qcom, isSigner: false, isWritable: true},
      {pubkey: nvd, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.from(this_component_s),
  });
  let tx = await sendAndConfirmTransaction(
    connectionUrl,
    new Transaction().add(instruction),
    [payerUrl],
  );
  console.log('*** ddAsAChildReproduceValue[1]', addAsAChildReproduceValue[1]);
  var data = Object.values(Object.entries(localStorage).filter(([key]) => key.includes(addAsAChildReproduceValue[1] ? addAsAChildReproduceValue[1] : addAsAChildValue[1])));
  console.log('*** data', data);
  data && data.length > 0 && data.map(elem => {
    let val1 = JSON.parse(elem[1]);
    console.log('***', val1);
    let obj = {};
   // @ts-expect-error: Let's ignore a compile error like this unreachable code 
      obj.id = val1.id;
   // @ts-expect-error: Let's ignore a compile error like this unreachable code 
      obj.description = val1.description;
   // @ts-expect-error: Let's ignore a compile error like this unreachable code 
      obj.name = val1.name;
   // @ts-expect-error: Let's ignore a compile error like this unreachable code 
      obj.serielNo = val1.serielNo;
   // @ts-expect-error: Let's ignore a compile error like this unreachable code 
      obj.parent = mintProductProductDataValues[0] ? mintProductProductDataValues[0].componentid : mintProductData[0].componentid ;
  localStorage.setItem(val1.id, JSON.stringify(obj));
  })
  
  console.log("Transaction receipt: ", tx);
  if(mintProductProductDataValues && mintProductProductDataValues[1] !== "mintAReproduceProduct"){
    burnQcom();
  }
}

// Burn Nvd
 async function burnQcom(): Promise<void> {
  console.log("Recycling Qcom");

  let this_component = new Component()
  this_component.opcode = 103; // u8
  
  let this_component_s = borsh.serialize(
    ComponentSchema,
    this_component,
  );

  const instruction = new TransactionInstruction({
    keys: [{pubkey: qcom, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.from(this_component_s),
  });
  let tx = await sendAndConfirmTransaction(
    connectionUrl,
    new Transaction().add(instruction),
    [payerUrl],
  );
 
  const valueVariable =  Object.values(localStorage);
  var data = Object.values(Object.entries(localStorage).filter(([key]) => key.includes(burnComponentData[1] )));

  data && data.length > 0 && data.map(elem => {
    let val1 = JSON.parse(elem[1]);
    let val2 = parseInt(val1.id);
    if(val1.id == burnComponentData[1]) {
      localStorage.removeItem(val1.id);
      
    }
  })

  

  valueVariable && valueVariable.length > 0 && valueVariable.map(elem => {
      
  var dataPush = [];

 for(let i=0; i < valueVariable.length; i++){
   elem = JSON.parse(valueVariable[i]);
   if(elem.parent == burnComponentData[1]){
    let obj = {};
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
       obj.id = elem.id;
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
       obj.description = elem.description;
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
       obj.name = elem.name;
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
       obj.serielNo = elem.serielNo;
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
       obj.parent = 0;
       localStorage.setItem( elem.id, JSON.stringify(obj));
    }   
   }
 })

  console.log("Transaction receipt: ", tx);
  dispatch(burnResponse(tx));
}


  },[payerUrl]);

  return (
    <>
        {/* {
           qCOM && nVD && programIdVal && programIdVal !== undefined &&
            <CreateComponentQcom connectionUrl={connectionUrl} payerUrl={payerUrl} qCOM={qCOM} programIdVal={programIdVal} />   
        } */}
    </>
  );

}

export default CheckProgram;