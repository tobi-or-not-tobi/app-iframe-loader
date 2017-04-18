
export class HttpEvents {
    frame: HTMLIFrameElement;
    key: null;

    constructor() {}

    load(data: any, frame: HTMLIFrameElement) {
        if (!data.url) {
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open(data.method, data.url);
        this.setHeaders(xhr, data.headers);
        xhr.onload = function() {
            this.replyResponse(frame, data.key, JSON.parse(xhr.responseText));
        }.bind(this);
        xhr.send();
    }

    private setHeaders(xhr: XMLHttpRequest, headers: any) {
        if (!headers) {
            return;
        }
        Object.keys(headers).forEach(function(key) {
            xhr.setRequestHeader(headers[key].label, headers[key].value)
        });
    }

    private replyResponse(frame: HTMLIFrameElement, key: any, data: any) {
        frame.contentWindow.postMessage({
            key: key,
            response: data
        }, '*');
    }

}