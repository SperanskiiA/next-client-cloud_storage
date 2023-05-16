import styles from './FileActions.module.scss';
import { Button, Popconfirm } from 'antd';

type FileActionsProps = {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
};

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Button onClick={onClickShare} disabled={!isActive}>
        Share
      </Button>
      <Popconfirm
        title="Delete items"
        description="All items will be put in trashbox"
        okText="Agree!"
        cancelText="Go back"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Remove
        </Button>
      </Popconfirm>
    </div>
  );
};
