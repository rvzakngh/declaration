export class AuthnService {
    private session: string = "";
    private validSession: boolean = false;

    login(adminId: string, password: string): Promise<boolean> {
        console.log("Login attempt: "+adminId);
        const promise = new Promise<boolean>(
            (resolve, reject) => {
                this.validSession = true;
                resolve(true);
            }
        );
        return promise;
    }
    getSession(): string {
        return this.session;
    }
    hasValidSession(): Promise<boolean> {
        const promise = new Promise<boolean>(
            (resolve, reject) => {
                resolve(this.validSession);
            }

        );
        return promise;
    }
    logout(): Promise<void> {
        console.log("Logout");
        const promise = new Promise<void>(
            (resolve, reject) => {
                this.validSession = false;
                resolve();
            }
        )
        return promise;
    }
}