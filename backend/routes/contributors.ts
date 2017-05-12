import * as express from 'express';
const router = express.Router();
import db from '../db';
import { Deposit, History, Contributor } from '../../frontend/src/Simcha';


router.get('/', async (req, res) => {
    try {
        let contributors:Contributor[] = await db.contributors.getAll(req.user);
        let total = await db.contributors.total(req.user);
    res.json({contributors: contributors, total: total});
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
});

router.post('/add', async (req, res) => {
    try {
        let id = await db.contributors.add(req.body.contributor, req.user);
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
    let newBalance:number;
    try {
        console.log(req.body);
        let deposit:Deposit = req.body.deposit;
        console.log('deposit:' + deposit);
        await db.contributors.deposit(deposit);
        let result = await db.contributors.getCurrentBAlance(deposit.contributor.id);
        let balance:number = Number(result[0].currentBalance);
        newBalance = (balance + Number(deposit.amount));
        await db.contributors.updateBalance(deposit.contributor.id, (newBalance));
    }
    catch (e) {
        console.log(e);
    }
    res.json({ balance: newBalance });
});

router.post('/history', async (req, res) => {
    try {
        let history:History[] = await db.contributors.history(req.body.id);
        res.json(history);
    }
    catch (e) {
        console.log(e);
    }

});


export default router;