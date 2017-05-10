import * as express from 'express';
const router = express.Router();
import db from '../db';


router.get('/', async (req, res) => {
    try {
        let contributors = await db.contributors.getAll();
        let total = await db.contributors.total();
    res.json({contributors: contributors, total: total});
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/add', async (req, res) => {
    try {
        let id = await db.contributors.add(req.body.contributor);
        res.json("contributor id = " + id);
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/delete', async (req, res) => {
    try {
        let dunno = await db.contributors.remove(req.body.id);
    }
    catch (e) {
        console.log(e);
    }
    res.json({ msg: "success" });
});


router.post('/edit', async (req, res) => {
    try {
        let dunno = await db.contributors.edit(req.body.contributor);
    }
    catch (e) {
        console.log(e);
    }
    res.json({ msg: "success" });
});

router.post('/deposit', async (req, res) => {
    let newBalance = 0;
    try {
        await db.contributors.deposit(req.body.deposit);
        let result = await db.contributors.getCurrentBAlance(req.body.deposit.contributor_id);
        let balance = result[0].currentBalance;
        newBalance = parseInt(balance) + parseInt(req.body.deposit.amount);
        await db.contributors.updateBalance(req.body.deposit.contributor_id, (newBalance));
    }
    catch (e) {
        console.log(e);
    }
    res.json({ balance: newBalance });
});

router.post('/history', async (req, res) => {
    try {
        let history = await db.contributors.history(req.body.id);
        res.json(history);
    }
    catch (e) {
        console.log(e);
    }

});


export default router;