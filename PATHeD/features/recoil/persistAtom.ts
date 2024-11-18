import {AtomEffect} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

export function persistAtom<T>(key: string): AtomEffect<T> {
  return ({setSelf, onSet, trigger}) => {
    const loadPersisted = async () => {
      const savedValue = await EncryptedStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    };
    // Asynchronously set the persisted data
    if (trigger === 'get') {
      loadPersisted();
    }
    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      isReset
        ? EncryptedStorage.removeItem(key)
        : EncryptedStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
