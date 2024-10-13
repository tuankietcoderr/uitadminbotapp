import {API} from '@/constants';
import {BaseResponse} from '@/types';
import instance from '../instance';
import {UploadResponseDto} from './upload.dto';

export const uploadService = {
  upload: async (form: FormData, setUploadProgress?: (p: number) => void) => {
    return await instance.post<BaseResponse<UploadResponseDto>>(
      API.UPLOADER.UPLOAD,
      form,
      {
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total || 1)) * 100,
          );
          setUploadProgress?.(progress);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
  delete: async (fileId: string) => {
    return await instance.delete<BaseResponse<UploadResponseDto>>(
      API.UPLOADER.DELETE(fileId),
    );
  },
};
