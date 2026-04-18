import jwt from 'jsonwebtoken';
import { envs } from './envs.js';
import type { StringValue } from "ms"

export class JwtAdapter {
    static async generateToken(payload: any, duration: StringValue | number = "3h") {
        return new Promise((resolve) => {
            jwt.sign(payload,envs.JWT_KEY,{ expiresIn: duration }, (err,token) => {
                if(err) return resolve(null);
                resolve(token)
            })
        })
    }

    static async validateToken(token: string): Promise< object | null > {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_KEY, (err: any, decoded: any) => {
                if(err) return resolve(null);
                resolve(decoded);
            })
        })
    }
}