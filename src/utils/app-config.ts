import {Dimensions} from 'react-native';
import * as app from '../../app.json';

export const APP_NAME = app.displayName;

export const APP_CONFIG = {
  STORAGE_KEY: {
    ACCESS_TOKEN: `${APP_NAME}_ACCESS_TOKEN`,
    REFRESH_TOKEN: `${APP_NAME}_REFRESH_TOKEN`,
    BOOKMARKS: `${APP_NAME}_BOOKMARKS`,
  },
  SCREEN: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
};
