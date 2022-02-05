const router = require('express').Router();
import { clientApplication } from './clientApp';
import { EventListner } from './events';

/**
 * Create shipment
 * @method POST
 * @function create
 * @returns Response message
 */
router.post('/create', async (req, res) => {
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

    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');

    let message = await client.generatedAndSubmitTxn(
      'createShipment',
      shipmentId,
      data
    );
    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Retrieve shipment data
 * @method GET
 * @function read
 * @returns Shipment data
 */
router.get('/read', async (req, res) => {
  try {
    const shipmentId = req.query.shipmentId;
    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');

    let message = await client.generatedAndSubmitTxn(
      'readShipment',
      shipmentId
    );
    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

/**
 * Update shipment data
 * @method POST
 * @function update
 * @returns Response message
 */
router.post('/update', async (req, res) => {
  try {
    const { shipmentId, ...newData } = req.body;
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'updateShipment',
      shipmentId,
      newData
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Approval of shipment
 * @method POST
 * @function approval
 * @returns Response message
 */
router.post('/approval', async (req, res) => {
  try {
    const { shipmentId, approvalID, approvedBy } = req.body;

    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'addApproval',
      shipmentId,
      approvalID,
      approvedBy
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Verification of shipment
 * @method POST
 * @function verification
 * @returns Response message
 */
router.post('/verification', async (req, res) => {
  try {
    const { shipmentId, verificationID, portData } = req.body;
    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'addVerification',
      shipmentId,
      verificationID,
      portData
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Clearance of shipment
 * @method POST
 * @function clearance
 * @returns Response message
 */
router.post('/clearance', async (req, res) => {
  try {
    const { shipmentId, arrivalPortData, arrivalTimestamp, clearanceID } =
      req.body;
    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'addClearance',
      shipmentId,
      arrivalPortData,
      arrivalTimestamp,
      clearanceID
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Receipt of shipment
 * @method POST
 * @function receipt
 * @returns Response message
 */
router.post('/receipt', async (req, res) => {
  try {
    const { shipmentId, name, contactNo, contactAddress } = req.body;
    const receiver = `${name}+^${contactNo}+^${contactAddress}`;
    let client = new clientApplication();
    client.setRoleAndIdentity('shipper', 'admin');
    client.initChannelAndChaincode('shipping', 'smartcontract');
    let message = await client.generatedAndSubmitTxn(
      'addReceipt',
      shipmentId,
      receiver
    );

    const response = message.toString();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * Create Private Data of shipment
 * @method POST
 * @function privateSend
 * @returns Response message
 */
router.post('/privateSend', async (req, res) => {
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
});

/**
 * Read Private Data of shipment
 * @method GET
 * @function privateCall
 * @returns Response message (private data)
 */
router.get('/privateCall', async (req, res) => {
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
});

// Block Event
let BlockCreation = new EventListner();
BlockCreation.setRoleAndIdentity('shipper', 'admin');
BlockCreation.initChannelAndChaincode('shipping', 'smartcontract');
BlockCreation.blockEventListner('blockEvent');

export default router;
