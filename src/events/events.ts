import { EventListener } from './event-listener';
import { HttpEvents } from './http-events';
import { LocalLink } from './local-link';
import { ScrollEvents } from './scroll-events';

export class EventManager {
    eventListeners: Array<EventListener> = [];

    constructor() {
        this.eventListeners.push(new HttpEvents());
        this.eventListeners.push(new ScrollEvents());
        this.eventListeners.push(new LocalLink());

        this.setupListener();
    }

    /**
     * @description
     * Frame can be registered so that we can respond any events to the correct frame
     * 
     * @param  {HTMLIFrameElement} frame
     */
    registerFrame(frame: HTMLIFrameElement) {
        for (const listener of this.eventListeners) {
            listener.registerFrame(frame);
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
