import { AsyncStorage } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { CALENDAR_STORAGE_KEY } from '../utils/_calendar.js';

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: entry
    })
  );
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}
