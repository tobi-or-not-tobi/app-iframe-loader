
export abstract class EventListener {

    iFrames: HTMLIFrameElement[] = [];

    constructor() {}

    abstract processMessage(event: MessageEvent): void;

    registerFrame(frame: HTMLIFrameElement) {
        this.iFrames.push(frame);
    }

    protected replyResponse(frame: HTMLIFrameElement, data: any) {
        frame.contentWindow.postMessage(data, '*');
    }

    protected getFrame(url: string): HTMLIFrameElement {
        const frames = this.iFrames.filter(frame => {
            return frame.src && frame.src.indexOf(url) > -1;
        });
        return frames.length > 0 ? frames[0] : null;
    }
}
