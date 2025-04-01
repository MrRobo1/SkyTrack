export interface AuthTokenPayload {
    id: number;
    email:string;
}

export interface MyContext {
    user: AuthTokenPayload | null;
}