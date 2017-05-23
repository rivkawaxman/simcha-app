import * as express from 'express';
const router = express.Router();
import db from '../db';
import * as _ from 'lodash';
var config = require('../config');
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../../frontend/src/Simcha';
import * as nodemailer from 'nodemailer';


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
            console.log("userid", userId);
            return res.status(200).send({ id_token: createToken(userId) });
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

router.post('/changePassword', async (req, res) => {
    if (req.user) {
        await db.users.updatePassword(req.user, saltHashPassword(req.body.password));
        res.json({ msg: "success" });
    }
    else{
       res.json({ error: "error" }); 
    }
});

router.post('/changePasswordTicket', async (req, res) => {
   
     if(req.body.ticket){
        let user = await db.users.checkTicket(req.body.ticket);
        console.log('user', user);
        await db.users.updatePassword(user.id, saltHashPassword(req.body.password))
        res.status(200).send({
            id_token: createToken(user.id)
        });
    }
    else{
       res.json({ error: "error" }); 
    }
});

router.post('/forgotPassword', async (req, res) => {
    let username: string = req.body.username;
    let user: User = await db.users.getUser(username);
    if (user) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'simchafundapp@gmail.com',
                pass: 'bitbean123'
            }
        })
        let ticket = genRandomString(25);
        try {
            await db.users.addTicket(ticket, user.id);
            let url = `${req.protocol}://${req.hostname}:3000/changePassword/${ticket}`
            console.log("url", url);
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Simcha Fund" <simchafuncapp@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Your Change Password Request', // Subject line           
                html: `<p>Click <a href="${url}">here</a> to change your password.</p>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.json({ msg: "success" });
            });
        }
        catch (e) {
            console.log(e);
        }

    }
    else {
        console.log("Username does not exist");
        res.json({ error: "Username does not exist" });
    }
});

var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

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