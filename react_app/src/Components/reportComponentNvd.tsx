import {
    PublicKey,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Transaction,
  } from '@solana/web3.js';
  import * as borsh from 'borsh';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import UpdateComponentNvd from '../Components/updateComponentNvd';
  
  const ReportComponentNvd = ({connectionUrl, payerUrl}) => {
  
  
          /**
       * The public keys of the accounts the components belong to
       */
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
      
      reportComponentNvd();
 /**
 * Report the number of times the greeted account has been said hello to
 */
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
      'Serial No.:',
      new TextDecoder().decode(component.serial_no),
      '\n',
      'Parent component ID:',
      component.parent,
      '\n',
      'Children components IDs:',
      component.children,
    );
  }

  return (
    <div className="App">
    {
      
        <UpdateComponentNvd connectionUrl={connectionUrl} payerUrl={payerUrl} />   
    }
    </div>
   )
  };
  
  export default ReportComponentNvd;
  
  