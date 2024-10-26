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

        return user.password === password;
    }
}