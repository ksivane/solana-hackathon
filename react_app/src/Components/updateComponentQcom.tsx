import {
    PublicKey,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Transaction,
  } from '@solana/web3.js';
  import * as borsh from 'borsh';
  import 'bootstrap/dist/css/bootstrap.min.css';
import CreateComponentNvd  from '../Components/createComponentNvd';
  
  
  const UpdateComponentQcom = ({connectionUrl, payerUrl}) => {
  
  
          /**
       * The public keys of the accounts the components belong to
       */
      let qcom: PublicKey;

      /**
     * Hello mytoken's program id
     */
    let programId: PublicKey;
  
  
      class Component {
          opcode = 0;   // u8 as defined in schema
          id = 0;       // u8 as defined in schema
          // description = 'Some short description of the component';
          description = new Uint8Array(64);
          // serial_no = 'XXX-YYY-000000';
          serial_no = new Uint8Array(16);
          parent = 0;   // u8
          children = new Uint8Array(10); // only fixed size supported by borsh
        
          constructor(fields: {opcode: number, id: number, description: Uint8Array, serial_no: Uint8Array, parent: number, children: Uint8Array} | undefined = undefined) {
            if (fields) {
              this.opcode = fields.opcode;
              this.id = fields.id;
              this.description = fields.description;
              this.serial_no = fields.serial_no;
              this.parent = fields.parent;
              this.children = fields.children;
            }
          }
        }
  
        const ComponentSchema = new Map([
          [Component, {kind: 'struct', fields: [
          ['opcode', 'u8'],
          ['id', 'u8'],  // types must match that in program
          ['description', [64]],
          ['serial_no', [16]],
          ['parent', 'u8'],
          ['children', [10]],
          ]}],
      ]);
      
      updateComponentQcom();

       async function updateComponentQcom(): Promise<void> {
        console.log('Updating component for account:', qcom.toBase58());
      
        let this_component = new Component()
        this_component.opcode = 101; // u8
        this_component.description = new TextEncoder().encode("Mobile CPU (8nm technology), 6 core, 8GB, 16MB cache. Made in SG.".substring(0, 64).padEnd(64,'*')); // len exactly 64bytes
        // all other fields will be ignored during uodate
      
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
      }
  
  return (
    <div className="App">
    {
      
        <CreateComponentNvd connectionUrl={connectionUrl} payerUrl={payerUrl} />   
    }
    </div>
  )
  
  };
  
  export default UpdateComponentQcom;
  
  