import * as express from 'express';
const router = express.Router();
import db from '../db';
import * as _ from 'lodash';
var config = require('../config');
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../../frontend/src/Simcha';

function createToken(userid: number) {
    return jwt.sign({ userId: userid }, process.env.SECRET_KEY, { expiresIn: '1d' });
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
                password: saltHashPassword(user.password),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            let userId = await db.users.createUser(userdb);
            return res.status(200).send({ id_token: createToken(userdb) });
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
        if (!req.body.username || !req.body.password) {
            return res.status(200).send({ error: "You must send the username and password" });
        }
        let userdb: User = await db.users.getUser(req.body.username);
        if (!userdb) {
            return res.status(200).send({ error: "The username does not exist" });
        }

        else if (userdb.password !== saltHashPassword(req.body.password)) {
            return res.status(200).send({ error: "The username or password don't match" });
        }
        res.status(200).send({
            id_token: createToken(userdb.id)
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

router.get('/userName', async (req, res) => {

    let user: User = await db.users.getUserById(req.user);
    res.json({ username: user.username });

});

router.get('/userInfo', async (req, res) => {

    let user: User = await db.users.getUserById(req.user);
    user.password = '';
    res.json({ user: user });

});

router.post('/editUser', async (req, res) => {

    await db.users.editUser(req.user, req.body.user);
    res.json({ msg: "success" });
});

router.post('/editUsername', async (req, res) => {
    await db.users.editUser(req.user, req.body.username);
    res.json({ msg: "success" });
});

router.post('/changePassword', async (req, res) => {
    await db.users.editUser(req.user, req.body.password);
    res.json({ msg: "success" });
});

function saltHashPassword(userpassword) {
    var salt = process.env.SALT;
    var passwordData = sha512(userpassword, salt);
    return passwordData.passwordHash + passwordData.salt;
}

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

export default router;