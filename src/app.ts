import { FrameWrapper } from './frame';
import { EventManager } from './events/events';

const eventManager = new EventManager();

function launch(url: string, options: any = {}) {
    const frame = new FrameWrapper(url, options);
    eventManager.registerFrame(frame.iframe);
    frame.launch();
}

export { launch };
