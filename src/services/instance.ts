import {APP_CONFIG, STORAGE} from '@/utils';
import axios from 'axios';
import {authService} from './auth';

const prefixUrl = `https://uitadminbot-be.up.railway.app`;
const version = 'v1';

const instance = axios.create({
  baseURL: `${prefixUrl}/api/${version}`,
  timeout: 60000, // 60 seconds
  headers: {
    'Content-Type': 'application/json',
    'X-Locale': Intl.DateTimeFormat().resolvedOptions().locale,
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
});

instance.interceptors.request.use(async config => {
  // Add token to request header
  const accessToken = await STORAGE.get(APP_CONFIG.STORAGE_KEY.ACCESS_TOKEN);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  async response => {
    if (response.data?.data?.accessToken) {
      await STORAGE.set(
        APP_CONFIG.STORAGE_KEY.ACCESS_TOKEN,
        response.data.data.accessToken,
      );
    }
    if (response.data?.data?.refreshToken) {
      await STORAGE.set(
        APP_CONFIG.STORAGE_KEY.REFRESH_TOKEN,
        response.data.data.refreshToken,
      );
    }
    return response;
  },
  async error => {
    const config = error?.config;
    if (
      error.response?.status === 401 &&
      !config?.sent &&
      error.response?.data?.message === 'Access token expired'
    ) {
      config.sent = true;
      const refreshToken = await STORAGE.get(
        APP_CONFIG.STORAGE_KEY.REFRESH_TOKEN,
      );
      if (!refreshToken) {
        return Promise.reject(error);
      }
      return authService
        .refreshToken(refreshToken)
        .then(res => res.data)
        .then(async res => {
          if (res.success) {
            await Promise.all([
              STORAGE.set(
                APP_CONFIG.STORAGE_KEY.ACCESS_TOKEN,
                res.data.accessToken,
              ),
              STORAGE.set(
                APP_CONFIG.STORAGE_KEY.REFRESH_TOKEN,
                res.data.refreshToken,
              ),
            ]);
            return instance(config);
          }
          return Promise.reject(error);
        })
        .catch(async (err: any) => {
          if (
            err.response.status === 401 &&
            err.response?.data?.message === 'Refresh token expired'
          ) {
            await Promise.all([
              STORAGE.remove(APP_CONFIG.STORAGE_KEY.ACCESS_TOKEN),
              STORAGE.remove(APP_CONFIG.STORAGE_KEY.REFRESH_TOKEN),
            ]);
          }
        });
    }
    return Promise.reject(error);
  },
);

export default instance;
