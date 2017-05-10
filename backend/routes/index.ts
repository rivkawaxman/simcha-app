import * as express from 'express';
const router = express.Router();

import simchas from './simchas';

router.use('/simchas', simchas);

import contributors from './contributors';

router.use('/contributors', contributors);

import user from './user';

router.use('/user', user);

export default router;