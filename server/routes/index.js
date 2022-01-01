var express = require('express');
var router = express.Router();
const { clientApplication } = require('./clientApp');
const { EventListner } = require('./events');

/**
 * Create shipment
 * @method POST
 * @function create
 * @returns Response message
 */
router.post('/create', function (req, res, next) {
  let name = req.body.name;
  let contactNo = req.body.contactNo;
  let content = req.body.content;
  let contactAddress = req.body.contactAddress;
  let deliveryNo = req.body.deliveryNo;
  let deliveryAddress = req.body.deliveryAddress;
  const data = `${name}+^${contactNo}+^${content}+^${contactAddress}+^${deliveryNo}+^${deliveryAddress}`;

  const shipmentId = req.body.shipmentId;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('createShipment', shipmentId, data)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Retrieve shipment data
 * @method GET
 * @function read
 * @returns Shipment data
 */
router.get('/read', function (req, res, next) {
  const shipmentId = req.query.shipmentId;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('readShipment', shipmentId)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

/**
 * Update shipment data
 * @method POST
 * @function update
 * @returns Response message
 */
router.post('/update', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const newData = {
    name: req.body.name,
    contactNo: req.body.contactNo,
    content: req.body.content,
    contactAddress: req.body.contactAddress,
  };
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('updateShipment', shipmentId, newData)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Approval of shipment
 * @method POST
 * @function approval
 * @returns Response message
 */
router.post('/approval', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const approvalID = req.body.approvalID;
  const approvedBy = req.body.approvedBy;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('addApproval', shipmentId, approvalID, approvedBy)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Verification of shipment
 * @method POST
 * @function verification
 * @returns Response message
 */
router.post('/verification', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const verificationID = req.body.verificationID;
  const portData = req.body.portData;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn(
      'addVerification',
      shipmentId,
      verificationID,
      portData
    )
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Clearance of shipment
 * @method POST
 * @function clearance
 * @returns Response message
 */
router.post('/clearance', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const arrivalPortData = req.body.arrivalPortData;
  const arrivalTimestamp = req.body.arrivalTimestamp;
  const clearanceID = req.body.clearanceID;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn(
      'addClearance',
      shipmentId,
      arrivalPortData,
      arrivalTimestamp,
      clearanceID
    )
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Receipt of shipment
 * @method POST
 * @function receipt
 * @returns Response message
 */
router.post('/receipt', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const receiver = `${req.body.name}+^${req.body.contactNo}+^${req.body.contactAddress}`;
  let client = new clientApplication();
  client.setRoleAndIdentity('shipper', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('addReceipt', shipmentId, receiver)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Create Private Data of shipment
 * @method POST
 * @function privateSend
 * @returns Response message
 */
router.post('/privateSend', function (req, res, next) {
  const shipmentId = req.body.shipmentId;
  const transientData = {
    privateData: Buffer.from(req.body.secret),
  };
  let client = new clientApplication();
  client.setRoleAndIdentity('auth1', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitPrivateTxn(
      'createPrivateAsset',
      shipmentId,
      transientData
    )
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

/**
 * Read Private Data of shipment
 * @method GET
 * @function privateCall
 * @returns Response message (private data)
 */
router.get('/privateCall', function (req, res, next) {
  const shipmentId = req.query.shipmentId;
  let client = new clientApplication();
  client.setRoleAndIdentity('auth2', 'admin');
  client.initChannelAndChaincode('shipping', 'smartcontract');
  client
    .generatedAndSubmitTxn('readPrivateAsset', shipmentId)
    .then((message) => {
      const response = message.toString();
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Block Event
let BlockCreation = new EventListner();
BlockCreation.setRoleAndIdentity('shipper', 'admin');
BlockCreation.initChannelAndChaincode('shipping', 'smartcontract');
BlockCreation.blockEventListner('blockEvent');

module.exports = router;
