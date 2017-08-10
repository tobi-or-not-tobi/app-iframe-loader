import { FrameWrapper } from './frame';
import { EventManager } from './events/events';

const eventManager = new EventManager();
let frame: FrameWrapper;

function launch(options: any = {}) {
    frame = new FrameWrapper(options);
    eventManager.registerFrame(frame.iframe, options);
    frame.launch();
}

export { launch};
