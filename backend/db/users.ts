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
        return result.id;
    });
}

export {
    getUser,
    createUser,
    getUserById
}