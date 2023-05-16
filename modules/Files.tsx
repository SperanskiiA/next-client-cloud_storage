import { FileItem } from '@/api/dto/files.dto';
import { FileActions } from '@/components/fileActions';
import { FileList, FileSelectType } from '@/components/fileList';
import * as Api from '@/api';
import { Empty } from 'antd';
import React from 'react';

type FilesProps = {
  items: FileItem[];
  withActions?: boolean;
};

const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === 'select') {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
    console.log(selectedIds);
  };

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };
  const onClickShare = () => {
    alert('share');
  };
  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="File list is empty!" />
      )}
    </div>
  );
};

export default Files;
