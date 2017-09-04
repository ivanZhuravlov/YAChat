import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

declare let window: any;

export class Chat {

    chatSocket: any;
    
    chatSocketConnectionState = new BehaviorSubject<string>('disconnected');

    receiveMessageStream: Observable<any>;
    receiveMessageSubscription: Subscription;
    messages: any[] = [];
    currentUserId: string = 'Client without UserID';

    constructor(chatSocket: any) {
        this.chatSocket = chatSocket;
        this.activate();
    }

    public activate(): void {
        // this.chatSocket.on('connect', () => this.socketConnected$.next(true));
        // this.chatSocket.on('disconnect', () => this.socketConnected$.next(false));

        let that = this;
        this.chatSocket.on('connect', () => {
            that.messages.push({ msg: 'You are connected to the chat!', userid: 'Server' });
            that.chatSocketConnectionState.next('connected');
        });

        this.chatSocket.on('disconnect', () => {
            that.messages.push({ msg: 'Server disconnected. Trying to reconnect...', userid: 'Server' });
            that.chatSocketConnectionState.next('disconnected');
        });

        this.chatSocket.on('reconnect', () => {
            that.messages.push({ msg: 'You are reconnected to the chat', userid: 'Server' });
            that.chatSocketConnectionState.next('reconnected');
        });

        this.chatSocket.on('client:getuserid', (data: any) => {
            that.currentUserId = data.socketid;
            that.messages.push({ msg: `You've got the client id ${that.currentUserId}!`, userid: 'Server' });
        });

        this.receiveMessageStream = this.listen('server:receivemsg');

        this.receiveMessageSubscription = this.receiveMessageStream.subscribe(
            (data) => this.messages.push({ 
                    msg: data.msg, 
                    userid: data.userid 
                }));
    }

    send(msg: string) {
        if (msg.length) {
            this.chatSocket.emit('client:sendmsg', msg);
            this.messages.push({ msg: msg, userid: this.currentUserId });
        }
    }

    listen(event: string): Observable<any> {
        return new Observable(observer => {
            this.chatSocket.on(event, (data: any) => {
                observer.next(data);
            });

            // observable is disposed
            return () => {
                this.chatSocket.off(event);
            }
        });
    }
}