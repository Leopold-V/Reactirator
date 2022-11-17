import mixpanel from 'mixpanel-browser';
import { nanoid } from 'nanoid';
import electronStore from './electron-store.service';

type MixpanelEvent = 'app-launch' | 'new-project' | 'project-open';

const API_KEY = '4423465541cae31b055ca3980d5f8663';

mixpanel.init(API_KEY);

export const mixpanelTracker = (event: MixpanelEvent, data?: any) => {
  let userId = electronStore.get('uid');
  if (!userId) {
    userId = nanoid(12);
    electronStore.set('uid', userId);
  }
  mixpanel.identify(userId as string);
  data === null ? mixpanel.track(event) : mixpanel.track(event, { ...data });
};
