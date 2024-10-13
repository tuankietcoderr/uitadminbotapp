import {API} from '@/constants';
import {IDataFilter} from '@/interfaces';
import {BaseResponse} from '@/types';
import {Share} from '@/types/schema';
import instance from '../instance';

export const shareService = {
  createShareLink: async () => {
    return instance.post<BaseResponse<string>>(API.SHARE.CREATE);
  },
  getSharedRoom: async (link: string) => {
    return instance.get<BaseResponse<Share>>(API.SHARE.GET_SHARED_ROOM(link));
  },
  cancelShare: async (link: string) => {
    return instance.delete<BaseResponse<void>>(API.SHARE.CANCEL_SHARE(link));
  },
  getUserShares: async ({keyword = '', page = 1, limit = 10}: IDataFilter) => {
    return instance.get<BaseResponse<Share[]>>(API.SHARE.GET_USER_SHARES, {
      params: {
        keyword,
        page,
        limit,
      },
    });
  },
};
