import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row } from 'antd';

import styles from './style.module.less';

export default () => {
  return (
    <Row gutter={0}>
      <Col flex="100px" />
      <Col flex="auto">DevOps</Col>
      <Col flex="100px" className={styles.right}>
        <Avatar size={20} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Col>
    </Row>
  );
};
