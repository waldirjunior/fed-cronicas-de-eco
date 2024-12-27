import { infra } from "../../../infra/infra.module";
import { User } from "./user.entity";

export class GetUserUsecase {
    private readonly userRepository = infra.UserGateway;

    async execute({
        username
    }: {
        username: string;
    }): Promise<User>
    {
        return this.userRepository.getByUsername(username);
    }

    async executeSession(): Promise<User>
    {
        const user = await this.userRepository.getSession();
        if (!user) {
            throw new Error("No user found in session");
        }
        return user;
    }

    async validatePassword({
        username,
        password
    }: {
        username: string;
        password: string;
    }): Promise<boolean>
    {
        if (!username || !password) {
            return false;
        }

        const user = await this.userRepository.getByUsername(username);

        return user?.password === password;
    }
}