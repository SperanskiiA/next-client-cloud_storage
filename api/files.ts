import axios from '@/core/axios';

import { FileItem } from './dto/files.dto';

type FileType = 'all' | 'photo' | 'trash';

export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
  return (await axios.get('/files?type=' + type)).data;
};

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('/files?ids=' + ids);
};

export const uploadFile = async (options: any) => {
  const { onSuccess, onError, onProgress, file } = options;

  const formData = new FormData();

  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post('files', formData, config);

    onSuccess();

    return data;
  } catch (error) {
    console.warn(error);
    onError({ error });
  }
};
