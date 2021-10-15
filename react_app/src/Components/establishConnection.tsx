import React, {useEffect, useState} from 'react';
import {  useSelector} from "react-redux";
import type { RootState } from '../redux/store';
import { Connection } from '@solana/web3.js';
import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import yaml from 'yaml';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EstablishPayer from './establishPayer';
import { useHistory } from "react-router-dom";

const EstablishConnection = ({ mintData}) => {

  

  const [connectionUrl, setConnection] = useState <any> (false);
  
  console.log('mintAProduct5 ****', mintData);

  useEffect(() => {

    console.log('mintAProduct6 ****');

    /**
   * Connection to the network
   */
  let connection: Connection;


    /**
 * Establish a connection to the cluster
 */

     //const establishConnection : () => Promise<void> = async () => {
     
     establishConnection();
    
    async function establishConnection(): Promise<void> {
    
      const rpcUrl = await getRpcUrl();
      connection = new Connection(rpcUrl, 'confirmed');
      const version = await connection.getVersion();
      const {feeCalculator} = await connection.getRecentBlockhash();
      console.log('Connection to cluster established:', rpcUrl, version);
      if(rpcUrl && version){
        setConnection(connection);
      }
    }
  

    /**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
 async function getRpcUrl(): Promise<string> {
  try {
    const config = await getConfig();
    if (!config.json_rpc_url) throw new Error('Missing RPC URL');
    return config.json_rpc_url;
  } catch (err) {
    console.warn(
      'Failed to read RPC url from CLI config file, falling back to localhost',
    );
    return 'https://api.devnet.solana.com/';
  }
}
  
      /**
     * @private
     */
  async function getConfig(): Promise<any> {
    // const getConfig : () => Promise<any> = async () => {
      // Path to Solana CLI config file
      const CONFIG_FILE_PATH = path.resolve(
        os.homedir(),
        '.config',
        'solana',
        'cli',
        'config.yml',
      );
      //const configYml = await fs.readFileSync(CONFIG_FILE_PATH, {encoding: 'utf8'});
      const configYml = `---
      json_rpc_url: "https://api.devnet.solana.com"
      websocket_url: ""
      keypair_path: C:/Users/vasan/.config/solana/id.json
      address_labels:
        "11111111111111111111111111111111": System Program
      commitment: confirmed`
      return yaml.parse(configYml);
    }

  },[mintData]);

    return (
    <>
      {/* <div className="auth-wrapper">
        <div className="auth-inner">
        <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" />
                </div>

                <div className="form-group" style={{marginTop: '10px'}}>
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" />
                </div> */}

              {/* <div className="form-group" style={{marginTop: '10px'}}>
                <Button variant="primary" onClick={establishConnection}>Login</Button>
              </div> */}
            {/* </form>
        </div>
      </div> */}
      {
        connectionUrl && 
          <EstablishPayer connectionUrl={connectionUrl} />
      }
    </>
    );
  }
  
  export default EstablishConnection;
  