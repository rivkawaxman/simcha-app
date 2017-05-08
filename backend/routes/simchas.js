import * as express from 'express';
const router = express.Router();
import db from '../db';


router.get('/', async (req, res) => {
    try {
        let simchas = await db.simchas.getAll();
        res.json(simchas);
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/add', async (req, res) => {
    try {
        let simchaId = await db.simchas.add(req.body.name, req.body.date);
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
        let contributions = await db.simchas.getContributions(req.body.id);
        res.json(contributions);
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/addContributions', async (req, res) => {
    try {
        let dunno = await db.simchas.addContributions(req.body.contributions);
        for (let c of req.body.contributions) {
            let result = await db.contributors.getCurrentBAlance(c.contributor_id);
            let balance = result[0].currentBalance;
            await db.contributors.updateBalance(c.contributor_id, (balance - c.amount));
        }
        res.json({ "msg": "success" })
    }
    catch (e) {
        console.log(e);
    }
});



export default router;