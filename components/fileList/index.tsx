import { FileItem } from '@/api/dto/files.dto';
import styles from './FileList.module.scss';
import React from 'react';
import { FileCard } from '../fileCard';
import Selecto from 'react-selecto';
// import { DashboardChildrenContainer } from '@/layouts/DashboardLayout';

type Props = {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
};

export type FileSelectType = 'select' | 'unselect';

export const FileList: React.FC<Props> = ({ items, onFileSelect }) => {
  return (
    <div className={styles.root}>
      {items.length > 0 &&
        items.map(({ fileName, id, originalName }) => (
          <div data-id={id} key={id} className="file">
            <FileCard filename={fileName} originalName={originalName} />
          </div>
        ))}
      <Selecto
        // container=".files"
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add('active');
            onFileSelect(Number(el.dataset['id']), 'select');
          });
          e.removed.forEach((el) => {
            el.classList.remove('active');
            onFileSelect(Number(el.dataset['id']), 'unselect');
          });
        }}
      />
    </div>
  );
};
