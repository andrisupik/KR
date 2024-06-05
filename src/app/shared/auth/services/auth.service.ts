import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { User, UserCredentials, UserRole } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    private basic = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }

    isTokenValid(token: string): boolean {
        try {
            const decodedToken: { sub: string, roles: UserRole[], exp: number } = jwt_decode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                return false;
            }

            this.user$.next({ username: decodedToken.sub, roles: decodedToken.roles });
            return true;
        } catch (error) {
            return false;
        }
    }

    signIn(username: string, password: string): Observable<UserCredentials> {
        return this.http.post<UserCredentials>(this.basic + 'auth/sign-in', { username, password });
    }

    signUp(username: string, password: string): Observable<UserCredentials> {
        return this.http.post<UserCredentials>(this.basic + 'auth/sign-up', { username, password });
    }
}
