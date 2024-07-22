import { Card, Typography } from 'antd';

const { Text } = Typography;

export const Contact = () => {
  return (
    <Card size={'small'}>
      <Text className={'d-block'}>Sydykov Kanat</Text>
      <Text type={'secondary'}>0502539534</Text>
    </Card>
  );
};
