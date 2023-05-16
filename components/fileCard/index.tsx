import React from 'react';
import styles from './FileCard.module.scss';
import {
  getColorByExtension,
  getExtensionFromFileName,
  isImage,
} from '@/utils';
import { FileTextOutlined } from '@ant-design/icons';

type Props = {
  filename: string;
  originalName: string;
};

export const FileCard: React.FC<Props> = ({ filename, originalName }) => {
  if (filename === undefined || originalName === undefined) return <p>empty</p>;

  const ext = getExtensionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? `http://localhost:4444/uploads/${filename}` : '';
  const color = getColorByExtension(ext);
  const classColor = styles[color];
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <img className={styles.image} src={imageUrl} alt={'file ' + ext} />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
