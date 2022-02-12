const { clientApplication } = require('../routes/clientApp');

/**
 * Create shipment
 * @method POST
 * @function create
 * @returns Response message
 */
const create = async (req, res) => {
  try {
    let {
      name,
      contactNo,
      content,
      contactAddress,
      deliveryNo,
      deliveryAddress,
      shipmentId,
    } = req.body;
    const data = `${name}+^${contactNo}+^${content}+^${contactAddress}+^${deliveryNo}+^${deliveryAddress}`;

    let response = await responseFromShipper(
      'createShipment',
      shipmentId,
      data
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Retrieve shipment data
 * @method GET
 * @function read
 * @returns Shipment data
 */
const read = async (req, res) => {
  try {
    const shipmentId = req.query.shipmentId;
    let response = await responseFromShipper(
      'readShipment',
      shipmentId
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

/**
 * Update shipment data
 * @method POST
 * @function update
 * @returns Response message
 */
const update = async (req, res) => {
  try {
    const { shipmentId, ...newData } = req.body;
    let response = await responseFromShipper(
      'updateShipment',
      shipmentId,
      newData
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Approval of shipment
 * @method POST
 * @function approval
 * @returns Response message
 */
const approval = async (req, res) => {
  try {
    const { shipmentId, approvalID, approvedBy } = req.body;
    let response = await responseFromShipper(
      'addApproval',
      shipmentId,
      approvalID,
      approvedBy
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Verification of shipment
 * @method POST
 * @function verification
 * @returns Response message
 */
const verification = async (req, res) => {
  try {
    const { shipmentId, verificationID, portData } = req.body;
    let response = await responseFromShipper(
      'addVerification',
      shipmentId,
      verificationID,
      portData
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Clearance of shipment
 * @method POST
 * @function clearance
 * @returns Response message
 */
const clearance = async (req, res) => {
  try {
    const { shipmentId, arrivalPortData, arrivalTimestamp, clearanceID } =
      req.body;
    let response = await responseFromShipper(
      'addClearance',
      shipmentId,
      arrivalPortData,
      arrivalTimestamp,
      clearanceID
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Receipt of shipment
 * @method POST
 * @function receipt
 * @returns Response message
 */
const receipt = async (req, res) => {
  try {
    const { shipmentId, name, contactNo, contactAddress } = req.body;
    const receiver = `${name}+^${contactNo}+^${contactAddress}`;
    let response = await responseFromShipper(
      'addReceipt',
      shipmentId,
      receiver
    ).toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Create Private Data of shipment
 * @method POST
 * @function privateSend
 * @returns Response message
 */
const privateSend = async (req, res) => {
  try {
    const { shipmentId, secret } = req.body;
    const transientData = {
      privateData: Buffer.from(secret),
    };
    let client = new clientApplication();
    client.setRoleAndIdentity('auth1', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitPrivateTxn(
      'createPrivateAsset',
      shipmentId,
      transientData
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Read Private Data of shipment
 * @method GET
 * @function privateCall
 * @returns Response message (private data)
 */
const privateCall = async (req, res) => {
  try {
    const shipmentId = req.query.shipmentId;
    let client = new clientApplication();
    client.setRoleAndIdentity('auth2', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'readPrivateAsset',
      shipmentId
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Returns the message in accordance with the transaction for Role: Shipper and Identity: Admin in Channel: shipping and chaincode: smartcontract
 *
 * @param   {[string]}  txnName  [Transaction Name]
 * @param   {[object]}  args     [Passing arguments]
 * @return  {[object]} message   [response message form blockchain]
 */
async function responseFromShipper(txnName, ...args) {
  try {
    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(txnName, ...args);
    return message;
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  create,
  read,
  update,
  approval,
  verification,
  privateSend,
  receipt,
  clearance,
  privateCall,
};
