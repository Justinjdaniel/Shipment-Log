import  profile  from './profile';
import { FileSystemWallet, Gateway, TransientMap } from 'fabric-network';

class clientApplication {
  Profile: string ;
  setRoleAndIdentity(role: string, identityLabel: any) {
    this.Profile = profile[role.toLowerCase()];
    let wallet = new FileSystemWallet(this.Profile['Wallet']);
    this.connectionOptions = {
      identity: identityLabel,
      wallet: wallet,
      discovery: { enabled: true, asLocalhost: true },
    };
  }

  initChannelAndChaincode(channelName: any, contractName: any) {
    //set channel name
    this.channel = channelName;
    //set contract name
    this.contractName = contractName;
  }

  async generatedAndSubmitTxn(txnName: string, ...args: any[]) {
    let gateway = new Gateway();
    try {
      //connects to the fabric network using the connectionOptions and connection profile
      await gateway.connect(this.Profile['CCP'], this.connectionOptions);
      //connects to the network
      let channel = await gateway.getNetwork(this.channel);
      //gets the contract based on the name
      let contract = await channel.getContract(this.contractName);
      //submits the transactions and returns the result
      let result = await contract.submitTransaction(txnName, ...args);
      return result;
    } catch (error) {
      logger.error(`Error processing transaction. ${error}`);
      // console.log(error.stack);
      throw error.endorsements[0];
    } finally {
      // Disconnect from the gateway
      logger.info('Disconnect from Fabric gateway.');
      gateway.disconnect();
    }
  }

  // For generate and submit Private data Transaction
  // Ref:https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-private-data.html
  async generatedAndSubmitPrivateTxn(txnName: string, id: string, transientData: TransientMap) {
    let gateway = new Gateway();
    try {
      //connects to the fabric network using the connectionOptions and connection profile
      await gateway.connect(this.Profile['CCP'], this.connectionOptions);
      // console.log(gateway)
      //connects to the network
      let channel = await gateway.getNetwork(this.channel);
      //gets the contract based on the name
      let contract = await channel.getContract(this.contractName);
      //submits the transactions and returns the result
      let result = await contract
        .createTransaction(txnName)
        .setTransient(transientData)
        .submit(id);
      return result;
    } catch (error) {
      logger.error(`Error processing transaction. ${error}`);
      // console.log(error.stack);
      throw error.endorsements[0];
    } finally {
      // Disconnect from the gateway
      logger.info('Disconnect from Fabric gateway.');
      gateway.disconnect();
    }
  }
}

module.exports = {
  clientApplication,
};
