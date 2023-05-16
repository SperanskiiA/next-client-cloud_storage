import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, notification } from 'antd';
import React from 'react';
import styles from '@/styles/Home.module.scss';
import * as Api from '@/api';

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);
    } catch (error) {
      console.warn(error);
      notification.error({
        message: 'OOPS...',
        description: 'Somthing went wrong...',
        duration: 2,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Upload an image
      </Button>
    </Upload>
  );
};
