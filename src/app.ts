import { FrameWrapper } from './frame';
import { EventManager } from './events/events';

const eventManager = new EventManager();
let frame: FrameWrapper;

function launch(options: any = {}) {
    frame = new FrameWrapper(options);
    eventManager.registerFrame(frame.iframe);
    frame.launch();
}

function togglePanel(cls: string) {
    frame.togglePanel(cls);
}

export { launch, togglePanel};
