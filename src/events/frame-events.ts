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
            if (event.data.action === 'bootstrap') {
                this.bootstrap(frame.frame, frame.options);
            }
            if (event.data.action === 'toggleClass') {
                this.toggle(event.data, frame);
            }
            if (event.data.action === 'removeClass') {
                this.toggle(event.data, frame.frame, true);
            }
        }
    }

    private bootstrap(frame: HTMLIFrameElement, options: any) {
        if (!options.bootstrap) {
            return;
        }
        this.replyResponse(frame, {
            type: 'bootstrap',
            params: options.bootstrap
        });
    }

    private toggle(data: any, frame: HTMLIFrameElement, remove = false) {
        if (data.class) {
            if (frame.classList.contains(data.class) || remove) {
                frame.classList.remove(data.class);
            }else {
                frame.classList.add(data.class);
            }
        }
    }
}