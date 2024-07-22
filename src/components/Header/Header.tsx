import { UserAddOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

export const Header = () => {
  return (
    <Flex justify={'space-between'} align={'center'}>
      <Typography.Title level={3}>Contacts</Typography.Title>

      <Button type={'primary'} shape={'circle'} icon={<UserAddOutlined />} />
    </Flex>
  );
};
