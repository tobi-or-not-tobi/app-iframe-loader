import { HttpEvents } from './http-events';

export class EventManager {
    httpEvents: HttpEvents;
    frames: HTMLIFrameElement[] = [];

    constructor() {
        this.httpEvents = new HttpEvents();
        this.setupListener();
    }

    /**
     * @description
     * Frame can be registered so that we can respond any events to the correct frame
     * 
     * @param  {HTMLIFrameElement} frame
     */
    registerFrame(frame: HTMLIFrameElement) {
        this.frames.push(frame);
    }

    private setupListener() {
        window.addEventListener('message', this.processMessageEvent.bind(this))
    }

    private processMessageEvent(event: MessageEvent) {
        if (event.data && event.data.type === 'http') {
            const frame = this.getFrame(event.origin);
            this.httpEvents.load(event.data, frame);
        }
    }

    private getFrame(url: string): HTMLIFrameElement {
        const frames = this.frames.filter(frame => {
            return frame.src.indexOf(url) > -1;
        });
        return frames.length > 0 ? frames[0] : null;
    }

}
