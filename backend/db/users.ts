import knex from './knex';
import { User } from '../../frontend/src/Simcha';

function getUser(username: string) {
    return knex('users').where("username", "=", username)
        .then((r) => {
            r = r[0];
            let user: User;
            if (r) {
                user = {
                    id: r.id,
                    password: r.password,
                    username: r.username,
                    firstName: r.firstName,
                    lastName: r.lastName,
                    email: r.email
                };
            }
            return user ? user : undefined;
        });
}


function getUserById(id: number) {
    return knex('users').where("id", "=", id)
        .then((r) => {
            r = r[0];
            let user: User;
            if (r) {
                user = {
                    id: r.id,
                    password: r.password,
                    username: r.username,
                    firstName: r.firstName,
                    lastName: r.lastName,
                    email: r.email
                };
            }
            return user ? user : undefined;
        });
}


function createUser(user: User) {
    return knex('users').insert(
        { username: user.username, 
            password: user.password, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email 
        })
    .then((result) => {
        return result[0];
    });
}

function editUser(userId:number, user:User){
    return knex('users').where('id', '=', userId).update({firstName:user.firstName, lastName:user.lastName, email:user.email, username:user.username});
}

function updatePassword(userId:number, password:string){
    return knex('users').where('id', '=', userId).update({password:password});
}

function addTicket(ticket:string|null, userId:number){
    return knex('users').where('id', '=', userId).update({ticket: ticket});
}

function checkTicket(ticket:string){
    return knex('users').where('ticket', '=', ticket).then((r) => {
        addTicket(null, r.id);
        return r[0];
    })
}

export {
    getUser,
    createUser,
    getUserById,
    editUser,
    updatePassword,
    addTicket,
    checkTicket
}