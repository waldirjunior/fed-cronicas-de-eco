import { UserGateway, UserGatewayImpl } from "./gateway/user.gateway";

export const infra = {
    UserGateway: new UserGatewayImpl(),
} as {
    UserGateway: UserGateway
};