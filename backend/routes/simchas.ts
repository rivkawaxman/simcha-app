import * as express from 'express';
const router = express.Router();
import db from '../db';
import {Contribution, Simcha, Contributor} from '../../frontend/src/Simcha';


router.get('/', async (req, res) => {
    try {
        console.log(req.user);
        let simchas:Simcha[] = await db.simchas.getAll(req.user);
        res.json(simchas);
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/add', async (req, res) => {
    try {
        let simchaId:number = await db.simchas.add(req.body.simcha, req.user);
        res.json("Simcha id = " + simchaId);
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/delete', async (req, res) => {
    try {
        let dunno = await db.simchas.remove(req.body.id);
    }
    catch (e) {
        console.log(e);
    }
    res.json({ msg: "success" });
});

router.post('/contributions', async (req, res) => {
    try {
        let contributions:Contribution[] = await db.simchas.getContributions(req.body.id);
        res.json(contributions);
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/addContributions', async (req, res) => {
    try {
        let contributions:Contribution[] = req.body.contributions;
        let dunno = await db.simchas.addContributions(contributions);
        for (let c of contributions) {
            let result = await db.contributors.getCurrentBAlance(c.contributor.id);
            let balance = result[0].currentBalance;
            await db.contributors.updateBalance(c.contributor.id, (balance - c.amount));
        }
        res.json({ "msg": "success" })
    }
    catch (e) {
        console.log(e);
    }
});



export default router;