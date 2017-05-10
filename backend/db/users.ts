import knex from './knex';
import { User } from '../../frontend/src/Simcha';

function getUser(username:string): User{
    return knex('users').where('username', '=', username).then((r) => {
        return  {
            id: r.id,
            username: r.username,
            firstName: r.firstName,
            lastName: r.lastName,
            email: r.email
        }
    });
}

function createUser(user: User){
    return knex('users').insert({username:user.username,password:user.password, firstName:user.firstName, lastName:user.lastName, email:user.email});
}

export {
    getUser,
    createUser
}