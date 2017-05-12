import * as express from 'express';
const router = express.Router();
import db from '../db';
import { Simcha, User } from '../../frontend/src/Simcha';

router.get('/', async (req, res) => {
    try {
        let count = await db.contributors.contributorCount(req.user);
        console.log(count);
        let balance: number = await db.contributors.total(req.user);
        let upcoming: Simcha[] = await db.simchas.getUpcoming(req.user);
        let user: User = await db.users.getUserById(req.user);
        res.json({ totalContributors: count, balance: balance, upcomingSimchas:upcoming, username: user.username });
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }

});



export default router;