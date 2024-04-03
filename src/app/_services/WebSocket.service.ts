import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$: WebSocketSubject<any>;

    constructor() {
        this.socket$ = webSocket('ws://localhost:8082/ws');
    }
    connect(): WebSocketSubject<any> {
        return this.socket$;
      }
    // Method to send messages over WebSocket
    sendMessage(message: any) {
        this.socket$.next(message);
    }

    // Method to listen for incoming messages
    getMessage() {
        return this.socket$.asObservable();
    }
}
