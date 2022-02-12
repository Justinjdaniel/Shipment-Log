const { profile } = require('./profile');
const { FileSystemWallet, Gateway } = require('fabric-network');
const util = require('util');
const logger = require('../utils/logger');

class EventListener {
  setRoleAndIdentity(role, identityLabel) {
    this.Profile = profile[role.toLowerCase()];
    let wallet = new FileSystemWallet(this.Profile['Wallet']);
    this.connectionOptions = {
      identity: identityLabel,
      wallet: wallet,
      discovery: { enabled: true, asLocalhost: true },
    };
  }

  initChannelAndChaincode(channelName, contractName) {
    //set channel name
    this.channel = channelName;
    //set contract name
    this.contractName = contractName;
    this.gateway = new Gateway();
  }
  async blockEventListener(eventListenerName) {
    await this.gateway.connect(this.Profile['CCP'], this.connectionOptions);
    let channel = await this.gateway.getNetwork(this.channel);
    await channel.addBlockListener(eventListenerName, (err, block) => {
      if (err) {
        logger.error(err);
      }
      logger.info(util.inspect(block));
    });
  }
}

module.exports = {
  EventListener,
};
