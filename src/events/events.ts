import { MouseEventListener } from './mouse-events';
import { DomEventListener } from './dom-events';
import { EventListener } from './event-listener';
import { HttpEventListener } from './http-events';
import { LinkEventListener } from './local-link';
import { FrameEvents } from './frame-events';

export class EventManager {
    eventListeners: Array<EventListener> = [];

    constructor() {
        this.eventListeners.push(new HttpEventListener());
        this.eventListeners.push(new LinkEventListener());
        this.eventListeners.push(new FrameEvents());
        this.eventListeners.push(new DomEventListener());
        this.eventListeners.push(new MouseEventListener());

        this.setupListener();
    }

    /**
     * @description
     * Frame can be registered so that we can respond any events to the correct frame
     * 
     * @param  {HTMLIFrameElement} frame
     */
    registerFrame(frame: HTMLIFrameElement, options: any) {
        for (const listener of this.eventListeners) {
            listener.registerFrame(frame, options);
        }
    }

    private setupListener() {
        window.addEventListener('message', this.processMessageEvent.bind(this));
    }

    private processMessageEvent(event: MessageEvent) {
        for (const listener of this.eventListeners) {
            listener.processMessage(event);
        }
    }

}
