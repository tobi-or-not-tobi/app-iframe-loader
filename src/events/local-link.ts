import { EventListener } from './event-listener';

/**
 * Provides a listener that can open links from any of the parents.
 * This is required for other frames that run in a different domain
 * and have a different base URL.
 */
export class LinkEventListener extends EventListener {

    constructor() {
        super();
    }

    processMessage(event: MessageEvent) {
        if (!event.data || event.data.type !== 'link') {
            return;
        }
        window.open(event.data.url, event.data.window);
    }

}
