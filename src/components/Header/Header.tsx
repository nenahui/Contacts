import { UserAddOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const navHome = () => navigate('/');

  return (
    <Flex justify={'space-between'} align={'center'}>
      <Typography.Title level={3} className={'m-0 pointer'} onClick={navHome}>
        Contacts
      </Typography.Title>

      <Link to={'/new-contact'}>
        <Button type={'primary'} shape={'circle'} icon={<UserAddOutlined />} />
      </Link>
    </Flex>
  );
};
