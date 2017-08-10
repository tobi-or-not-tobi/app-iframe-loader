
export abstract class EventListener {

    frames: any[] = [];

    constructor() {}

    abstract processMessage(event: MessageEvent): void;

    registerFrame(frame: HTMLIFrameElement, options?: any) {
        if (this.frames.indexOf(frame) === -1) {
            this.frames.push({
                frame: frame,
                options: options
            });
        }
    }

    protected replyResponse(frame: HTMLIFrameElement, data: any) {
        frame.contentWindow.postMessage(data, '*');
    }

    protected getFrame(url: string): any {
        const frames = this.frames.filter(frame => {
            return frame.frame.src && frame.frame.src.indexOf(url) > -1;
        });
        return frames.length > 0 ? frames[0] : this.frames[0];
    }
}
