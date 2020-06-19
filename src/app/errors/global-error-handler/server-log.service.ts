import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLog } from './server-log';
import { environment } from 'src/environments/environment';

const URL = environment.logserver;

@Injectable({
    providedIn: 'root'
})
export class ServerLogService {
    constructor(private http: HttpClient) { }

    log(serverLog: ServerLog) {
        return this.http.post(`${URL}/infra/log`, serverLog);
    }
}