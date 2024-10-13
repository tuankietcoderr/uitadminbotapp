import {QUERY_KEY} from '@/constants';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {shareService} from './share.service';

export const useGetSharedRoomQuery = (link: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SHARE.GET_SHARED_ROOM, link],
    queryFn: async () => {
      const res = await shareService.getSharedRoom(link);
      return res.data;
    },
  });
};

export const useGetUserSharesQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.SHARE.GET_USER_SHARES],
    initialPageParam: 1,
    queryFn: async ({pageParam}) => {
      const res = await shareService.getUserShares({
        page: pageParam,
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined;
    },
  });
};
