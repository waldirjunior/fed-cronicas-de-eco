
export class User {
    id: number = crypto.getRandomValues(new Uint32Array(1))[0];
    username: string;
    password: string;
    nameCharacter: string;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

