import  profile  from './profile';
import { FileSystemWallet, Gateway } from 'fabric-network';
import util from 'util';

class EventListner {
  setRoleAndIdentity(role: string, identityLabel: string) {
    this.Profile = profile[role.toLowerCase()];
    let wallet = new FileSystemWallet(this.Profile['Wallet']);
    this.connectionOptions = {
      identity: identityLabel,
      wallet: wallet,
      discovery: { enabled: true, asLocalhost: true },
    };
  }

  initChannelAndChaincode(channelName:string, contractName:string) {
    //set channel name
    this.channel = channelName;
    //set contract name
    this.contractName = contractName;
    this.gateway = new Gateway();
  }
  async blockEventListner(eventListnerName) {
    await this.gateway.connect(this.Profile['CCP'], this.connectionOptions);
    let channel = await this.gateway.getNetwork(this.channel);
    await channel.addBlockListener(eventListnerName, (err, block) => {
      if (err) {
        console.error(err);
      }
      console.info(util.inspect(block));
    });
  }
}

module.exports = {
  EventListner,
};
