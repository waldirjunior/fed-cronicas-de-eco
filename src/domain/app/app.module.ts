import { GetUserUsecase } from "./user/get-user.usecase";
import { SaveUserUsecase } from "./user/save-user.usecase";

export const app = {
    GetUserUsecase: new GetUserUsecase(),
    SaveUserUsecase: new SaveUserUsecase(),
} as {
    GetUserUsecase: GetUserUsecase;
    SaveUserUsecase: SaveUserUsecase;
}