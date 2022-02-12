const router = require('express').Router();
const {
  create,
  read,
  update,
  approval,
  verification,
  privateSend,
  receipt,
  clearance,
  privateCall,
} = require('../controller');
const { EventListener } = require('../routes/events');

router.post('/create', create);
router.get('/read', read);
router.post('/update', update);
router.post('/approval', approval);
router.post('/verification', verification);
router.post('/clearance', clearance);
router.post('/receipt', receipt);
router.post('/privateSend', privateCall);
router.get('/privateCall', privateCall);

// Block Event
let BlockCreation = new EventListener();
BlockCreation.setRoleAndIdentity('shipper', 'admin');
BlockCreation.initChannelAndChaincode('shipping', 'smartcontract');
BlockCreation.blockEventListener('blockEvent');

module.exports =  router;
