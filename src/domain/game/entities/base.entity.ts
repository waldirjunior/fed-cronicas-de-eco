
export class BaseEntity {

    private isAlive: boolean = true;

    kill() {
        this.isAlive = false;
    }

    isCheckAlive() {
        return this.isAlive;
    }

}