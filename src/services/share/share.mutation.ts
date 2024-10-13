import {QUERY_KEY} from '@/constants';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {shareService} from './share.service';

export const useCreateShareLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await shareService.createShareLink();
      if (res.data.success) {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEY.SHARE.GET_USER_SHARES],
        });
      }
      return res.data;
    },
  });
};

export const useCancelShareMutation = () => {
  return useMutation({
    mutationFn: async (link: string) => {
      const res = await shareService.cancelShare(link);
      return res.data;
    },
  });
};
