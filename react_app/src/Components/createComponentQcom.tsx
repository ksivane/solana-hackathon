import React, {useEffect, useState} from 'react';
import {
  PublicKey,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReportComponentQcom from '../Components/reportComponentQcom';

const CreateComponentQcom = ({connectionUrl, payerUrl, qCOM , programIdVal}) => {


  useEffect(() => {
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
    
    createComponentQcom();
// QCOM ///////////////////////////////////////////////////////////////////////////////////////
async function createComponentQcom(): Promise<void> {
    console.log('Creating component for account:', qCOM);
  
        let this_component = new Component()
        this_component.opcode = 100; // u8
        this_component.id = 101; //u8
        this_component.description = new TextEncoder().encode("Mobile CPU (8nm technology), 4 core, 4GB, 16MB cache. Made in SG.".substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
        this_component.name = new TextEncoder().encode("SnapGodzilla".substring(0, 16).padEnd(16,'*')); // len exactly 16bytes
        this_component.serial_no = new TextEncoder().encode("QPUA-QW-10009".substring(0, 16).padEnd(16,'0')); // len exactly 16bytes
        this_component.active = 1;
        // parent and children array initialized to 0 and program will set it on ledger
        
        let this_component_s = borsh.serialize(
          ComponentSchema,
          this_component,
        );

        const instruction = new TransactionInstruction({
          keys: [{pubkey: qCOM, isSigner: false, isWritable: true}],
          //@ts-ignore
          programIdVal,
          data: Buffer.from(this_component_s),
        });

        console.log('programIdVal', programIdVal);

        let tx = await sendAndConfirmTransaction(
          connectionUrl,
          new Transaction().add(instruction),
          [payerUrl],
        );
        console.log("Transaction receipt: ", tx);
    }

  },[]);

return (
    <div className="App">
    {/* {
      
        <ReportComponentQcom connectionUrl={connectionUrl} payerUrl={payerUrl} />   
    } */}
</div>
)

};

export default CreateComponentQcom;

