import { EventListener } from './event-listener';

export class ScrollEvents extends EventListener {
    
    isInitialized = false;
    iFrames: Array<any> = [];

    processMessage(event: MessageEvent) {

        // only process scroll events
        if (!event.data || event.data.type.indexOf('scroll') === -1) {
            return;
        }

        // avoid duplicates
        if (this.iFrames.filter(frame => frame.origin === event.origin).length > 0) {
            return;
        }

        this.listenToScroll();

        const eventType = event.data.type.substr(7);

        this.iFrames.push({
            origin: event.origin,
            eventType: eventType
        });
    }
    
    private listenToScroll() {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;
        window.addEventListener('scroll', this.debounce(function(event: ScrollEvents) {
            for (const frame of this.iFrames) {
                this.replyResponse(this.getFrame(frame.origin), {
                    type: 'scroll:' + frame.eventType,
                    value: this.getEventProperty(frame.eventType)
                });
            }
        }.bind(this), 250));
    }

    getEventProperty(type: string) {
        return window.scrollY;
    }


    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    private debounce(func: any, wait: any, immediate?: any) {
        let timeout: any;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };

}