import * as express from 'express';
const router = express.Router();
import db from '../db';
import * as _ from 'lodash';
var config = require('../config');
import * as jwt from 'jsonwebtoken';
import { User } from '../../frontend/src/Simcha';

function createToken(user: User) {
    return jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });
}

router.post('/createUser', async (req, res) => {
    try {
        let user: User = req.body.user;
        if (!user.username || !user.password) {
            return res.status(400).send("You must send the username and password");
        }
        let userdb = await db.users.getUser(user.username);
        if (!userdb) {
            userdb = {
                username: user.username,
                password: user.password,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            await db.users.createUser(userdb);
            return res.status(201).send({ id_token: createToken(userdb) });
        }
        else {
            return res.status(400).send("A user with that username already exists");
        }
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.username);
        if (!req.body.username || !req.body.password) {
            return res.status(400).send("You must send the username and password");
        }
        let userdb:User = await db.users.getUser(req.body.username);
        console.log('password' + userdb.password);
        if (!userdb.id) {
            return res.status(401).send("The username does not exist");
        }
        
        else if (userdb.password !== req.body.password) {
            return res.status(401).send("The username or password don't match");
        }
        res.status(201).send({
            id_token: createToken(userdb)
        });
    }
    catch (e) {
        console.log(e);
    }
});

router.post('/check', async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send("You must send a username");
    }
    let userdb = await db.users.getUser(req.body.username);
    if (!userdb) {
        res.status(200).send("ok");
    }
    else {
        res.status(200).send("error");
    }
});

export default router;