import { EventListener } from './event-listener';

/**
 * Provides an event listener that is capable to follow up on any DOM changes
 * that must be applied in the hosting page.
 */
export class DomEvents extends EventListener {

    constructor() {
        super();
    }

    processMessage(event: MessageEvent) {
        if (!event.data || event.data.type !== 'dom') {
            return;
        }
        const element = this.getElement(event);
        if (!element || !event.data.action) {
            return;
        }
        switch (event.data.action) {
            case 'loadCSS':
                this.loadCSS(event.data.file);
                break;
            case 'toggleClass':
                this.toggleCss(event.data, element);
                break;
            case 'removeClass':
                this.toggleCss(event.data, element, true);
                break;
        }
    }

    private toggleCss(data: any, frame: HTMLElement, remove = false) {
        if (data.class) {
            if (frame.classList.contains(data.class) || remove) {
                frame.classList.remove(data.class);
            }else {
                frame.classList.add(data.class);
            }
        }
    }

    private loadCSS(url: string) {
        if (!url) {
            return;
        }
        const link = document.createElement('link');
        link.href = url;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.media = 'screen,print';
        document.head.appendChild(link);
    }


    /**
     * @returns element by ID or frame
     */
    private getElement(event: MessageEvent) {
        let element;
        if (event.data.elementId) {
            element = document.getElementById(event.data.elementId);
        }else {
            const frame = this.getFrame(event.origin);
            element =  frame ? frame.frame : null;
        }
        return element;
    }


}
