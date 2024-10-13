import AsyncStorage from '@react-native-async-storage/async-storage';
import {StateStorage} from 'zustand/middleware';

export const STORAGE = {
  set: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  },
  get: async <T extends string>(key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (e) {
      console.log(e);
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  },
};

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    return await STORAGE.set(name, value);
  },
  getItem: async name => {
    let value = await STORAGE.get(name);
    return value ?? null;
  },
  removeItem: async name => {
    return await STORAGE.remove(name);
  },
};
