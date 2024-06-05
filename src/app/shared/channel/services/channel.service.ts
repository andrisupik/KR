import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from '../models';
import { Program } from '../../program/models';

@Injectable()
export class ChannelService {
    private basic = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }

    findAll(): Observable<Channel[]> {
        return this.http.get<Channel[]>(this.basic + 'channels');
    }

    findById(id: number): Observable<Channel> {
        return this.http.get<Channel>(this.basic + 'channels/' + id);
    }

    save(name: string): Observable<Channel> {
        return this.http.post<Channel>(this.basic + 'channels', name);
    }

    updateName(id: number, name: string): Observable<Channel> {
        return this.http.put<Channel>(this.basic + 'channels/' + id, { name });
    }

    updatePrograms(id: number, programs: Program[]) {
        return this.http.put(this.basic + 'channels/' + id + '/programs', programs);
    }

    deleteById(id: number): Observable<void> {
        return this.http.delete<void>(this.basic + 'channels/' + id);
    }
}
