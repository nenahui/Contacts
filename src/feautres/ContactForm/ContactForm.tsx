import { Button, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FieldType } from '../../types';

export const ContactForm = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onCancel = () => navigate('/');

  return (
    <Form layout={'vertical'} onFinish={onFinish}>
      <Flex gap={'middle'} vertical>
        <Form.Item<FieldType>
          className={'m-0'}
          label={'Name'}
          name={'name'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter name…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<FieldType>
          className={'m-0'}
          label={'Phone'}
          name={'phone'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter phone…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<FieldType>
          className={'m-0'}
          label={'E-Mail'}
          name={'email'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter email…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<FieldType>
          className={'m-0'}
          label={'Image'}
          name={'image'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter image url…'} autoComplete={'off'} />
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'}>
          Save
        </Button>
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
      </Flex>
    </Form>
  );
};
