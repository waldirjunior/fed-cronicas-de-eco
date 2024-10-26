
// add methods to the UserGateway interface
// and implement them in the UserGateway class
// and create, getById, getByUsername, update, and delete methods
// save localStorage object to the database

import { User } from "../../domain/app/user/user.entity";

export interface UserGateway {
    create(user: User): Promise<User>;
    getById(id: number): Promise<User>;
    getByUsername(username: string): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<void>;
}

export class UserGatewayImpl implements UserGateway {

    constructor() {
        console.log('UserGatewayImpl');
    }

    async create(user: User): Promise<User> {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    }

    async getById(id: number): Promise<User> {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        return users.find(user => user.id === id) as User;
    }

    async getByUsername(username: string): Promise<User> {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        return users.find(user => user.username === username) as User;
    }

    async update(user: User): Promise<User> {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const index = users.findIndex(u => u.id === user.id);
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    }

    async delete(id: number): Promise<void> {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

