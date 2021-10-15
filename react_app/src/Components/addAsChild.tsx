import {
    PublicKey,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Transaction,
  } from '@solana/web3.js';
  import * as borsh from 'borsh';
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  
  const AddAsChild = ({connectionUrl, payerUrl}) => {
  
  
          /**
       * The public keys of the accounts the components belong to
       */
    let qcom: PublicKey;
    let nvd: PublicKey;

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
      
      addAsChild();
      
     // Add QCOM to NVD as child ///////////////////////////////////////////////////////////////////////////////////
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
    console.log("Transaction receipt: ", tx);
  }

  return (
    <div>
    </div>
  )
  
  };
  
  export default AddAsChild;
  
  