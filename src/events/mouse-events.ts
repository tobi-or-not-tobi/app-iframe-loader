import { EventListener } from './event-listener';

/**
 * Provides an event listener that is capable to follow up on
 * any mouse events. 
 * Currently only support for click event.
 */
export class MouseEventListener extends EventListener {

    constructor() {
        super();
    }

    processMessage(event: MessageEvent) {
        if (!event.data || event.data.type !== 'event') {
            return;
        }

        // const frame = this.getFrame(event.origin);
        if (event.data.action === 'click') {
            document.body.click();
        }
    }

}