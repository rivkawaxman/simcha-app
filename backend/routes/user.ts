import * as express from 'express';
const router = express.Router();
import db from '../db';
import _ from 'lodash';
var config = require('../config');
import jwt from 'jsonwebtoken';
import { User } from '../../frontend/src/Simcha';

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60 * 60 * 5 });
}

router.post('/createUser', async (req, res) => {
    let user: User = req.body.User;
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and password");
    }
    let userdb = await db.users.getUser(req.body.username);
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
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and password");
    }
    let userdb = await db.users.getUser(req.body.username);
    if(!userdb){
        return res.status(401).send("The username does not existing");
    }
    else if(userdb.password !== req.body.password){
        return res.status(401).send("The username or password don't match");
    }
    res.status(201).send({
      id_token: createToken(userdb)
    });
});

router.get('./check/:username', async(req,res)=> {
    if(!req.params.username){
        return res.status(400).send("You must send a username");
    }
    let userdb = await db.users.getUser(req.params.username);
    if(!userdb){
        res.status(201).send({username: "OK"});
    }
    else{
        res.status(400).send("A user with that username already exists");
    }
});

export default router;