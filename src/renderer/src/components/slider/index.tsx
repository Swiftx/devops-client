import classnames from 'classnames';
import { CodepenOutlined, ControlOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import styles from './style.module.less';

interface MenuItemProps {
  icon: React.ReactNode;
  title?: string;
  active?: boolean;
}

const MenuItem = (props: MenuItemProps) => {
  const type = props.active ? 'primary' : 'text';
  const style = props.active ? classnames(styles.item, styles.active) : styles.item;
  return (
    <Tooltip placement="right" title={props.title}>
      <Button className={style} icon={props.icon} type={type} />
    </Tooltip>
  );
};

export default () => {
  return (
    <div>
      <MenuItem title="模型" icon={<CodepenOutlined />} active={true} />
      <MenuItem title="接口" icon={<ControlOutlined />} />
    </div>
  );
};
