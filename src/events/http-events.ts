import { EventListener } from './event-listener';

export class HttpEvents extends EventListener {

    constructor() {
        super();
    }

    processMessage(event: MessageEvent) {
        if (!event.data || event.data.type !== 'http') {
            return;
        }
        const frame = this.getFrame(event.origin);
        if (frame) {
            this.load(event.data, frame.frame);
        }
    }

    private load(data: any, frame: HTMLIFrameElement) {

        if (!data.url) {
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open(data.method, data.url);

        this.setHeaders(xhr, data.headers);

        xhr.onload = function() {
            this.replyResponse(frame, {
                key: data.key,
                response: JSON.parse(xhr.responseText)
            });
        }.bind(this);

        xhr.onerror = function(err) {
            console.log('error', err);
        };

        if (data.body) {
            xhr.send(JSON.stringify(data.body));
        }else {
            xhr.send();
        }
    }

    private setHeaders(xhr: XMLHttpRequest, headers: any) {
        xhr.setRequestHeader('content-type', 'application/json');
        if (!headers) {
            return;
        }
        Object.keys(headers).forEach(function(key) {
            xhr.setRequestHeader(key, headers[key]);
        });
    }

}