import { EventListener } from './event-listener';

export class LocalLink extends EventListener {

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
