import { infra } from "../../../infra/infra.module";
import { User } from "./user.entity";

export class SaveUserUsecase {
    private readonly userRepository = infra.UserGateway;
    
    async execute({
        nameCharacter,
        password,
        username
    }: {
        nameCharacter: string;
        password: string;
        username: string;
    }): Promise<User>
    {
        const user = new User();
        user.nameCharacter = nameCharacter;
        user.password = password;
        user.username = username;

        return this.userRepository.create(user);
    }
}