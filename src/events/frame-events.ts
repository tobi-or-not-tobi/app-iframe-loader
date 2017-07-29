import { EventListener } from './event-listener';

/**
 * Provides an event listener that is capable to follow up on any changes
 * that must be applied in the hosting page. A good example is the iframe 
 * style class, in case the iframe should be styled (initially or on 
 * behalve of the user - i.e. toggle)
 */
export class FrameEvents extends EventListener {

    constructor() {
        super();
    }

    processMessage(event: MessageEvent) {
        if (!event.data || event.data.type !== 'frame') {
            return;
        }
        const frame = this.getFrame(event.origin);
        if (frame) {
            this.toggle(event.data, frame);
        }
    }

    private toggle(data: any, frame: HTMLIFrameElement) {
        if (data.class) {
            if (frame.classList.contains(data.class)) {
                frame.classList.remove(data.class);
            }else {
                frame.classList.add(data.class);
            }
        }
    }
}