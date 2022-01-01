import { Router } from 'express';

const baseRouter = Router();
baseRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default baseRouter;
